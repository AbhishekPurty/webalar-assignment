import axios from "axios";
import SubmitButton from "./SubmitButton";
import Tags from "./Tags";

export default function Post({post}){

    function deletePost(){
        axios.post("/api/deleteTask", {id: post._id})
        .then((res)=>{
            console.log(res.data)            
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
                    <div className="text-sm font-semibold">
                        {post.title}
                    </div>

                </div>

                {/* Posted time */}
                {/* <div className="flex items-start text-xs  -mt-4 ml-auto text-[10px]">
                    {posted}h ago
                </div> */}
            </div>

            {/* Seperator */}
            <div className=" bg-[#F1F1F1] h-[1px] w-full"/>
            
            {/* Description */}
            <div className="flex flex-col items-center w-full gap-3 p-1">

                {/* Header */}
                <div className="flex justify-between items-center w-full">
                    
                    {/* Heading */}
                    <div className="text-xl font-bold">
                        {post.title}
                    </div>

                    {/* Client */}
                    <div className="text-sm">
                        {post.status}
                    </div>

                </div>

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
                    <div className="text-[10px]">Skills</div>
                    
                    {/* List of skills */}
                    <div className="flex gap-1 flex-wrap w-full">
                        
                    </div>
                </div>                

                {/* Apply and deadline */}
                <div className="flex justify-between items-center w-full">

                    <div className="w-[30%] md:w-[15%]">
                        <SubmitButton text={'Edit'}/>
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