import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {

    const router = useRouter();
    const goToNewUser = () => {
        router.push("/NewUser");
    }

    return (
        <div className='flex flex-col justify-center ml-28 mt-4'>
            <div className='flex flex-col  bg-primary rounded-lg'>
                <h1 className='flex flex-row justify-center '>Adventure Awaits!</h1>
                <p>Take on quests, earn XP, and level up!</p>
                <p>Unlock the power of productivity with our gamified app that turns your daily to-dos into epic quests! Earn Experience Points (XP) and Gold as you conquer each task, leveling up your virtual character along the way. Spend your hard-earned Gold on loot, perks, or even PTO, while your XP helps you climb the ranks, boosting your skills and unlocking new rewards. Whether you're grinding through your workday or slaying personal goals, our app makes it fun, engaging, and rewarding. Start your journey today—because productivity should be an adventure!</p>
                <p>Log in to begin tracking your Quests!</p>
                <button onClick={(goToNewUser)}>Join the Guild!</button>
            </div>
        </div>
    )
}

export default LandingPage;