import React from "react";
import QuestPage from "./Bountys";
import NavBar from "./NavBar";


export default function BountyBoard() {
  return (
    <main>
      <NavBar />
      <h1 style = {{
          textAlign: "center",
          margin: "75px 0 0 0",
      }}>Bounty Board</h1>
      <QuestPage />
    </main>
  );
}
