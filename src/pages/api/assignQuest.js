import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

/*const prisma = new PrismaClient(); --OLNY UNCOMMENT IF ON LOCAL*/

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "We only support POST requests" });
  }

  const { questId, assigneeId } = req.body;

  if (!questId || !assigneeId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedQuest = await prisma.quests.update({
      where: { id: questId },
      data: { assigneeId },
      include: { assignee: true },
    });

    res.status(200).json({ quest: updatedQuest });
  } catch (error) {
    console.error("Error assigning quest:", error);
    res.status(500).json({ error: "Failed to assign quest: " + error.message });
  } finally {
    await prisma.$disconnect();
  }
}