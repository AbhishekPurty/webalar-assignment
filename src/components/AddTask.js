import { RiAddLine, RiCloseLine } from "react-icons/ri";
import TextBox from "./TextBox";
import TextArea from "./TextArea";
import DateBox from "./DateBox";
import { useEffect, useState } from "react";
import Tags from "./Tags";
import SubmitButton from "./SubmitButton";
import axios from "axios";

export default function AddTask({func, task=null, setTaskToggle, setRefresh}){

    useEffect(() => {
        if(task===null){
            return ()=>{}
        }

        document.getElementById('title').value = task.title || ""
        document.getElementById('desc').value = task.description || ""
        document.getElementById('status').value = task.status 
        document.getElementById('city').value = task.city || ""
        document.getElementById('country').value = task.country || ""
        
    
      return () => {}
    }, [])

    async function addTask(){

        if(document.getElementById('title').value.trim() === "" ||
        document.getElementById('desc').value.trim() === "" ||
        document.getElementById('status').value.trim() === null ||
        document.getElementById('city').value.trim() === "" ||
        document.getElementById('country').value.trim() === ""){
            return
        }

        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city').value},${document.getElementById('country').value}&APPID=58f141da4ab9402772434dd14b82ca1e`)
        // console.log(await weather);
        
        weather = await weather?.data?.weather[0]?.main
        axios.post("/api/addTask", {
            title:document.getElementById('title').value,
            description:document.getElementById('desc').value,
            status:document.getElementById('status').value,
            weather:weather,
        })
        .then((res)=>{
            console.log(res.data)
            setTaskToggle(false)
            setRefresh(prev=>prev+1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    async function updateTask(){

        if(document.getElementById('title').value.trim() === "" ||
        document.getElementById('desc').value.trim() === "" ||
        document.getElementById('status').value.trim() === null ||
        document.getElementById('city').value.trim() === "" ||
        document.getElementById('country').value.trim() === ""){
            return
        }
        
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('city').value},${document.getElementById('country').value}&APPID=58f141da4ab9402772434dd14b82ca1e`)
        weather = await weather?.data?.weather[0]?.main
        axios.post("/api/updateTask", {
            id: task._id,
            title:document.getElementById('title').value,
            description:document.getElementById('desc').value,
            status:document.getElementById('status').value,
            weather:weather,
        })
        .then((res)=>{
            console.log(res.data)
            setTaskToggle(false)
            setRefresh(prev=>prev+1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    

    return(
        // Parent div
        <div className="relative">

            {/* greyed out div */}
            <div className="bg-[rgba(97,97,97,0.55)] fixed top-0 left-0 h-[100vh] w-[100vw] z-[51] flex justify-center md:justify-end items-center p-6 md:p-0 ">

                {/* Notification Box */}
                <div className=" bg-white dark:bg-[#171717] ease-out duration-300 dark:text-[#ffffff] w-full md:w-[40%] min-h-[60%] md:min-h-[80%] z-[52] rounded-xl md:rounded-r-none border-l-4 border-r-4 md:border-r-0 border-[#9181F4] px-4 py-4 md:pr-10 flex flex-col gap-4 overflow-x-auto h-full">
                    
                    {/* Close Button */}
                    <div className="flex justify-end items-center">
                        <RiCloseLine onClick={func} size={20} className="cursor-pointer hover:scale-[1.2] active:scale-[0.98] ease-out duration-150" color="#C5C5C5"/>
                    </div>

                    {/* Heading */}
                    <div className="text-[#9181F4] text-center font-bold text-xl">
                        Add Task
                    </div>

                    {/* Main Form */}
                    <form onSubmit={(e)=>{e.preventDefault()}} className="flex flex-col gap-2 px-10">
                        
                        {/* Title */}
                        <TextBox name={'title'} id={"title"} placeholder={'Title'}/>

                        {/* Description */}
                        <TextArea name={'desc'} id={'desc'} placeholder={'Description'}/>
                        
                        {/* Tasks */}
                        <div className=" flex flex-col gap-2 my-2">

                            <div className="flex items-center justify-between gap-2">

                                <select id="status" className="w-full bg-[#F3F1FF] px-2 h-[2.5rem] outline-none rounded-md dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150">
                                    <option value={null}>Select</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'In-Progress'}>In-Progress</option>
                                    <option value={'Completed'}>Completed</option>
                                </select>
                                
                            </div>
                        </div>

                        <TextBox name={'city'} id={'city'} placeholder={'City'}/>

                        <TextBox name={'country'} id={'country'} placeholder={'Country'}/>
                        
                        
                        {/* Submit */}
                        <div className="mt-10">
                            <SubmitButton func={()=>{
                                if(task===null){
                                    addTask()
                                }
                                else{
                                    updateTask()
                                }
                            }} text={"Post Task"}/>
                        </div>
                        
                    </form>

                </div>

            </div>
            

        </div>
    )
}