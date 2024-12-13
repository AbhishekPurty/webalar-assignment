import AddTask from "@/components/AddTask";
import NavBar from "@/components/NavBar";
import Post from "@/components/Post";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";
import Cookies from "js-cookie";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState } from "react";
import jwtDecode from 'jsonwebtoken';

import { RiLogoutBoxRLine } from "react-icons/ri";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({setIsDark, isDark}) {

  // Add Task Toggle
  const [taskToggle, setTaskToggle] = useState(false)
  const [posts, setPosts] = useState([])

  const [currUser, setcurrUser] = useState(null)
  const [currTask, setcurrTask] = useState(null)

  const [refresh, setRefresh] = useState(1)

  useEffect(() => {
    const token = Cookies.get('token');
    const decoded = jwtDecode.decode(token);
    setcurrUser(decoded.email)
  
    return () => {}
  }, [])
  

  useEffect(()=>{

    axios.get('/api/getTasks')
    .then((res)=>{
      console.log(res.data.data)  
      setPosts(res.data.data)
    })
    .catch((err)=>{
      console.log(err)      
    })

    return () => {}
  }, [refresh])
  

  return (

    // Parent div
    <div className="">

      {/* Navbar */}
      <NavBar setIsDark={setIsDark} isDark={isDark}/>

      {/* Add Task Slider */}
      {
        taskToggle&&
        <AddTask setTaskToggle={setTaskToggle} setRefresh={setRefresh} task={currTask} func={()=>setTaskToggle(false)}/>
      }

      {/* Main div*/}
      <div className="bg-[#f7f7f7] dark:bg-darkMode text-[#4D4D4D] dark:text-white min-h-[100vh] flex flex-col md:flex-row-reverse gap-4 pt-[4.5rem] pb-[2rem] px-4 md:px-20  ease-out duration-300">

        {/* Scrolling div, right */}
        <div className="w-full md:w-[70%] bg-[#ffffff] dark:bg-[#171717] flex flex-col gap-4 items-end rounded-lg p-4 min-h-[25rem] ease-out duration-300">

          {/* Submit Button */}
          <div className="w-full md:w-[40%] lg:w-[20%]">
            <SubmitButton func={()=>{setcurrTask(null); setTaskToggle(true)}} text={'Add Task'}/>
          </div>

          {
            posts.reverse().map((post,idx)=>{

              // console.log(post);
              
              
              return(
                <Post setcurrTask={setcurrTask} setTaskToggle={setTaskToggle} setRefresh={setRefresh} post={post} key={post._id} />
              )
            })
          }

        </div>


        {/* Insights - Left div */}
        <div className="w-[30%] h-[85vh] hidden sticky top-[4.5rem] md:flex flex-col gap-4">

          {/* Profile div */}
          <div className=" w-full bg-[#ffffff] dark:bg-[#171717] flex flex-col gap-16 rounded-lg overflow-hidden min-h-[12rem] pb-2 ease-out duration-300">

            {/* Media */}
            <div className="relative">

              {/* Cover */}
              <div className="h-[6rem] overflow-hidden">
                <Image alt="Cover" src="/bg.jpg" width={1000} height={50}/>
              </div>
              
              {/* Image Circle */}
              <div className=" w-[7rem] h-[7rem] bg-white absolute -bottom-14 left-6 rounded-full overflow-hidden flex justify-center items-center">
                <div className="w-[6.7rem] h-[6.7rem] rounded-full overflow-hidden">
                  <img src="/profile.jpg"/>
                </div>
              </div>

            </div>

            {/* Details */}
            <div className="px-4 flex flex-col gap-2 z-20">
              
              {/* Name */}
              <div className="font-bold text-[0.625rem] lg:text-[1rem] text-[#6E5AF0]">
                {currUser}
              </div>


            </div>

          </div>

          {/* Impressions */}
          <div className="w-full bg-[#ffffff] dark:bg-[#171717] p-4 rounded-lg dark:text-[#ffffff] flex flex-col gap-2 ease-out duration-300">
            
            {/* Heading */}
            <div className="text-sm">
              Impressions
            </div>

            {/* Taskss Posted by You */}
            <div className="bg-[#F7F7F7] dark:bg-[#252525] rounded-md flex items-start justify-between py-2 px-4 ease-out duration-300 ">

              <div className="w-[80%]">
                Tasks posted by you
              </div>

              <div className="font-bold text-[#5B44EE]">
                {posts.length}
              </div>

            </div>
          </div>

          {/* Logout button */}
          <div className="flex items-center gap-3 hover:underline select-none cursor-pointer mt-auto">
            <RiLogoutBoxRLine/>

            <div onClick={()=>{
                Cookies.remove('token')
                window.location.reload()
              }} 
              className="text-sm"
            >
              Logout
            </div>

          </div>

        </div>
        

      </div>
    </div>
    
    
  )
}
