import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding real events...");

  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "Bayfront Park Walk",
        description: "Scenic waterfront trail with great views of the harbour.",
        location: { lat: 43.2707, lng: -79.8720 },
        category: "scenic",
        cost: "free",
        indoor: false,
        energy: "low",
        seasonal: "all-year",
        groupSize: ["solo", "pair", "small", "large"],
        extra: {
          timeSensitive: false,
          permanent: true,
          carDependency: "transit-optional",
          hobbyLevel: "beginner-friendly",
        },
      },

      {
        title: "Axe Throwing – BATL Hamilton",
        description: "Fun indoor activity with trained coaches.",
        location: { lat: 43.2555, lng: -79.8693 },
        category: "active",
        cost: "mid",
        indoor: true,
        energy: "moderate",
        seasonal: "all-year",
        groupSize: ["pair", "small"],
        extra: {
          timeSensitive: false,
          permanent: true,
          carDependency: "car-required",
          hobbyLevel: "beginner-friendly",
        },
      },

      {
        title: "Hamilton Farmers' Market",
        description: "Local vendors, food, produce, and artisan products.",
        location: { lat: 43.2567, lng: -79.8690 },
        category: "market",
        cost: "varies",
        indoor: true,
        energy: "low",
        seasonal: "all-year",
        groupSize: ["solo", "pair", "small", "large"],
        extra: {
          timeSensitive: false,
          permanent: true,
          carDependency: "transit-optional",
          hobbyLevel: "beginner-friendly",
        },
      },

      {
        title: "Albion Falls Scenic Visit",
        description: "Popular waterfall attraction with lookout points.",
        location: { lat: 43.2074, lng: -79.8192 },
        category: "scenic",
        cost: "free",
        indoor: false,
        energy: "low",
        seasonal: "all-year",
        groupSize: ["solo", "pair", "small", "large"],
        extra: {
          timeSensitive: false,
          permanent: true,
          carDependency: "car-required",
          hobbyLevel: "beginner-friendly",
        },
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());