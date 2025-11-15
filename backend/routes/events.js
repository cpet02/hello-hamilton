import express from "express";

const router = express.Router();

// Temporary in-memory event data (will move to a database later)
const events = [
    {
      id: 1,
      title: "Bayfront Park Walk",
      description: "Scenic waterfront trail with great views of the harbour.",
      location: { lat: 43.2707, lng: -79.8720 },
  
      cost: "free",
      indoorOutdoor: "outdoor",
      seasonal: "all-year",
      timeSensitive: false,
      permanent: true,
      category: "scenic",
      energyLevel: "leisure",
  
      groupSize: { min: 1, ideal: 1 },
      carDependency: "transit-optional",
      hobbyLevel: "beginner-friendly"
    },
  
    {
      id: 2,
      title: "Axe Throwing – BATL Hamilton",
      description: "Fun indoor activity with trained coaches.",
      location: { lat: 43.2555, lng: -79.8693 },
  
      cost: "mid",
      indoorOutdoor: "indoor",
      seasonal: "all-year",
      timeSensitive: false,
      permanent: true,
      category: "active",
      energyLevel: "moderate",
  
      groupSize: { min: 2, ideal: 4 },
      carDependency: "car-required",
      hobbyLevel: "beginner-friendly"
    },
  
    {
      id: 3,
      title: "Hamilton Farmers' Market",
      description: "Local vendors, food, produce, and artisan products.",
      location: { lat: 43.2567, lng: -79.8690 },
  
      cost: "varies",
      indoorOutdoor: "indoor",
      seasonal: "all-year",
      timeSensitive: false,
      permanent: true,
      category: "market",
      energyLevel: "leisure",
  
      groupSize: { min: 1, ideal: 1 },
      carDependency: "transit-optional",
      hobbyLevel: "beginner-friendly"
    },
  
    {
      id: 4,
      title: "Albion Falls Scenic Visit",
      description: "Popular waterfall attraction with lookout points.",
      location: { lat: 43.2074, lng: -79.8192 },
  
      cost: "free",
      indoorOutdoor: "outdoor",
      seasonal: "all-year",
      timeSensitive: false,
      permanent: true,
      category: "scenic",
      energyLevel: "leisure",
  
      groupSize: { min: 1, ideal: 1 },
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
