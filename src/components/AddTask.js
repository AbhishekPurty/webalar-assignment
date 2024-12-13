import { RiAddLine, RiCloseLine } from "react-icons/ri";
import TextBox from "./TextBox";
import TextArea from "./TextArea";
import DateBox from "./DateBox";
import { useEffect, useState } from "react";
import Tags from "./Tags";
import SubmitButton from "./SubmitButton";
import axios from "axios";

export default function AddTask({func}){

    const [skills, setSkills] = useState([])
    const [tasks, setTasks] = useState([])
    const [ctr, setCtr] = useState(1)

    useEffect(() => {
      
        
    
      return () => {}
    }, [])
    

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
                        <TextBox name={'title'} placeholder={'Title'}/>

                        {/* Client */}
                        {/* <TextBox name={'client'} placeholder={'Client'}/> */}

                        {/* Description */}
                        <TextArea name={'jd'} placeholder={'Description'}/>
                        
                        {/* Tasks */}
                        <div className=" flex flex-col gap-2 my-2">
                            {
                                tasks.map((task, idx)=>{

                                    return(
                                        <input name={'task'+idx} key={'task'+idx} placeholder={'Enter Task'} defaultValue={task} className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="text"/>
                                    )
                                })
                            }

                            <div className="flex items-center justify-between gap-2">

                                <div className="w-[91%]">
                                    <input id="newTask" placeholder={'Enter Task'} className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="text"/>
                                </div>

                                <div 
                                    onClick={()=>{
                                        let temp = tasks
                                        if(!document.getElementById('newTask').value.trim()){
                                            return
                                        }

                                        temp.push(document.getElementById('newTask').value.trim())
                                        
                                        setTasks(temp)

                                        setCtr(ctr+1)

                                        document.getElementById('newTask').value = "";
                                    }} 
                                    className="bg-[linear-gradient(45deg,#9181F4,#5038ED)] text-white w-[2.4rem] h-[2.4rem] rounded-lg flex justify-center items-center active:scale-[0.95] hover:scale-[1.05] ease-out duration-150 cursor-pointer"
                                >
                                        <RiAddLine size={20}/>
                                </div>
                                
                            </div>
                        </div>

                        {/* Date */}
                        <DateBox name={'deadline'} placeholder={'Date'}/>
                        
                        {/* Skills Entry */}
                        <div className="flex items-center justify-between gap-2">
                            
                            {/* Textbox */}
                            <div className="w-[91%]">
                                <input id={`skills`} name={'skills'} placeholder={'Skills'} className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="text"/>
                            </div>
                            
                            {/* Add new skill */}
                            <div 
                                onClick={()=>{
                                    let temp = skills
                                    if(!document.getElementById('skills').value.trim()){
                                        return
                                    }

                                    temp.push(document.getElementById('skills').value.trim())
                                    
                                    setSkills(temp)

                                    setCtr(ctr+1)

                                    document.getElementById('skills').value = "";
                                }} 
                                className="bg-[linear-gradient(45deg,#9181F4,#5038ED)] text-white w-[2.4rem] h-[2.4rem] rounded-lg flex justify-center items-center active:scale-[0.95] hover:scale-[1.05] ease-out duration-150 cursor-pointer"
                            >
                                    <RiAddLine size={20}/>
                            </div>
                        </div>

                        {/* Skills tags */}
                        <div className="flex gap-1 flex-wrap">
                            {
                                skills.map((skill, idx)=>{
                                    return(
                                        <div key={idx} className="pr-2 bg-[#E3E3E3] dark:bg-[#252525] text-[#616161] dark:text-[#FFFFFF] text-xs ease-out duration-300 rounded-sm flex justify-between items-center">
                                            <Tags name={skill} />

                                            <RiCloseLine 
                                                onClick={()=>{
                                                    let temp = skills
                                                    setSkills([...temp.slice(0, idx), ...temp.slice(idx+1)])
                                                }} 
                                                className="mt-[1px] cursor-pointer"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        {/* Submit */}
                        <div className="mt-10">
                            <SubmitButton text={"Post Task"}/>
                        </div>
                        
                    </form>

                </div>

            </div>
            

        </div>
    )
}