import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";

export default function MyQuest() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();

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
            onClick={() => router.push(`/quests/${quest.id}`)}
          >
            <h2>{quest.summary}</h2>
            <p>{quest.description}</p>
            <p>Status: {quest.status}</p>  
            <p>XP: {quest.xp}</p>  
          </div>
        ))}
      </div>
    </>
  );
}
