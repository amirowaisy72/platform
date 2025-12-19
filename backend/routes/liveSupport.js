const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")

// =======================
// 🔥 In-memory store for connected clients
// =======================
let sseClients = []
let messages = [] // ephemeral messages, cleared on refresh
const typingUsers = {} // { userId: { username, sender, timestamp } }

// =======================
// 🔥 Broadcast function
// =======================
// Broadcast function - fixed for admin
const broadcastMessage = (data) => {
  sseClients.forEach((client) => {
    const isAdmin = !client.userId // admin connection
    if (isAdmin || data.payload.userId === client.userId || data.payload.sender === "support") {
      try {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`)
        client.res.flush?.()
      } catch (err) {
        console.error("SSE write error:", err)
      }
    }
  })
}

const broadcastTyping = (data) => {
  sseClients.forEach((client) => {
    const isAdmin = !client.userId
    // When admin types (sender=support), send to the specific user
    // When user types, send to admin
    const shouldSend =
      (data.payload.sender === "support" && client.userId === data.payload.userId) ||
      (data.payload.sender === "user" && isAdmin)

    if (shouldSend) {
      try {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`)
        client.res.flush?.()
        console.log(`[v0] Sent typing to client: ${client.userId || "admin"}`)
      } catch (err) {
        console.error("SSE write error:", err)
      }
    }
  })
}

// =======================
// 🔥 SSE endpoint for frontend
// =======================
// SSE endpoint - fixed
router.get("/stream", (req, res) => {
  const { userId } = req.query // optional

  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.flushHeaders()

  const clientId = uuidv4()
  sseClients.push({ id: clientId, userId: userId || null, res })

  console.log(`🟢 SSE Client Connected: ${clientId} ${userId ? `for user ${userId}` : "(admin)"}`)

  // Send initial messages
  const initialMessages = userId ? messages.filter((msg) => msg.userId === userId) : messages // admin gets all messages
  res.write(`data: ${JSON.stringify({ event: "initial_messages", payload: initialMessages })}\n\n`)

  req.on("close", () => {
    sseClients = sseClients.filter((c) => c.id !== clientId)
    console.log(`🔴 SSE Client Disconnected: ${clientId}`)
  })
})

// =======================
// 🔥 POST endpoint to send new message
// =======================
router.post("/send", (req, res) => {
  const { userId, username, text, fileType, fileUrl, fileName, replyTo, sender } = req.body

  if (!userId || (!text && !fileUrl)) {
    return res.status(400).json({ error: "Invalid message data" })
  }

  const newMessage = {
    id: Date.now(),
    userId,
    username: username || (sender === "support" ? "Support" : "Anonymous"),
    sender: sender || "user",
    text: text || "",
    fileType: fileType || null,
    fileUrl: fileUrl || null,
    fileName: fileName || null,
    replyTo: replyTo || null,
    read: false,
    timestamp: Date.now(),
  }

  messages.push(newMessage)
  broadcastMessage({ event: "new_message", payload: newMessage })

  res.json({ success: true, message: newMessage })
})

// Mark messages as read
router.post("/mark-read", (req, res) => {
  const { userId, messageIds } = req.body

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" })
  }

  // Mark specific messages as read
  if (messageIds && Array.isArray(messageIds)) {
    messages = messages.map((msg) => {
      if (messageIds.includes(msg.id) && msg.userId === userId) {
        return { ...msg, read: true }
      }
      return msg
    })
  } else {
    // Mark all messages for this user as read
    messages = messages.map((msg) => {
      if (msg.userId === userId) {
        return { ...msg, read: true }
      }
      return msg
    })
  }

  // Notify both user and admin via SSE
  broadcastMessage({
    event: "messages_read",
    payload: { userId, messageIds },
  })

  res.json({ success: true })
})

router.post("/typing", (req, res) => {
  const { userId, username, sender, isTyping } = req.body

  if (!userId) {
    return res.status(400).json({ error: "Invalid typing data" })
  }

  if (isTyping) {
    typingUsers[userId] = { username, sender, timestamp: Date.now() }
  } else {
    delete typingUsers[userId]
  }

  broadcastTyping({
    event: "typing_status",
    payload: { userId, username, sender, isTyping },
  })

  res.json({ success: true })
})

// GET all users with latest message and unread count
router.get("/allUsers", (req, res) => {
  try {
    // Get all unique userIds who sent messages
    const userMap = {}

    messages.forEach((msg) => {
      if (msg.sender === "user") {
        if (!userMap[msg.userId]) {
          userMap[msg.userId] = {
            id: msg.userId,
            username: msg.username,
            lastMessage: msg.text || msg.fileName || "File sent",
            timestamp: msg.timestamp,
            pendingMessages: 0,
          }
        } else {
          userMap[msg.userId].lastMessage = msg.text || msg.fileName || "File sent"
          userMap[msg.userId].timestamp = msg.timestamp
        }
      }
    })

    messages.forEach((msg) => {
      if (msg.sender === "user" && !msg.read && userMap[msg.userId]) {
        userMap[msg.userId].pendingMessages += 1
      }
    })

    const users = Object.values(userMap).sort((a, b) => b.timestamp - a.timestamp)

    res.json({ success: true, users })
  } catch (err) {
    console.error("Error fetching all users:", err)
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

// GET chat history for a user
router.get("/history/:userId", (req, res) => {
  const { userId } = req.params
  if (!userId) return res.status(400).json({ error: "Missing userId" })

  const userMessages = messages.filter((msg) => msg.userId === userId)
  res.json({ success: true, messages: userMessages })
})

// =======================
// 🔥 DELETE endpoint to kill chat
// =======================
router.delete("/killChat/:userId", (req, res) => {
  const { userId } = req.params
  if (!userId) return res.status(400).json({ error: "Missing userId" })

  // Remove messages of this user
  messages = messages.filter((msg) => msg.userId !== userId)

  // Notify admin clients via SSE that this user's chat was removed
  broadcastMessage({
    event: "chat_deleted",
    payload: { userId },
  })

  // Optionally, disconnect SSE client for this user
  sseClients = sseClients.filter((c) => c.userId !== userId)

  console.log(`🗑️ Chat deleted for userId: ${userId}`)

  res.json({ success: true, message: `Chat for userId ${userId} deleted` })
})

module.exports = router
