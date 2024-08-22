import React from "react";
import NavBar from "../NavBar";

export default function NewQuest() {

    async function createQuest(event){
        event.preventDefault();
        const summary = document.getElementById("summary").value;
        const description = document.getElementById("description").value;
        const xp = parseInt(document.getElementById("xp").value);

        console.log({ summary, description, xp });

        const res = await fetch("/api/quests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ summary, description, xp }),
        });

            if (res.ok) {
                const result = await res.json();
                alert("Quest created successfully!");
                document.getElementById("summary").value = "";
                document.getElementById("description").value = "";
                document.getElementById("xp").value = "";
            } else {
                const error = await res.json();
                alert(`Failed to create Quest. Error: ${error.message}`);
        }
    }

    return(
        <>
            <NavBar />
            <h1 className='text-center font-bold text-4xl m-4 text-secondary hover:text-glow hover:drop-shadow-gl'>New Quest</h1>
            <div className='flex flex-col justify-center px-96'>
                <form onSubmit={createQuest} className='flex flex-col justify-around border-2 border-secondary rounded-xl h-96'>
                    <div className='flex flex-row justify-center text-lg text-secondary' required>
                        <label htmlFor="summary">Summary</label>
                        <input className='bg-secondary text-primary font-bold ml-4' type="text" id="summary" name="summary" />
                    </div>
                    <div className='flex flex-row justify-center text-lg text-secondary'>
                        <label htmlFor="description">Description</label>
                        <textarea className='bg-secondary text-primary font-bold ml-4' id="description" name="description" />
                    </div>
                    <div className='flex flex-row justify-center text-lg text-secondary'>
                        <label htmlFor="xp">Experience Points</label>
                        <input className='bg-secondary text-primary font-bold ml-4' type="number" id="xp" name="xp" />
                    </div>
                    <div className='flex flex-row justify-center'>
                        <button type="submit" className='bg-secondary text-lg font-bold text-primary rounded-xl px-10 py-2 hover:py-3 hover:px-11 hover:bg-glow hover:drop-shadow-gl hover:text-purple-950'>Create Quest</button>
                    </div>
                </form>
            </div>
        </>
    )
}