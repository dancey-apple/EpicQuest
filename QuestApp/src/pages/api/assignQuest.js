import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { questId, assigneeId } = req.body;

    try {
      const updatedQuest = await prisma.quests.update({
        where: { id: questId },
        data: { assigneeId },
      });

      res.status(200).json({ quest: updatedQuest });
    } catch (error) {
      console.error("Error assigning quest:", error);
      res.status(500).json({ error: "Failed to assign quest" });
    } finally {
      await prisma.$disconnect(); 
    }
  } else {
    res.status(405).json({ message: "We only support POST requests" });
  }
}
