import { useRouter, userRouter } from 'next/router';
import React from 'react';

const NavBar = () => {
    const router = useRouter();
    
    const goToBountyBoard = () => {
        router.push("/");
    }

    const goToMyQuests = () => {
        router.push("/MyQuests");
    };

    return (
        <nav className="NavBar" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#6C3428",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            }}>
            <button onClick={goToBountyBoard} style = {{
                backgroundColor: "#DFA878",
                color: "black",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                fontSize: "1.5em",
            }}>Open Quests</button>
            <button onClick={goToMyQuests} style = {{
                backgroundColor: "#DFA878",
                color: "black",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                fontSize: "1.5em",
            }}>My Quests</button>
        </nav>
    );
}

export default NavBar;