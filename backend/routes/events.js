import express from "express";

const router = express.Router();

// Temporary in-memory event data (will move to a database later)
const events = [
  {
    id: 1,
    title: "Bayfront Park Walk",
    description: "Scenic waterfront trail with great views of the harbour.",
    location: { lat: 43.2707, lng: -79.8720 },

    category: "attraction",
    cost: "free",
    indoor: false,
    energy: "low",
    seasonal: "all",
    groupSize: ["solo", "pair", "small", "large"],

    timeSensitive: false,
    permanent: true,
    carDependency: "transit-optional",
    hobbyLevel: "beginner-friendly"
  },

  {
    id: 2,
    title: "Axe Throwing – BATL Hamilton",
    description: "Fun indoor activity with trained coaches.",
    location: { lat: 43.2555, lng: -79.8693 },

    category: "sports",
    cost: "paid",
    indoor: true,
    energy: "high",
    seasonal: "all",
    groupSize: ["pair", "small"],

    timeSensitive: false,
    permanent: true,
    carDependency: "car-required",
    hobbyLevel: "beginner-friendly"
  },

  {
    id: 3,
    title: "Hamilton Farmers' Market",
    description: "Local vendors, food, produce, and artisan products.",
    location: { lat: 43.2567, lng: -79.8690 },

    category: "food",
    cost: "free",
    indoor: true,
    energy: "low",
    seasonal: "all",
    groupSize: ["solo", "pair", "small", "large"],

    timeSensitive: false,
    permanent: true,
    carDependency: "transit-optional",
    hobbyLevel: "beginner-friendly"
  },

  {
    id: 4,
    title: "Albion Falls Scenic Visit",
    description: "Popular waterfall attraction with lookout points.",
    location: { lat: 43.2074, lng: -79.8192 },

    category: "attraction",
    cost: "free",
    indoor: false,
    energy: "medium",
    seasonal: "summer",
    groupSize: ["solo", "pair", "small", "large"],

    timeSensitive: false,
    permanent: true,
    carDependency: "car-required",
    hobbyLevel: "beginner-friendly"
  }
];
 

  router.get("/", (req, res) => {
    const filters = req.query;
  
    // We will implement filtering logic later.
    // For now, we just log it.
    console.log("Incoming filters:", filters);
  
    res.json(events);
  });
  

export default router;
