import eventsRouter from "./routes/events.js";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is alive (maybe?)");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/events", eventsRouter);