import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";

export default function MyStats() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/users");
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const data = await res.json();
                setStats(data.stats);
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
            <NavBar />
            <div id= "UserHeader" style={{
                display: "flex",
                flexDirection: "row",
                margin: "75px 0 0 0",
            }}>
                <h1 style={{
                display: "flex",
                }}>User: </h1>
                <h1>{stats.username}</h1>
            </div>
            <div id="stats" style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "10px",
            }}>
                <div id="title" style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <h2>Stats:</h2>
                </div>
                <div id="statistics" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                    <p>Level: {stats.level}</p>
                    <p>XP: {stats.xp}</p>
                    <p>XP to next Level: ?</p>
                </div>
            </div>
        </>
    );
}