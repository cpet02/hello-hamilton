import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// GET /events (with backend filtering)
router.get("/", async (req, res) => {
  try {
    const where = {};

    // category=scenic
    if (req.query.category) {
      where.category = req.query.category;
    }

    // cost=free
    if (req.query.cost) {
      where.cost = req.query.cost;
    }

    // indoor=true / indoor=false
    if (req.query.indoor === "true") where.indoor = true;
    if (req.query.indoor === "false") where.indoor = false;

    // energy=low
    if (req.query.energy) {
      where.energy = req.query.energy;
    }

    // seasonal=all-year
    if (req.query.seasonal) {
      where.seasonal = req.query.seasonal;
    }

    // groupSize=solo,small
    if (req.query.groupSize) {
      const sizes = req.query.groupSize.split(",");
      where.groupSize = { hasSome: sizes };
    }

    console.log("Applying backend filters:", where);

    const events = await prisma.event.findMany({
      where
    });

    res.json(events);
  } catch (err) {
    console.error("Error fetching filtered events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;