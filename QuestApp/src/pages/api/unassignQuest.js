import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "We only support POST requests" });
    }

    const { questId } = req.body;

    // Additional validation to check if questId is a valid integer
    if (!questId || isNaN(parseInt(questId))) {
        return res.status(400).json({ error: "Valid quest ID must be provided" });
    }

    try {
        const updatedQuest = await prisma.quests.update({
            where: { id: parseInt(questId) },  // Ensure the id is treated as a number
            data: { assigneeId: null, 
                    status: 'OPEN'
            },
        });

        res.status(200).json({ quest: updatedQuest });
    } catch (error) {
        console.error("Error unassigning quest:", error);
        // Detailed error response for better debugging
        res.status(500).json({ error: `Failed to unassign quest: ${error.message || error}` });
    }
}
