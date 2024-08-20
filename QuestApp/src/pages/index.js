import React from "react";
import Home from "./Bountys";
import NavBar from "./NavBar";


export default function BountyBoard() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />
      <h1 style = {{
          textAlign: "center",
          margin: "75px 0 0 0",
      }}>Bounty Board</h1>
      <Home />
    </main>
  );
}
