import axios from "axios";
import SubmitButton from "./SubmitButton";
import Tags from "./Tags";

export default function Post({post, setRefresh, setTaskToggle, setcurrTask}){

    function deletePost(){
        axios.post("/api/deleteTask", {id: post._id})
        .then((res)=>{
            console.log(res.data)
            setRefresh(prev=> prev+1)          
        })
        .catch((err)=>{
            console.log(err)            
        })
    }

    return(
        // Parent div
        <div className=" border border-[#DDDDDD] dark:border-[#323232] rounded-lg w-full  p-4 flex flex-col gap-2 ease-out duration-300">

            {/* Header Section */}
            <div className="flex items-center gap-2 p-1">

                {/* Name and post */}
                <div className="">

                    {/* Name */}
                    <div className="text-xl font-bold">
                        {post.title}
                    </div>

                </div>

                {/* Posted time */}
                <div className="flex items-start text-xs  -mt-4 ml-auto text-[10px]">
                    {post.status}
                </div>
            </div>

            {/* Seperator */}
            <div className=" bg-[#F1F1F1] h-[1px] w-full"/>
            
            {/* Description */}
            <div className="flex flex-col items-center w-full gap-3 p-1">

                {/* Description */}
                <div className="text-sm w-full">
                    {post.description}
                </div>

                {/* Tasks */}
                {/* <div className="w-full">
                    <ul className="w-full text-sm">
                        {
                            tasks.map((task, idx)=>{
                                return(
                                    <li className="ml-1" key={idx}>- {task}</li>
                                )
                            })
                        }
                    </ul>
                </div> */}

                {/* Skills */}
                <div className="w-full flex flex-col gap-1">

                    {/* Heading */}
                    <div className="text-[10px]">{post.weather}</div>

                </div>                

                {/* Apply and deadline */}
                <div className="flex justify-between items-center w-full">

                    <div className="w-[30%] md:w-[15%]">
                        <SubmitButton func={()=>{setcurrTask(post); setTaskToggle(true)}} text={'Edit'}/>
                    </div>

                    {/* <div className="text-sm">
                        Deadline: {deadline}
                    </div> */}
                    <div className="w-[30%] md:w-[15%]">
                        <SubmitButton func={()=>{deletePost()}} text={'Delete'}/>
                    </div>

                </div>
                

            </div>
            
        </div>
    )
}