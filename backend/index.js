const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const TransactionHistory = require("./models/TransactionHistory");

const app = express();
const PORT = 3001;

connectDB();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// =======================
//   🔥 SSE CLIENT STORE
// =======================
let sseClients = [];

const broadcastSSE = (data) => {
  sseClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

// =======================
//   🔥 Change Stream Setup
// =======================
const startTransactionWatcher = () => {
  console.log("⚡ TransactionHistory Change Stream Started...");

  const changeStream = TransactionHistory.watch([], { fullDocument: "updateLookup" });

  changeStream.on("change", (change) => {

    broadcastSSE({
      event: "transaction_update",
      payload: change
    });
  });

  changeStream.on("error", (error) => {
    console.error("❌ Change Stream Error:", error);
  });
};

startTransactionWatcher();


// =======================
//   🔥 SSE ROUTE
// =======================
app.get("/api/realtime-transactions", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // ========================
  // 🔥 1) SEND INITIAL PENDING TRANSACTIONS ONLY
  // ========================
  try {
    const initialData = await TransactionHistory
      .find({ status: "Pending" }) // ← filter here
      .sort({ createdAt: -1 });

    res.write(`data: ${JSON.stringify({
      event: "initial_transactions",
      payload: initialData
    })}\n\n`);
  } catch (err) {
    console.error("❌ Error sending initial data:", err);
  }

  req.on("close", () => {
    console.log(`🔴 SSE Client Disconnected: ${clientId}`);
    sseClients = sseClients.filter((c) => c.id !== clientId);
  });
});

// =======================
//      ROUTES
// =======================
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/combo", require("./routes/combo"));


// =======================
//   START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
