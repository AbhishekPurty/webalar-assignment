import PasswordBox from "@/components/PasswordBox";
import SubmitButton from "@/components/SubmitButton";
import TextBox from "@/components/TextBox";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Login Page
export default function Login({setIsDark}){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [wrong, setWrong] = useState(false)
    const [message, setMessage] = useState("");

    function login(e){

        e.preventDefault()
        
        
        axios.post('/api/login',{
            email: document.getElementById('email')?.value,
            password: password
        })
        .then((res)=>{
            console.log( res.data.token );
            Cookies.set("token", res.data.token)

            window.location.assign('/')
        })
        .catch((err)=>{
            
            
            setPassword("")
            setWrong(true)
            console.log(err);            
        })
    }


    

    return(
        // Parent Div
        <div className="bg-white dark:bg-darkMode dark:text-white h-[100vh] flex ease-out duration-300">

            {/* Form Div */}
            <div className="flex flex-col justify-center items-center gap-16 h-full w-full md:w-[50%]">

                {/* Heading Section */}
                <div className="flex flex-col justify-center items-center gap-2">
                    
                    {/* Header */}
                    <div className="text-primary text-center font-bold text-2xl">
                        LOGIN
                    </div>

                    {/* Description */}
                    <div className="text-center text-[#525252] dark:text-[#ACACAC]">
                        To make your life more productive
                    </div>

                </div>

                {/* Form */}
                <form className="flex flex-col w-[90%] md:w-[60%] justify-center items-center gap-4">
                    
                    <div className="flex flex-col gap-2 w-full">

                        {
                            wrong&&
                            <div className="text-red-600 text-xs">Wrong Credentials</div>
                        }

                        {/* Email */}
                        <TextBox placeholder={'Email'} name={'email'} id={'email'}/>

                        {/* Password */}
                        <input name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value); setWrong(false)}} placeholder="Password" className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="password"/>
                    </div>

                    <div className="flex  gap-3 w-[40%]">

                        {/* Submit */}
                        <SubmitButton func={(e)=>{login(e)}} text={'Login'}/>
                        
                        {/* Signup */}
                        <SubmitButton  text={'Signup'}/>
                    </div>

                </form>


            </div>

            {/* Infographic */}
            <div className="hidden md:flex justify-end gap-16 h-full md:w-[50%]">
                <img src="/Rectangle 4.svg"/>
            </div>

        </div>
    )
}