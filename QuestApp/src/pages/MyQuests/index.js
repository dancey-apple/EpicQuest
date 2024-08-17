import { useEffect, useState } from "react";
import NavBar from "../NavBar";

export default function MyQuest() {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/activeQuest");
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const data = await res.json();
                setQuests(data.quests);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const unassignQuest = async (questId) => {
        try {
            const res = await fetch('/api/unassignQuest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questId }),
            });
    
            if (!res.ok) {
                throw new Error("Failed to unassign quest");
            }
    
            setQuests(currentQuests => currentQuests.map(quest =>
                quest.id === questId ? { ...quest, assigneeId: null, assignee: null } : quest
            ));
        } catch (error) {
            console.error('Error unassigning quest:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <>
            <NavBar />
            <h1>Active Bounty</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
            }}>
                {quests.map((quest, index) => (
                    <div key={index} style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "10px",
                    }}>
                        <h2>{quest.summary}</h2>
                        <p>{quest.description}</p>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}>
                            <p>Status: {quest.status}</p>
                            <p>Experience Points: {quest.xp}</p>
                            <p>Assignee: {quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
                            {quest.assigneeId && (
                                <button onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
