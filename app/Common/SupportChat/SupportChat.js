"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { useLiveSupportContext } from "@/app/AllContext/ChatContext";

export default function Chatting({ userId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [inputText, setInputText] = useState("");

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Get messages & functions from LiveSupportContext
    const { messages, sendMessage, fetchChatHistory, connectSSE, isConnected } =
        useLiveSupportContext()

    useEffect(() => {
        if (userId) {
            connectSSE(userId);           // Initialize SSE
            fetchChatHistory(userId);     // Load previous messages
        }
    }, [userId]);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // Reply helpers
    const handleReply = (message) => setReplyingTo(message);
    const cancelReply = () => setReplyingTo(null);
    const getReplyMessage = (replyToId) => messages.find((msg) => msg.id === replyToId);

    // Send message (text)
    const handleSendMessage = async () => {
        if (inputText.trim() === "") return;
        await sendMessage({
            userId,
            sender: "user", // ✅
            text: inputText,
            replyTo: replyingTo ? replyingTo.id : null,
        });
        setInputText("");
        setReplyingTo(null);
    };

    // Send file or image
    const handleFileUpload = (event, type) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const newMsg = {
                userId,
                sender: "user",
                text: type === "image" ? "" : file.name,
                fileUrl: e.target.result,
                fileType: type,
                fileName: file.name,
                replyTo: replyingTo ? replyingTo.id : null,
            };
            await sendMessage(newMsg);
            setReplyingTo(null);
        };
        reader.readAsDataURL(file);
    };

    // Drag & drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const isImage = file.type.startsWith("image/");
            const newMsg = {
                userId,
                sender: "user",
                text: isImage ? "" : file.name,
                fileUrl: event.target.result,
                fileType: isImage ? "image" : "file",
                fileName: file.name,
            };
            await sendMessage(newMsg);
        };
        reader.readAsDataURL(file);
    };

    // Formatting helpers
    const formatTime = (timestamp) =>
        new Date(timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const unreadCount = messages.filter((msg) => msg.sender === "support" && !msg.read).length;

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <div className="fixed bottom-6 left-6 z-[9999]">
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="group relative w-16 h-16 rounded-full shadow-2xl bg-lime-500 hover:bg-lime-600 transition-all duration-300 transform hover:scale-110 border-2 border-lime-400"
                    >
                        <LucideIcons.MessageCircle className="h-7 w-7 text-[#2d3e2f]" />
                        {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-xs font-bold text-white">{unreadCount}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 rounded-full bg-lime-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
                    </Button>
                </div>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <Card
                        className="w-full h-full bg-[#2d3e2f] border-none shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-lime-500 to-lime-600 border-b border-lime-400/30">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-[#2d3e2f] flex items-center justify-center shadow-lg">
                                        <LucideIcons.Headphones className="h-6 w-6 text-lime-400" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-lime-500"></div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#2d3e2f]">Support Chat</h2>
                                    <p className="text-sm text-[#2d3e2f]/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        {isConnected ? "Online - We're here to help" : "Connecting..."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#2d3e2f] hover:bg-[#2d3e2f]/10 rounded-full transition-colors"
                                >
                                    <LucideIcons.X className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={chatContainerRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                "flex-1 overflow-y-auto p-6 space-y-4 bg-[#3a4a3c] relative scrollbar-thin scrollbar-thumb-lime-500/50 scrollbar-track-[#2d3e2f]/30 hover:scrollbar-thumb-lime-500/70",
                                isDragging && "bg-lime-500/10 border-2 border-dashed border-lime-500",
                            )}
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "rgba(132, 204, 22, 0.5) rgba(45, 62, 47, 0.3)",
                            }}
                        >
                            {isDragging && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#2d3e2f]/90 z-10 pointer-events-none">
                                    <div className="text-center">
                                        <LucideIcons.Upload className="h-16 w-16 text-lime-400 mx-auto mb-4 animate-bounce" />
                                        <p className="text-xl font-bold text-lime-400">Drop your file here</p>
                                        <p className="text-gray-400">Images and files are supported</p>
                                    </div>
                                </div>
                            )}

                            {messages.map((message, index) => {
                                const showDate =
                                    index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
                                const replyMessage = message.replyTo ? getReplyMessage(message.replyTo) : null;

                                return (
                                    <div key={message.id}>
                                        {showDate && (
                                            <div className="flex justify-center my-4">
                                                <span className="bg-[#2d3e2f]/80 text-gray-300 text-xs px-4 py-1.5 rounded-full font-medium">
                                                    {formatDate(message.timestamp)}
                                                </span>
                                            </div>
                                        )}

                                        <div
                                            className={cn(
                                                "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                                message.sender === "user" ? "justify-end" : "justify-start",
                                            )}
                                            onMouseEnter={() => setHoveredMessageId(message.id)}
                                            onMouseLeave={() => setHoveredMessageId(null)}
                                        >
                                            {message.sender === "support" && (
                                                <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <LucideIcons.Bot className="h-5 w-5 text-[#2d3e2f]" />
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-1 max-w-[70%]">
                                                {replyMessage && (
                                                    <div
                                                        className={cn(
                                                            "text-xs p-2 rounded-lg border-l-2 bg-[#2d3e2f]/40 ml-2",
                                                            message.sender === "user" ? "border-lime-400" : "border-gray-500",
                                                        )}
                                                    >
                                                        <p className="text-gray-400 font-medium mb-1">
                                                            Replying to {replyMessage.sender === "user" ? "You" : "Support"}
                                                        </p>
                                                        <p className="text-gray-300 line-clamp-2">{replyMessage.text || replyMessage.fileName}</p>
                                                    </div>
                                                )}

                                                <div className="relative group">
                                                    <div
                                                        className={cn(
                                                            "rounded-2xl p-4 shadow-lg transition-all duration-200",
                                                            message.sender === "user"
                                                                ? "bg-lime-500 text-[#2d3e2f] rounded-br-md"
                                                                : "bg-[#2d3e2f] text-gray-200 rounded-bl-md border border-[#3d4e3f]",
                                                        )}
                                                    >
                                                        {message.fileType === "image" && (
                                                            <div className="mb-2 cursor-pointer" onClick={() => setLightboxImage(message.fileUrl)}>
                                                                <img
                                                                    src={message.fileUrl || "/placeholder.svg"}
                                                                    alt="Uploaded"
                                                                    className="rounded-xl max-w-full h-auto max-h-64 object-cover shadow-md hover:opacity-90 transition-opacity"
                                                                />
                                                            </div>
                                                        )}

                                                        {message.fileType === "file" && (
                                                            <div
                                                                className={cn(
                                                                    "flex items-center gap-3 p-3 rounded-lg mb-2",
                                                                    message.sender === "user" ? "bg-[#2d3e2f]/20" : "bg-[#3a4a3c]",
                                                                )}
                                                            >
                                                                <LucideIcons.FileText className="h-8 w-8 text-lime-400" />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-medium truncate">{message.fileName}</p>
                                                                    <p className="text-xs opacity-70">Click to download</p>
                                                                </div>
                                                                <LucideIcons.Download className="h-5 w-5 opacity-70" />
                                                            </div>
                                                        )}

                                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                                                        <div className="flex items-center justify-between mt-2 gap-2">
                                                            <p
                                                                className={cn(
                                                                    "text-xs opacity-70",
                                                                    message.sender === "user"
                                                                        ? "text-[#2d3e2f]"
                                                                        : "text-gray-400",
                                                                )}
                                                            >
                                                                {formatTime(message.timestamp)}
                                                            </p>

                                                            {message.sender === "user" && (
                                                                <div className="flex items-center gap-1">
                                                                    {message.read ? (
                                                                        <LucideIcons.CheckCheck
                                                                            className="w-4 h-4 text-blue-500"
                                                                        />
                                                                    ) : (
                                                                        <LucideIcons.Check
                                                                            className="w-4 h-4 text-gray-400"
                                                                        />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                    {/* Reply Button - Shows on Hover */}
                                                    {hoveredMessageId === message.id && (
                                                        <Button
                                                            onClick={() => handleReply(message)}
                                                            size="icon"
                                                            variant="ghost"
                                                            className={cn(
                                                                "absolute top-0 h-8 w-8 rounded-full bg-[#2d3e2f] hover:bg-[#3a4a3c] border border-lime-500/30 shadow-lg animate-in fade-in zoom-in duration-150",
                                                                message.sender === "user" ? "-left-10" : "-right-10",
                                                            )}
                                                        >
                                                            <LucideIcons.Reply className="h-4 w-4 text-lime-400" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            {message.sender === "user" && (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <LucideIcons.User className="h-5 w-5 text-[#2d3e2f]" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input & File Upload Area */}
                        <div className="p-6 bg-[#2d3e2f] border-t border-[#3d4e3f] flex items-end gap-3">
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    onChange={(e) => handleFileUpload(e, "image")}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button
                                    onClick={() => imageInputRef.current?.click()}
                                    size="icon"
                                    variant="ghost"
                                    className="text-lime-400 hover:bg-lime-500/10 hover:text-lime-300 rounded-xl transition-colors"
                                    title="Upload Image"
                                >
                                    <LucideIcons.Image className="h-5 w-5" />
                                </Button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFileUpload(e, "file")}
                                    className="hidden"
                                />
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    size="icon"
                                    variant="ghost"
                                    className="text-lime-400 hover:bg-lime-500/10 hover:text-lime-300 rounded-xl transition-colors"
                                    title="Upload File"
                                >
                                    <LucideIcons.Paperclip className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="flex-1 relative">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    className="w-full bg-[#3a4a3c] text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-lime-500 rounded-3xl pr-14 pl-4 py-3 resize-none min-h-[50px] max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-lime-500/50 scrollbar-track-[#2d3e2f]/30"
                                    style={{ lineHeight: "1.5rem" }}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={inputText.trim() === ""}
                                    size="icon"
                                    className="absolute right-3 bottom-3 bg-lime-500 hover:bg-lime-600 text-[#2d3e2f] rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                                >
                                    <LucideIcons.Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {/* Full Screen Image Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setLightboxImage(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 text-white hover:text-lime-400 transition"
                    >
                        <LucideIcons.X className="w-8 h-8" />
                    </button>

                    {/* Image */}
                    <img
                        src={lightboxImage}
                        alt="Preview"
                        className="max-w-full max-h-full rounded-xl shadow-2xl object-contain animate-in zoom-in"
                        onClick={(e) => e.stopPropagation()} // ❗ background click close, image click safe
                    />
                </div>
            )}

        </>
    );
}
