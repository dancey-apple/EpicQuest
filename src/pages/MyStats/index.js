import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";
import Image from "next/image";

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
            <div id= "UserHeader" className='flex flex-row justify-center text-4xl text-secondary hover:text-glow hover:drop-shadow-gl transition-all duration-300 my-5'>
                <h1>Adventurer: </h1>
                <h1>{stats.username}</h1>
            </div>
            <div className='max-w-full overflow-hidden drop-shadow-lg rounded-xl  transition-all duration-300 bg-yellow-950 border-solid border-2 border-yellow-900 text-secondary gap-4 ml-28 mr-4 h-fit' >
                <div className='flex flex-row'>
                    <Image src='/mage.png' alt="a mage character" width={500} height={500} className='max-w-52 h-fit mr-4'/>
                    <div className='flex flex-col'>
                        <div>
                            <h2 className='font-bold text-2xl drop-shadow-gl'>Stats:</h2>
                        </div>
                        <div className='border-solid bg-secondary h-1 drop-shadow-gl'></div>
                        <div id="statistics">
                            <p>Level: {stats.level}</p>
                            <p>XP: {stats.xp}</p>
                            <p>XP to next Level: ?</p>
                            <p>Gold: {stats.gold}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}