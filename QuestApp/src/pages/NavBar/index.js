import { useRouter, userRouter } from 'next/router';
import React from 'react';
import { SiSidequest} from 'react-icons/si';
import { CgAssign } from 'react-icons/cg';
import { GiSkills } from 'react-icons/gi';


const NavBar = () => {
    const router = useRouter();
    
    const goToBountyBoard = () => {
        router.push("/");
    }

    const goToMyQuests = () => {
        router.push("/MyQuests");
    };

    const goToMyStats = () => {
        router.push("/MyStats");
    };

    return (
        <nav className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-yellow-900 p-2.5 shadow-2xl">
            <SideBarIcon icon={<SiSidequest size='45' />} text='Bounty Board' onClick={goToBountyBoard}/>
            <SideBarIcon icon={<CgAssign size='45' />} text='My Quests' onClick={goToMyQuests}/>
            <SideBarIcon icon={<GiSkills size='45' />} text='My Stats' onClick={goToMyStats}/>
        </nav>
    );
};

const SideBarIcon = ({ icon, text, onClick }) => {
    return (
        <div className='sidebar-icon flex flex-row group text-black hover:text-secondary m-2 py-2.5' onClick={onClick}>
            {icon}
            <span className='sidebar-tooltip absolute w-auto p-2 m-4 min-w-max left-14 rounded-md shadow-md text-black bg-secondary text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100'>{text}</span>
        </div>
    );
};

export default NavBar;