import { useRouter, userRouter } from 'next/router';
import React from 'react';
import { SiSidequest} from 'react-icons/si';
import { CgAssign } from 'react-icons/cg';
import { GiSkills, GiAbstract054 } from 'react-icons/gi';
import { MdAddCircle } from 'react-icons/md';
import { IoMdLogOut } from "react-icons/io";


const NavBar = () => {
    const router = useRouter();
    
    const goToBountyBoard = () => {
        router.push("/Bountys");
    }

    const goToMyQuests = () => {
        router.push("/MyQuests");
    };

    const goToMyStats = () => {
        router.push("/MyStats");
    };

    const goToLogin = () => {
        router.push("/Login");
    };

    return (
        <nav className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-yellow-900 p-2.5 shadow-2xl z-10">
            <SideBarIcon icon={<GiAbstract054 size='45' />} text='Home' onClick={() => router.push("/")}/>
            <SideBarIcon icon={<SiSidequest size='45' />} text='Bounty Board' onClick={goToBountyBoard}/>
            <SideBarIcon icon={<CgAssign size='45' />} text='My Quests' onClick={goToMyQuests}/>
            <SideBarIcon icon={<GiSkills size='45' />} text='My Stats' onClick={goToMyStats}/>
            <SideBarIcon icon={<MdAddCircle size='45' />} text='New Quest' onClick={() => router.push("/NewQuestForm")}/>
            <div className='mt-auto'>
                <SideBarIcon icon={<IoMdLogOut size='45' />} text='Log Out' onClick={() => router.push("/Login")}/>
            </div>
        </nav>
    );
};

const SideBarIcon = ({ icon, text, onClick }) => {
    return (
        <div className='sidebar-icon flex flex-row group text-black hover:text-glow hover:drop-shadow-gl m-2 py-2.5' onClick={onClick}>
            {icon}
            <span className='sidebar-tooltip absolute w-auto p-2 m-4 min-w-max left-14 rounded-md shadow-md text-purple-950 text-lg bg-glow font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100'>{text}</span>
        </div>
    );
};

export default NavBar;