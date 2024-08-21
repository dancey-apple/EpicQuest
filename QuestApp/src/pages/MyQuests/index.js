import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../NavBar";

export default function MyQuest() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();

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
            throw new Error("Failed to unassign quest");
        }

        setQuests(currentQuests => currentQuests.map(quest =>
            quest.id === questId ? { ...quest, assigneeId: null, assignee: null } : quest
        ));
    } catch (error) {
        console.error('Error unassigning quest:', error);
        setError(error.message);
    }
};

  if (loading) {
    return <h1>Loading...</h1>;
  }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

  return (
    <>
        <NavBar></NavBar>
      <h1 className='flex flex-row justify-center text-4xl text-secondary hover:text-glow hover:drop-shadow-gl transition-all duration-300 my-5'>My Quests</h1>
      <div className='flex flex-row flex-wrap gap-4 ml-28 mb-10'>
        {quests.map((quest, index) => (
          <div
            key={index}
            className='max-w-sm overflow-hidden drop-shadow-lg rounded-xl hover:max-w-md transition-all duration-300 bg-yellow-900 text-secondary gap-4'>
            <img class="w-full rounded" src="https://github.com/dancey-apple/EpicQuest/blob/TailwindStyles/QuestApp/src/img/bountyBoard.png?raw=true"/>
            <div id="quest-header" className='p-3'>
              <h2 className='font-bold text-lg'>{quest.summary}</h2>
            </div>
            <div id="quest-summary" className='p-3'>
              <p>{quest.description}</p>
            </div>
            <div id="quest-stats" className='grid grid-cols-3 p3 justify-between'>
              <div className='flex flex-row justify-center'>
                <p className='font-bold'>Status: </p>
                <p className='px-2'>{quest.status}</p>
              </div>
              <div className='flex flex-row justify-center'>
                <p className='font-bold'>Experience Points: </p>
                <p className='px-2'>{quest.xp}</p>
              </div>
              <div className='flex flex-row flex-wrap justify-center'>
                <p className='font-bold'>Assignee: </p>
                <p className='px-2'>{quest.assigneeId ? `${quest.assignee.firstName} ${quest.assignee.lastName}` : "Unassigned"}</p>
              </div>
            </div>
            <div className='flex flex-row justify-around drop-shadow-gl'>
              {quest.assigneeId && (
                  <button className='hover:font-bold hover:text-glow' onClick={() => unassignQuest(quest.id)}>Drop Quest</button>
                )}
              <button className='hover:font-bold hover:text-glow' onClick={() => beginQuest(quest.id)}>Begin Quest</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
