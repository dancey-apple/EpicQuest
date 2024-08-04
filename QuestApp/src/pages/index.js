import React from "react";
import Home from "./Bountys";
import NavBar from "./NavBar";


export default function BountyBoard() {
  return (
    <>
      <NavBar />
      <h1 style = {{
          textAlign: "center",
          margin: "75px 0 0 0",
      }}>Bounty Board</h1>
      <Home />
    </>
  );
}
