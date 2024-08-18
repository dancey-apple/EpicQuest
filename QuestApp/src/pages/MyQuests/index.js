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

// This asynchronous function unassigns a quest by setting its `assigneeId` to null.
const unassignQuest = async (questId) => {
  try {
      // Makes a POST request to the server endpoint '/api/unassignQuest' with the `questId`.
      const res = await fetch('/api/unassignQuest', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questId }), // Sending `questId` in the request body.
      });

      // Checks if the HTTP response status indicates a failure.
      if (!res.ok) {
          // If the response is not OK, throws a new Error with a message.
          throw new Error(`Failed to unassign quest: ${res.status} ${res.statusText}`);
      }

      // Parses the JSON response to use in updating the state.
      const updatedQuestData = await res.json();

      // Updates the local state to reflect the change, setting `assigneeId` and `assignee` to null for the updated quest.
      setQuests(currentQuests => currentQuests.map(quest =>
          quest.id === questId ? { ...quest, ...updatedQuestData.quest, assigneeId: null, assignee: null } : quest
      ));
  } catch (error) {
      // Logs any errors that occur during the fetch request or while updating the state.
      console.error('Error unassigning quest:', error);
      setError(error.message);  // Updates the state to reflect the error, assuming `setError` is defined elsewhere.
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
