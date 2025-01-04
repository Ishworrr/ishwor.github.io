import{
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverPanel,
    PopoverButton,
    Menu,
} from "@headlessui/react"

import { signOut } from "firebase/auth";
import { auth } from "../libs/firebaseConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { IoIosMenu } from "react-icons/io";
import { RiCurrencyFill } from "react-icons/ri";
import { MdOutlineClose,MdOutlineKeyboardArrowDown } from "react-icons/md";
import React, { useState } from "react";
import  ThemeSwitch  from "./switch";
import  TransitionWrapper  from "./wrapper/transition-wrapper";


const links = [
    { label: "Dashboard", link: "/overview" },
    { label: "Transactions", link: "/transactions" },
    { label: "Accounts", link: "/accounts" },
    { label: "Settings", link: "/settings" },
]

const userMenu=()=>{
    const {user, setCredentials} = useStore((state)=>state);
    const navigate = useNavigate();

    const handleSignout = async()=>{
        if(user.provider === "google"){
            await handleSocialLogout();
        }
        localStorage.removeItem("user")
        setCredentials(null)
        navigate("/sign-in")
    }

    const handleSocialLogout = async()=>{

        try {
            await signOut(auth)
        } catch (error) {
            console.log("Error signing out",error)
            
        }
}

return (
    <Menu as="div" className="relative z-50">
        <div>
            <MenuButton className="">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 wxl:h-12">
                        <p className="text-2xl font-bold ">{user?.firstname?.charAt(0)}</p> 
                    </div>
                    <MdOutlineKeyboardArrowDown className="hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300"/>
                </div>
            </MenuButton>

        </div>
        <TransitionWrapper>
            <MenuItems className="absolute right-0 w-48 py-2 mt-2 bg-white divide-y divide-gray-100 rounded-md ">

            <div className="p-2 md:p-5">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex items-center justify-center text-white rounded-full cursor-pointer min-w-10 size-10 2xl:size-10">
                        <p className="text-2xl font-bold">
                            {user?.firstname?.charAt(0)}
                            </p>
                    </div>
                    <div className="w-full">
                        <p className="text-violet-700">{user?.firstname}</p>
                        <span className="text-xs overflow-ellipsis">
                        {user?.country}
                        </span>

                    </div>
                </div>
                <MenuItem>
                {({active})=>(
                    <Link to="/settings">
                        <button className={`text-gray-900 dark:text-gray-300 mb-4 w-full items-center rounded-md px-2 py-2 text-sm`}>
                            Profile
                        </button>
                    </Link>
                )}
                </MenuItem>
                <MenuItem>
                {({})=>(
                    <button onClick={handleSignout}
                         className={`bg-red-700/15 dark:bg-red-600 text-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                         Sign out
                </button>
                )}
                </MenuItem>
            </div>
</MenuItems>
</TransitionWrapper>
</Menu>
)
}

const MobileSidebar=()=>{
    const location = useLocation();
    const path = location.pathname;
    return(
        <div className="">
<Popover className="">
    {({ open }) => (
        <>
        <PopoverButton 
        className={`flex md:hidden items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400`}
        >
            {open ? <MdOutlineClose size={26}/>:<IoIosMenu size={26}/>}
            </PopoverButton>
            <TransitionWrapper>
                <PopoverPanel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 transform -translate-x-1/2 bg-chat left-1/2"/>
                <div className="flex flex-col space-y-2">
                    {links.map(({label,link},index)=>(
                        <Link to={link} key={index}>
                            <PopoverButton className={`${
                                link===path
                            }`}>
                            </PopoverButton>
                    ))}
                {

                }
                

            </TransitionWrapper>
            </Link>
             </PopoverButton>
        </>
        </Popover>
        </div>
    )
}