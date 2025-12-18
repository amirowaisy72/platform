"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const LiveSupportContext = createContext();

export function LiveSupportProvider({ children }) {
    // const host = "http://localhost:3001/"
  const host = "https://platform-backend-pi.vercel.app/"
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const sseRef = useRef(null);

    // SSE connection (accepts userId)
    const connectSSE = (userId) => {
        if (!userId) return;

        // Close previous SSE if any
        if (sseRef.current) sseRef.current.close();

        const sse = new EventSource(`${host}api/liveSupport/stream?userId=${userId}`);
        sseRef.current = sse;

        sse.onopen = () => {
            console.log("LiveSupport SSE connected");
            setIsConnected(true);
        };

        sse.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (!data || !data.event) return;

                switch (data.event) {
                    case "initial_messages":
                        setMessages(
                            (data.payload || []).map(msg => ({
                                ...msg,
                                read: msg.read ?? false
                            }))
                        );
                        break;

                    case "new_message":
                        setMessages((prev) => [...prev, data.payload]);
                        break;

                    case "messages_read": // ✅ YAHAN ADD HUA
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.sender === "user"
                                    ? { ...msg, read: true }
                                    : msg
                            )
                        );
                        break;

                    default:
                        break;
                }
            } catch (err) {
                console.error("SSE parse error:", err);
            }
        };


        sse.onerror = (err) => {
            console.error("SSE error:", err);
            sse.close();
            setIsConnected(false);
        };
    };

    // Send a new message (accepts userId)
    const sendMessage = async (payload) => {
        const { userId, text, fileType, fileUrl, fileName, replyTo, sender } = payload;

        if (!userId || (!text && !fileUrl)) return;

        const newMsg = {
            userId,
            sender,              // ✅ IMPORTANT
            text: text || "",
            fileType: fileType || null,
            fileUrl: fileUrl || null,
            fileName: fileName || null,
            replyTo: replyTo || null,
        };

        try {
            const res = await fetch(`${host}api/liveSupport/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMsg),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to send message");

            return result;
        } catch (err) {
            console.error("SendMessage error:", err);
            return { error: err.message };
        }
    };

    // Fetch previous chat history (accepts userId)
    const fetchChatHistory = async (userId) => {
        if (!userId) return [];
        try {
            const res = await fetch(`${host}api/liveSupport/history/${userId}`);
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to fetch chat history");

            setMessages(result.messages || []);
            return result.messages || [];
        } catch (err) {
            console.error("FetchChatHistory error:", err);
            return [];
        }
    };

    return (
        <LiveSupportContext.Provider
            value={{
                messages,
                isConnected,
                sendMessage,
                fetchChatHistory,
                connectSSE,
            }}
        >
            {children}
        </LiveSupportContext.Provider>
    );
}

export function useLiveSupportContext() {
    const context = useContext(LiveSupportContext);
    if (!context) throw new Error("useLiveSupportContext must be used within LiveSupportProvider");
    return context;
}
