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
            } else {
                const error = await res.json();
                alert(`Failed to create Quest. Error: ${error.message}`);
        }
    }

    return(
        <>
            <NavBar />
            <h1 style={{
                textAlign: "center",
                margin: "75px 0 25px 0",
            }}>New Quest</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <form onSubmit={createQuest} style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "25vh",
                    width: "50vw",
                    justifyContent: "space-around",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "10px",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "75%",
                    }} required>
                        <label htmlFor="summary">Summary</label>
                        <input style={{
                            display: "flex",
                            margin: "0 0 0 10px",
                        }}type="text" id="summary" name="summary" />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "75%",
                    }}>
                        <label htmlFor="description">Description</label>
                        <textarea style={{
                            display: "flex",
                            margin: "0 0 0 10px",
                        }}id="description" name="description" />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "75%",
                    }}>
                        <label htmlFor="xp">Experience Points</label>
                        <input style={{
                            display: "flex",
                            margin: "0 0 0 10px",
                        }}type="number" id="xp" name="xp" />
                    </div>
                    <button type="submit" style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>Create Quest</button>
                </form>
            </div>
        </>
    )
}