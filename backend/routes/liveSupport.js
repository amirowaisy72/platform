const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// =======================
// 🔥 In-memory store for connected clients
// =======================
let sseClients = [];
let messages = []; // ephemeral messages, cleared on refresh

// =======================
// 🔥 Broadcast function
// =======================
const broadcastMessage = (data) => {
    sseClients.forEach((client) => {
        try {
            client.res.write(`data: ${JSON.stringify(data)}\n\n`);
        } catch (err) {
            console.error("SSE write error:", err);
        }
    });
};

// =======================
// 🔥 SSE endpoint for frontend
// =======================
router.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // ✅ Allow any origin
    res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ allow all

    res.flushHeaders();

    const clientId = uuidv4();
    sseClients.push({ id: clientId, res });

    console.log(`🟢 SSE Client Connected: ${clientId}`);

    // Send existing ephemeral messages to new client
    res.write(
        `data: ${JSON.stringify({ event: "initial_messages", payload: messages })}\n\n`
    );

    req.on("close", () => {
        sseClients = sseClients.filter((c) => c.id !== clientId);
        console.log(`🔴 SSE Client Disconnected: ${clientId}`);
    });
});

// =======================
// 🔥 POST endpoint to send new message
// =======================
router.post("/send", (req, res) => {
    const { userId, text, fileType, fileUrl, fileName, replyTo, sender } = req.body;

    if (!userId || (!text && !fileUrl)) {
        return res.status(400).json({ error: "Invalid message data" });
    }

    const newMessage = {
        id: Date.now(),
        userId,
        sender: sender || "user", // ✅ IMPORTANT
        text: text || "",
        fileType: fileType || null,
        fileUrl: fileUrl || null,
        fileName: fileName || null,
        replyTo: replyTo || null,
        read: sender === "support", // 👈 support ke messages already read
        timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    broadcastMessage({ event: "new_message", payload: newMessage });

    res.json({ success: true, message: newMessage });
});

// Mark messages as read
router.post("/mark-read/:userId", (req, res) => {
    const { userId } = req.params;

    messages = messages.map((msg) => {
        if (msg.userId === userId && msg.sender === "user") {
            return { ...msg, read: true };
        }
        return msg;
    });

    // Notify user via SSE
    broadcastMessage({
        event: "messages_read",
        payload: { userId },
    });

    res.json({ success: true });
});


// GET chat history for a user
router.get("/history/:userId", (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const userMessages = messages.filter((msg) => msg.userId === userId);
    res.json({ success: true, messages: userMessages });
});


module.exports = router;
