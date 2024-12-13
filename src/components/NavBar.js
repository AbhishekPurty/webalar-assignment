import { FaBell } from "react-icons/fa";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import "@theme-toggles/react/css/Simple.css"
import "@theme-toggles/react/css/Classic.css"
import { Classic, Simple } from "@theme-toggles/react"

export default function NavBar({setIsDark, isDark}){
    return(
        // Parent div
        <div className="bg-white z-50 dark:bg-[#171717] text-[#4D4D4D] w-full h-[3rem] flex justify-between items-center fixed px-6 md:px-20 shadow-md ease-out duration-300">

            {/* Logo */}
            {/* <img width={150} className="-ml-2" src="/logo.svg"/> */}
            <div>Task Management System</div>

            {/* Menu */}
            <div className="flex gap-4 justify-center items-center ">

                {/* Mode Toggle */}
                <div className="">
                    <Classic onToggle={()=>{setIsDark(prev=>!prev)}} duration={500} className="mt-[6px] -mr-[5px] scale-[2]" toggled={isDark}/>
                </div>

                {/* Notifications */}
                <FaBell size={25}/>

                {/* Avatar */}
                <div className=" md:hidden rounded-full w-[1.6rem] h-[1.6rem] bg-[#e8e8e8] text-[#4d4d4d] dark:text-[#cecece] dark:bg-[#4D4D4D] flex justify-center items-center overflow-hidden text-sm ease-out duration-300">
                    A
                </div>

            </div>

        </div>
    )
}