const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const TransactionHistory = require("./models/TransactionHistory");
const User = require("./models/Users");

const app = express();
const PORT = 3001;

connectDB();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// =======================
// 🔥 SSE CLIENT STORE
// =======================
let sseClients = [];

const broadcastSSE = (data) => {
  sseClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
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
      payload: change,
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
      payload: {
        operationType: change.operationType,
        userId: change.documentKey?._id,
      },
    });
  });

  changeStream.on("error", (err) => {
    console.error("❌ Users Change Stream Error:", err);
  });
};

// 🔥 Start watchers
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

  // 🔥 Initial pending transactions only
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
    console.error("❌ Initial data error:", err);
  }

  req.on("close", () => {
    sseClients = sseClients.filter((c) => c.id !== clientId);
    console.log(`🔴 SSE Client Disconnected: ${clientId}`);
  });
});

// =======================
// ROUTES
// =======================
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/combo", require("./routes/combo"));

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
