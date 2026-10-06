import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  // Create admin user with hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      name: "Admin User",
      password: hashedPassword,
    },
  });

  console.log(`Created/updated admin user: ${admin.email}`);

  // Create categories (topics)
  const topics = [
    { name: "Mexanika", type: "TOPIC", description: "Mexanika müzəvvəsələri" },
    { name: "Kinematika", type: "TOPIC", description: "Hərəkətin təhlili" },
    { name: "Dinamika", type: "TOPIC", description: "Güc və hərəkət əlaqəsi" },
    { name: "Statika", type: "TOPIC", description: "Hərakətsiz sistemlər" },
    { name: "Enerji və impuls", type: "TOPIC", description: "Enerji konservasyonu" },
    { name: "Rəqslər və dalğalar", type: "TOPIC", description: " mechanics" },
    { name: "Molekulyar fizika", type: "TOPIC", description: "Atom və molekula fizikası" },
    { name: "Termodinamika", type: "TOPIC", description: "Isı və termodinamik proseslər" },
    { name: "Elektrik", type: "TOPIC", description: "Elektirk fenomenləri" },
    { name: "Maqnetizm", type: "TOPIC", description: "Maqnetik sahələr" },
    { name: "Optika", type: "TOPIC", description: "Işıq və देखा phenomena" },
    { name: "Atom və nüvə fiziksı", type: "TOPIC", description: "Atom növbəti fizika" },
    { name: "Riyazi üsullar", type: "TOPIC", description: "Fizika üçün riyazi metodlar" },
    { name: "Olimpiada üsulları", type: "TOPIC", description: "Olimpiada hazırlığı üsulları" },
  ];

  for (const topicData of topics) {
    // Since name is unique, we upsert by name only
    const existingCategory = await prisma.category.findUnique({
      where: { name: topicData.name },
    });

    if (existingCategory) {
      // Update existing category
      await prisma.category.update({
        where: { id: existingCategory.id },
        data: topicData,
      });
    } else {
      // Create new category
      await prisma.category.create({
        data: topicData,
      });
    }
  }

  console.log(`Created/updated ${topics.length} topics`);

  // Create resource types
  const resourceTypes = [
    { name: "Kitab", type: "RESOURCE_TYPE" },
    { name: "PDF", type: "RESOURCE_TYPE" },
    { name: "Video dərs", type: "RESOURCE_TYPE" },
    { name: "Test/imtahan", type: "RESOURCE_TYPE" },
    { name: "Məqalə", type: "RESOURCE_TYPE" },
    { name: "Digər", type: "RESOURCE_TYPE" },
    { name: "Keçmiş Məsələ", type: "RESOURCE_TYPE" },
  ];

  for (const typeData of resourceTypes) {
    // Since name is unique, we upsert by name only
    const existingCategory = await prisma.category.findUnique({
      where: { name: typeData.name },
    });

    if (existingCategory) {
      // Update existing category
      await prisma.category.update({
        where: { id: existingCategory.id },
        data: typeData,
      });
    } else {
      // Create new category
      await prisma.category.create({
        data: typeData,
      });
    }
  }

  console.log(`Created/updated ${resourceTypes.length} resource types`);

  // Create levels
  const levels = [
    { name: "Junior", type: "LEVEL" },
    { name: "Senior", type: "LEVEL" },
    { name: "Her iki seviyyə", type: "LEVEL" },
  ];

  for (const levelData of levels) {
    // Since name is unique, we upsert by name only
    const existingCategory = await prisma.category.findUnique({
      where: { name: levelData.name },
    });

    if (existingCategory) {
      // Update existing category
      await prisma.category.update({
        where: { id: existingCategory.id },
        data: levelData,
      });
    } else {
      // Create new category
      await prisma.category.create({
        data: levelData,
      });
    }
  }

  console.log(`Created/updated ${levels.length} levels`);

  // Create sample RFO years
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  for (const year of years) {
    await prisma.rFOYear.upsert({
      where: { year },
      update: {},
      create: {
        year,
        label: `${year}`,
        isActive: true,
      },
    });
  }

  console.log(`Created/updated ${years.length} RFO years`);

  // Create sample stages for each year
  const stages = ["I mərhələ", "II mərhələ", "Final"];
  for (const year of years) {
    const yearRecord = await prisma.rFOYear.findUnique({ where: { year } });
    if (yearRecord) {
      for (const stage of stages) {
        // Check if stage already exists for this year
        const existingStage = await prisma.rFOStage.findFirst({
          where: { yearId: yearRecord.id, stage },
        });

        if (existingStage) {
          // Update existing stage
          await prisma.rFOStage.update({
            where: { id: existingStage.id },
            data: {
              description: `${year} RFO Fizika ${stage}`,
              isActive: true,
            },
          });
        } else {
          // Create new stage
          await prisma.rFOStage.create({
            data: {
              yearId: yearRecord.id,
              stage,
              description: `${year} RFO Fizika ${stage}`,
              isActive: true,
            },
          });
        }
      }
    }
  }

  console.log(`Created/updated RFO stages`);

  // Create sample resources
  const sampleResources = [
    {
      title: "RFO Fizika 2023 - Final Mərhələsi",
      description: "2023-cü il RFO Fizika Olimpiadasının final mərhələsi problemləri",
      fileUrl: "/resources/papers/rfo-2023-final.pdf",
      thumbnailUrl: "/resources/thumbnails/rfo-2023-final.jpg",
      category: "Mexanika",
      topic: null,
      level: "SENIOR",
      resourceType: "PAST_PAPER",
      year: 2023,
      stage: "Final",
      tags: "2023,final,mexanika,senior", // Fixed: changed from array to comma-separated string
      isActive: true,
      uploadedById: admin.id,
    },
    {
      title: "Mexanika Problemlər Toplusu",
      description: "Mexanika məzvusunda 500 mirası problemi və hallar",
      fileUrl: "/resources/books/mexanika-problems.pdf",
      thumbnailUrl: "/resources/thumbnails/mechanics-book.jpg",
      category: "Mexanika",
      topic: null,
      level: "BOTH",
      resourceType: "BOOK",
      year: 2024,
      stage: null,
      tags: "mexanika,problems,book,both", // Fixed: changed from array to comma-separated string
      isActive: true,
      uploadedById: admin.id,
    },
    {
      title: "Termodinamika Lecture Notes",
      description: "Termodinamika principiosları və problem həlli üsulları",
      fileUrl: "/resources/notes/thermodynamics.pdf",
      thumbnailUrl: "/resources/thumbnails/thermodynamics-notes.jpg",
      category: "Termodinamika",
      topic: null,
      level: "SENIOR",
      resourceType: "ARTICLE",
      year: 2024,
      stage: null,
      tags: "termodinamika,notes,lecture,senior", // Fixed: changed from array to comma-separated string
      isActive: true,
      uploadedById: admin.id,
    },
    {
      title: "Elektrostatika Video Dərs",
      description: "Elektrostatika məzusunda detallı video dərs",
      fileUrl: "/resources/videos/electrostatics.mp4",
      thumbnailUrl: "/resources/thumbnails/electrostatics-video.jpg",
      category: "Elektrik",
      topic: null,
      level: "JUNIOR",
      resourceType: "VIDEO",
      year: 2024,
      stage: null,
      tags: "elektrostatika,video,junior", // Fixed: changed from array to comma-separated string
      isActive: true,
      uploadedById: admin.id,
    },
  ];

  if (process.env.SEED_DEMO_RESOURCES !== "true") {
    sampleResources.length = 0;
  }

  for (const resourceData of sampleResources) {
    // Check if resource already exists
    const existingResource = await prisma.resource.findFirst({
      where: { title: resourceData.title },
    });

    if (!existingResource) {
      await prisma.resource.create({
        data: resourceData,
      });
    }
  }

  console.log(`Created/updated ${sampleResources.length} sample resources`);

  // Create or update default AI settings
  let aiSettings = await prisma.aISettings.findFirst({
    where: { isActive: true },
  });

  if (aiSettings) {
    // Update existing active AI settings
    aiSettings = await prisma.aISettings.update({
      where: { id: aiSettings.id },
      data: {
        provider: "google",
        model: "gemini-3.1-flash-lite",
        temperature: 0.7,
        maxTokens: 1000,
        systemPrompt: "Siz RFO Fizika Olimpiadası hazırlığı üçün mütəxəssis AI-assistentsiniz. Cavabları Azerbaijan dilində verin, problemi adjımana qədər qədər bir ipucu verərək başlayın, ardından tələbə hazırsa detallı izah edin. Məktəblərinizi LaTeX formatında formatlayın.",
        isActive: true,
      },
    });
  } else {
    // Create new AI settings
    aiSettings = await prisma.aISettings.create({
      data: {
        provider: "google",
        model: "gemini-3.1-flash-lite",
        temperature: 0.7,
        maxTokens: 1000,
        systemPrompt: "Siz RFO Fizika Olimpiadası hazırlığı üçün mütəxəssis AI-assistentsiniz. Cavabları Azerbaijan dilində verin, problemi adjımana qədər qədər bir ipucu verərək başlayın, ardından tələbə hazırsa detallı izah edin. Məktəblərinizi LaTeX formatında formatlayın.",
        isActive: true,
      },
    });
  }

  console.log(`Created/updated AI settings`);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });