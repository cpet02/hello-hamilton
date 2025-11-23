import express from "express";
import { ingestEvents } from "../ingestion/pipeline/ingest.js";
import { extractors } from "../ingestion/extractors/index.js";

const router = express.Router();

router.post("/ingest-test", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);  // <— add this

    const rawEvents = req.body;
    const results = await ingestEvents(rawEvents);

    res.json({ success: true, results });
  } catch (err) {
    console.error("Ingestion error:", err);
    res.status(500).json({ error: "Ingestion failed" });
  }
});

router.post("/ingest/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const extractor = extractors[name];

    if (!extractor) {
      return res.status(404).json({ error: `Extractor '${name}' not found` });
    }

    const rawEvents = await extractor.extract();
    const results = await ingestEvents(rawEvents);

    res.json({ success: true, source: name, results });

  } catch (err) {
    console.error("Error in single extractor ingestion:", err);
    res.status(500).json({ error: "Ingestion failed" });
  }
});

router.post("/ingest-all", async (req, res) => {
  try {
    const results = [];

    for (const [name, extractor] of Object.entries(extractors)) {
      const rawEvents = await extractor.extract();
      const ingestResult = await ingestEvents(rawEvents);

      results.push({
        source: name,
        count: ingestResult.length,
        events: ingestResult
      });
    }

    res.json({ success: true, results });

  } catch (err) {
    console.error("Error in ingest-all:", err);
    res.status(500).json({ error: "Failed to ingest all sources" });
  }
});


export default router;
