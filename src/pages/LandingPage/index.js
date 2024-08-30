import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LandingPage = () => {

    const router = useRouter();
    const goToNewUser = () => {
        router.push("/NewUser");
    }

    return (
        <div className='flex flex-col justify-center ml-28 mt-4 mr-4'>
            <div className='flex flex-row justify-center text-secondary font-bold text-6xl hover:drop-shadow-gl mb-8'>Welcome to EpicQuest!</div>
            <div className='flex flex-col  bg-yellow-900 rounded-lg drop-shadow-gl'>
                <h1 className='flex flex-row justify-center text-secondary font-bold text-4xl mb-4'>Your Adventure Awaits!</h1>
                <div className='flex flex-row justify-center'>
                    <Image className='rounded-lg m-2 max-w-6xl' src="/coverImage.png" width={800} height={500} alt="EpicQuest Cover Image" />
                </div>
                <div className='flex flex-col text-center justify-center text-secondary font-bold gap-4 text-lg'>
                    <p className='text-2xl'>Take on quests, earn XP, and level up!</p>
                    <p className='p-4'>Unlock the power of productivity with our gamified app that turns your daily to-dos into epic quests! Earn Experience Points (XP) and Gold as you conquer each task, leveling up your virtual character along the way. Spend your hard-earned Gold on loot, perks, or even PTO, while your XP helps you climb the ranks, boosting your skills and unlocking new rewards. Whether you&aposre grinding through your workday or slaying personal goals, our app makes it fun, engaging, and rewarding. Start your journey today—because productivity should be an adventure!</p>
                    <p>Log in or Join to begin tracking your Quests!</p>
                </div>
                <div id="button-container" className='flex flex-row justify-center m-4'>
                    <button className='font-bold hover:text-purple-950 rounded-xl hover:flex-grow bg-secondary text-primary hover:drop-shadow-gl hover:bg-glow p-1 transition-all duration-300 w-56 h-24 text-2xl' onClick={(goToNewUser)}>Join the Guild!</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;