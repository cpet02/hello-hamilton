import eventsRouter from "./routes/events.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is alive (maybe?)");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/events", eventsRouter);