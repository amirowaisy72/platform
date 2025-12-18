const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const TransactionHistory = require("./models/TransactionHistory");
const User = require("./models/Users");

const app = express();
const PORT = 3001;

// =======================
// 🔥 DB + MIDDLEWARE
// =======================
connectDB();

const corsOptions = {
  origin: "*", 
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors(corsOptions));

// =======================
// 🔥 SSE CLIENT STORE
// =======================
let sseClients = [];

const broadcastSSE = (data) => {
  sseClients.forEach((client) => {
    try {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (err) {
      console.error("SSE write error:", err);
    }
  });
};

// =======================
// 🔥 TRANSACTION WATCHER
// =======================
const startTransactionWatcher = () => {
  console.log("⚡ TransactionHistory Change Stream Started");

  const changeStream = TransactionHistory.watch([], {
    fullDocument: "updateLookup",
  });

  changeStream.on("change", (change) => {
    broadcastSSE({
      event: "transaction_update",
      payload: change, // ✅ FULL change object
    });
  });

  changeStream.on("error", (err) => {
    console.error("❌ Transaction Change Stream Error:", err);
  });
};

// =======================
// 🔥 USERS WATCHER
// =======================
const startUsersWatcher = () => {
  console.log("⚡ Users Change Stream Started");

  const changeStream = User.watch([], {
    fullDocument: "updateLookup",
  });

  changeStream.on("change", (change) => {
    broadcastSSE({
      event: "users_updated",
      payload: change, // ✅ FULL change object (IMPORTANT)
    });
  });

  changeStream.on("error", (err) => {
    console.error("❌ Users Change Stream Error:", err);
  });
};

// =======================
// 🔥 START WATCHERS
// =======================
startTransactionWatcher();
startUsersWatcher();

// =======================
// 🔥 SSE ROUTE
// =======================
app.get("/api/realtime-events", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const clientId = Date.now();
  sseClients.push({ id: clientId, res });

  console.log(`🟢 SSE Client Connected: ${clientId}`);

  // 🔥 SEND INITIAL PENDING TRANSACTIONS
  try {
    const pendingTransactions = await TransactionHistory.find({
      status: "Pending",
    }).sort({ createdAt: -1 });

    res.write(
      `data: ${JSON.stringify({
        event: "initial_transactions",
        payload: pendingTransactions,
      })}\n\n`
    );
  } catch (err) {
    console.error("❌ Initial transactions error:", err);
  }

  // 🔴 Client disconnect
  req.on("close", () => {
    sseClients = sseClients.filter((c) => c.id !== clientId);
    console.log(`🔴 SSE Client Disconnected: ${clientId}`);
  });
});

// =======================
// 🔥 API ROUTES
// =======================
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/combo", require("./routes/combo"));
app.use("/api/liveSupport", require("./routes/liveSupport"));

// =======================
// 🚀 START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
