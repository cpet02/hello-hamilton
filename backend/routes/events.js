import express from "express";

const router = express.Router();

// Temporary in-memory event data (will move to a database later)
const events = [
  {
    id: 1,
    title: "Bayfront Park Walk",
    description: "Scenic waterfront trail with great views of the harbour.",
    location: { lat: 43.2707, lng: -79.8720 },

    // FILTER FIELDS
    category: "attraction",     // scenic → attraction
    cost: "free",               // free stays free
    indoor: false,              // outdoor → false
    energy: "low",              // leisure → low
    seasonal: "all",            // all-year → all
    groupSize: "solo",          // min=1 ideal=1 → solo

    // EXTRA FIELDS YOU ALREADY HAD
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

    category: "sports",         // active → sports
    cost: "paid",               // mid → paid
    indoor: true,               // indoor
    energy: "high",             // moderate → high
    seasonal: "all",            // all-year → all
    groupSize: "small",         // min=2 ideal=4 → small

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

    category: "food",           // market → food
    cost: "free",               // varies → free (general public)
    indoor: true,
    energy: "low",
    seasonal: "all",
    groupSize: "any",           // public market → any group size

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

    category: "attraction",     // scenic → attraction
    cost: "free",
    indoor: false,              // outdoor
    energy: "medium",           // leisure → medium (hiking)
    seasonal: "summer",         // scenic waterfall best in summer
    groupSize: "any",

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
