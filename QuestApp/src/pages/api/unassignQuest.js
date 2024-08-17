
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { questId, assigneeId } = req.body;

        try {
            const updatedQuest = await prisma.quests.update({
                where: { id: questId },
                data: { assigneeId: null }, 
            });

            res.status(200).json({ quest: updatedQuest });
        } catch (error) {
            console.error("Error unassigning quest:", error);
            res.status(500).json({ error: "Failed to unassign quest" });
        }
    } else {
        res.status(405).json({ message: "We only support POST requests" });
    }
}
