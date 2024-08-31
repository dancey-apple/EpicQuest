import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";

export default function MyQuest() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();
  const { data: session } = useSession();

  async function loadData() {
    try {
      const res = await fetch("/api/activeQuest");
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      setQuests(data.quests); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const beginQuest = async (questId) => {
    console.log(questId, status);
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questId, status: "Active" }),
      });

      if (!res.ok) {
        throw new Error("Failed to begin quest");
      }else{
        alert("NEW ACHIEVMENT! You just marked this quest as active. Now go finish it, you lazy bum.");
      }
    } catch (error) {
      setError(error.message);
    }
    loadData();
  };

  const completeQuest = async (questId,  questXP, userId) => {
    console.log(questId, status);
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questId, status: "Completed", questXP, userId}),
      });

      if (!res.ok) {
        throw new Error("Failed to complete quest");
      }else{
        alert("NEW ACHIEVMENT! You just completed a quest! Here's a cookie.");
      }
    } catch (error) {
      setError(error.message);
    }
    loadData();
  };


  const unassignQuest = async (questId) => {
    try {
        const res = await fetch('/api/unassignQuest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questId }),
        });

        if (!res.ok) {

            throw new Error(`Failed to unassign quest: ${res.status} ${res.statusText}`);
        }else{
          alert("NEW ACHIEVMENT! You gave up on a quest. You have lost 10 XP.");
        }
        const updatedQuestData = await res.json();

        setQuests(currentQuests => currentQuests.map(quest =>
            quest.id === questId ? { ...quest, ...updatedQuestData.quest, assigneeId: null, assignee: null } : quest
        ));
    } catch (error) {
        console.error('Error unassigning quest:', error);
        setError(error.message); 
    }
    loadData();
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
      return <h1>Error: {error}</h1>;
  }

  if (!session) {
    return <h1>Please sign in (at the bottom left of your screen) to view your accepted quests.</h1>
  }

  return (
    <>
        <NavBar></NavBar>
      <h1 className='flex flex-row justify-center text-4xl text-secondary hover:text-glow hover:drop-shadow-gl transition-all duration-300 my-5'>My Quests</h1>
      <div className='flex flex-row justify-center gap-4 text-lg text-secondary font-bold'>
        {/*}to do column ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className='flex flex-col gap-4 ml-28 mb-10 items-center border-2 border-solid border-yellow-900 bg-yellow-950 rounded-lg'>
          <div className='flex justify-center text-2xl'>To Do</div>
          {quests.filter(quest => quest.status === "OPEN").map((quest, index) => (
            <div
              key={index}
              className='max-w-sm overflow-hidden drop-shadow-lg rounded-xl hover:drop-shadow-gl transition-all duration-300 bg-yellow-900 text-secondary gap-4 m-4'>
              <Image className="w-full rounded" src="/bountyBoard.png" width={500} height={500} alt='Wood Background Image'/>
              <div id="quest-header" className='p-3'>
                <h2 className='font-bold text-lg'>{quest.summary}</h2>
              </div>
              <div id="quest-summary" className='p-3'>
                <p>{quest.description}</p>
              </div>
              <div id="quest-stats" className='grid grid-cols-3 p3 justify-between'>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Status: </p>
                  <p className='px-2'>{quest.status}</p>
                </div>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>XP: </p>
                  <p className='px-2'>{quest.xp}</p>
                  <p className='font-bold drop-shadow-gl text-glow'>Gold: </p>
                  <p className='px-2'>{quest.gold}</p>
                </div>
                <div className='flex flex-row flex-wrap justify-center border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Assignee: </p>
                  <p className='px-2'>{quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
                </div>
              </div>
              <div className='flex flex-row justify-around m-4'>
                {quest.assigneeId && (
                    <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                  )}
                <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => beginQuest(quest.id)}>Begin Quest</button>
              </div>
            </div>
          ))}
        </div>
        {/*active column ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className='flex flex-col gap-4 ml-28 mb-10 border-2 border-solid border-yellow-900 bg-yellow-950 rounded-lg'>
        <div className='flex justify-center text-2xl'>Active</div>
          {quests.filter(quest => quest.status === "Active").map((quest, index) => (
            <div
              key={index}
              className='max-w-sm overflow-hidden drop-shadow-lg rounded-xl hover:drop-shadow-gl transition-all duration-300 bg-yellow-900 text-secondary gap-4 m-4'>
              <Image className="w-full rounded" src="/bountyBoard.png" width={500} height={500} alt='Wood Background Image'/>
              <div id="quest-header" className='p-3'>
                <h2 className='font-bold text-lg'>{quest.summary}</h2>
              </div>
              <div id="quest-summary" className='p-3'>
                <p>{quest.description}</p>
              </div>
              <div id="quest-stats" className='grid grid-cols-3 p3 justify-between'>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Status: </p>
                  <p className='px-2'>{quest.status}</p>
                </div>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>XP: </p>
                  <p className='px-2'>{quest.xp}</p>
                  <p className='font-bold drop-shadow-gl text-glow'>Gold: </p>
                  <p className='px-2'>{quest.gold}</p>
                </div>
                <div className='flex flex-row flex-wrap justify-center border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Assignee: </p>
                  <p className='px-2'>{quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
                </div>
              </div>
              <div className='flex flex-row justify-around m-4'>
                {quest.assigneeId && (
                    <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                  )}
                <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => completeQuest(quest.id)}>Complete Quest</button>
              </div>
            </div>
          ))}
        </div>
        {/*}completed column --------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className='flex flex-col gap-4 ml-28 mb-10 border-2 border-solid border-yellow-900 bg-yellow-950 rounded-lg'>
        <div className='flex justify-center text-2xl'>Completed</div>
          {quests.filter(quest => quest.status === "Completed").map((quest, index) => (
            <div
              key={index}
              className='max-w-sm overflow-hidden drop-shadow-lg rounded-xl hover:drop-shadow-gl transition-all duration-300 bg-yellow-900 text-secondary gap-4 m-4'>
              <Image className="w-full rounded" src="/bountyBoard.png" width={500} height={500} alt='Wood Background Image'/>
              <div id="quest-header" className='p-3'>
                <h2 className='font-bold text-lg'>{quest.summary}</h2>
              </div>
              <div id="quest-summary" className='p-3'>
                <p>{quest.description}</p>
              </div>
              <div id="quest-stats" className='grid grid-cols-3 p3 justify-between'>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Status: </p>
                  <p className='px-2'>{quest.status}</p>
                </div>
                <div className='flex flex-row justify-center flex-wrap border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>XP: </p>
                  <p className='px-2'>{quest.xp}</p>
                  <p className='font-bold drop-shadow-gl text-glow'>Gold: </p>
                  <p className='px-2'>{quest.gold}</p>
                </div>
                <div className='flex flex-row flex-wrap justify-center border-2 rounded-lg pd-2 border-secondary border-solid mx-1 '>
                  <p className='font-bold drop-shadow-gl text-glow'>Assignee: </p>
                  <p className='px-2'>{quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
                </div>
              </div>
              <div className='flex flex-row justify-around m-4'>
                {quest.assigneeId && (
                    <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                  )}
                <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => beginQuest(quest.id)}>Restart Quest</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
