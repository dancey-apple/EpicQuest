import { useEffect, useState } from "react";

export default function Home() {
  const [quest, setQuest] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(""); //connect to db
      const data = await res.json();
      setQuest(data.quest);
    }
    loadData();
  }, []);

  
  if (quest.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NavBar/>
      <h1>Bounty Board</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {quest.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: "300px",
                border: "1px solid black",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
            >
              
            </div>
          );
        })}
      </div>
    </>
  );
}