import { useEffect, useState } from "react";

export default function QuestsPage() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/quests");  
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

  const assignQuest = async (questId) => {
    try {
      const res = await fetch(`/api/assignQuest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questId, assigneeId: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to assign quest");
      }

     
      setQuests((prevQuests) => prevQuests.map((quest) => 
        quest.id === questId ? { ...quest, assigneeId: 1 } : quest
      ));
    } catch (error) {
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
      <h1>Open Quests</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {quests.map((quest, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h2>{quest.summary}</h2>
            <p>{quest.description}</p>
            <p>Status: {quest.status}</p>
            <p>XP: {quest.xp}</p>
            <p>Assignee ID: {quest.assigneeId || "None"}</p>
            <button onClick={() => assignQuest(quest.id)} disabled={quest.assigneeId !== null}>
              {quest.assigneeId ? "Assigned" : "Claim Quest"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
