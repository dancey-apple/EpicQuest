import { useRouter, userRouter } from 'next/router';
import React from 'react';
import { SiSidequest,SiGiLevelThree } from 'react-icons/si';
import { CgAssign} from 'react-icons/cg';


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
        <nav className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-yellow-900 p-2.5 shadow-2xl">
            <SideBarIcon icon={<SiSidequest size='28' />} onClick={goToBountyBoard}/>
            <SideBarIcon icon={<CgAssign size='28' />} onClick={goToMyQuests}/>
            <SideBarIcon icon={<SiGiLevelThree size='28' />} onClick={goToMyStats}/>
        </nav>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip' }) => {
    return (
        <div className='sidebar-icon'>
            {icon}
            <span class="sidebar-tooltip">
                {text}
            </span>
        </div>
    );
};

export default NavBar;