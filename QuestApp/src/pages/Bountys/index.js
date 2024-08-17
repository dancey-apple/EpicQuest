import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useRouter, userRouter } from "next/router";

export default function QuestsPage() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  
  const router = useRouter();
  const goToNewQuestForm = () => {
    router.push("/NewQuestForm");
  };

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

        const { quest } = await res.json();

        setQuests(prevQuests => prevQuests.map(q => 
            q.id === questId ? { ...q, ...quest } : q
        ));
    } catch (error) {
        console.error('Error assigning quest:', error);
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
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "50px",
          margin: "0 0 10px 0",
        }}>
        <h1 style={{
          margin: "0 auto 0 0",
        }}>Bounties</h1>
        <button onClick={goToNewQuestForm} style={{
          backgroundColor: "#DFA878",
        }}>New Quest</button>
        <Popup trigger ={<button>(broken)New Quest</button>} position="right center" modal nested>
          {close => (
            <div id="new-quest-form">
              <button onClick={close}>X</button>
              <h2>New Quest</h2>
              <form>
                <label htmlFor="summary">Summary</label>
                <input type="text" id="summary" name="summary" />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" />
                <label htmlFor="xp">Experience Points</label>
                <input type="number" id="xp" name="xp" />
                <button type="submit">Create Quest</button>
              </form>
            </div>
            )}
        </Popup>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {quests.map((quest, index) => (
          <div id="quest-card"
            key={index}
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div id="quest-header">
              <h2>{quest.summary}</h2>
            </div>
            <div id="quest-summary">
              <p>{quest.description}</p>
            </div>
            <div id="quest-stats"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <p>Status: {quest.status}</p>
              <p>Experience Points: {quest.xp}</p>
              <p>Assignee: {quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
              <button onClick={() => assignQuest(quest.id)} disabled={quest.assigneeId !== null}>
              {quest.assigneeId ? "Assigned" : "Claim Quest"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
