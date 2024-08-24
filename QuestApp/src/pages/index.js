import React from "react";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";


export default function BountyBoard() {
  return (
    <main>
      <NavBar />
      <h1 className='flex flex-row justify-center text-4xl text-secondary hover:text-glow hover:drop-shadow-gl transition-all duration-300 mt-5'>Welcome to Epic Quest!</h1>
      <LandingPage />
    </main>
  );
}
