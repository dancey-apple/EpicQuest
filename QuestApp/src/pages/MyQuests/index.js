import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";

export default function MyQuest() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();

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

  useEffect(() => {
    
    loadData();
  }, []);

  const beginQuest = async (questId) => {
    console.log(questId, status);
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questId, status: "Active" }),
      });

      if (!res.ok) {
        throw new Error("Failed to begin quest");
      }
    } catch (error) {
      setError(error.message);
    }
    loadData();
  };


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

          throw new Error(`Failed to unassign quest: ${res.status} ${res.statusText}`);
      }
      const updatedQuestData = await res.json();

      setQuests(currentQuests => currentQuests.map(quest =>
          quest.id === questId ? { ...quest, ...updatedQuestData.quest, assigneeId: null, assignee: null } : quest
      ));
  } catch (error) {
      console.error('Error unassigning quest:', error);
      setError(error.message); 
  }
  loadData();
};


  if (loading) {
    return <h1>Loading...</h1>;
  }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

  return (
    <>
        <NavBar></NavBar>
      <h1>Active Bounty</h1>
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
              cursor: "pointer"
            }}
          >
            <h2>{quest.summary}</h2>
            <p>{quest.description}</p>
            <p>Status: {quest.status}</p>
            <p>Experience Points: {quest.xp}</p>
            <p>Assignee: {quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
                            {quest.assigneeId && (
                                <button onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                            )}
            <button onClick={() => beginQuest(quest.id)}>Begin Quest</button>
          </div>
        ))}
      </div>
    </>
  );
}
