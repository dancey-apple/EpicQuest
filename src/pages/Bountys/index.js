import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useRouter, userRouter } from "next/router";
import NavBar from "../NavBar";

export default function QuestsPage() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  
  const router = useRouter();
  const goToNewQuestForm = () => {
    router.push("/NewQuestForm");
  };

  async function loadData() {
    try {
      const res = await fetch("/api/quests");  
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

  const assignQuest = async (questId) => {
    try {
        const res = await fetch(`/api/assignQuest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ questId, assigneeId: 1 }),
        });

        if (!res.ok) {
            throw new Error("Failed to assign quest");
        }else{
          alert("NEW ACHIEVMENT! You just claimed a quest. You can find your quests in the 'My Quests' tab.");
        }

        const { quest } = await res.json();

        setQuests(prevQuests => prevQuests.map(q => 
            q.id === questId ? { ...q, ...quest } : q
        ));
    } catch (error) {
        console.error('Error assigning quest:', error);
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

  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-end mb-4'></div>
      <h1 className='text-6xl  text-secondary flex justify-center hover:text-glow hover:drop-shadow-gl mb-4 transition-all duration-300'>Bounty Board</h1>
      <div className='flex flex-row flex-wrap gap-4 ml-28 border-solid border-2 border-yellow-900 bg-yellow-950 rounded-xl mr-4'>
        {quests.map((quest, index) => (
          <div id="quest-card"
            key={index}
            class="max-w-sm overflow-hidden drop-shadow-lg rounded-xl hover:drop-shadow-gl transition-all duration-300 bg-yellow-900 text-secondary gap-4 m-4">
            <img class="w-full rounded" src="https://github.com/dancey-apple/EpicQuest/blob/TailwindStyles/QuestApp/src/img/bountyBoard.png?raw=true"/>
            <div id="quest-header" className='p-3'>
              <h2 className='font-bold text-lg'>{quest.summary}</h2>
            </div>
            <div id="quest-summary" className='p-3'>
              <p>{quest.description}</p>
            </div>
            <div id="quest-stats" className='grid grid-cols-3 p-3 justify-between'>
              <div className='flex flex-row'>
                <p className='font-bold'>Status: </p>
                <p className='px-2'>{quest.status}</p>
              </div>
              <div className='flex flex-row'>
                <p className='font-bold'>XP: </p>
                <p className='px-2'>{quest.xp}</p>
              </div>
              <div className='flex flex-row'>
                <p className='font-bold'>Gold: </p>
                <p className='px-2'>{quest.gold}</p>
              </div>
              <div className='flex flex-row flex-wrap border-solid border-black'>
                <p className='font-bold'>Assignee: </p>
                <p className='px-2'>{quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
              </div>
            </div>
            <div id="claimcontainer" className='flex flex-row justify-center m-4'>
              <button className='hover:font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300' onClick={() => assignQuest(quest.id)} disabled={quest.assigneeId !== null}>
                {quest.assigneeId ? "Assigned" : "Claim Quest"}
                </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
