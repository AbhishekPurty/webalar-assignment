import { useState } from "react";
import axios from "axios";
import TextBox from "@/components/TextBox";
import SubmitButton from "@/components/SubmitButton";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!document.getElementById('email').value || !password){
      setMessage("Enter all details")
      return
    }

    if(password != confirmPassword){
      setMessage("Passwords don't match")
      return
    }

    try {
      const response = await axios.post("/api/signup", { email:document.getElementById('email').value, password:password });
      console.log(response.data)
      window.location.assign('/login')
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="bg-white dark:bg-darkMode dark:text-white h-[100vh] flex ease-out duration-300">
    
                {/* Form Div */}
                <div className="flex flex-col justify-center items-center gap-16 h-full w-full md:w-[50%]">
    
                    {/* Heading Section */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        
                        {/* Header */}
                        <div className="text-primary text-center font-bold text-2xl">
                            REGISTER
                        </div>
    
                        {/* Description */}
                        <div className="text-center text-[#525252] dark:text-[#ACACAC]">
                            To make your life more productive
                        </div>
    
                    </div>
    
                    {/* Form */}
                    <div className="flex flex-col w-[90%] md:w-[60%] justify-center items-center gap-4">
                        
                        {
                          message&&
                          <div className="text-xs text-red-600 w-full">{message}</div>
                        }

                        <div className="flex flex-col gap-2 w-full">
    
                            
    
                            {/* Email */}
                            <TextBox func={()=>{setMessage("")}} placeholder={'Email'} name={'email'} id={'email'}/>
    
                            {/* Password */}
                            <input name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value); setMessage("")}} placeholder="Password" className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="password"/>
                            
                            {/* Confirm Password */}
                            <input name={'password'} style={{outline:password.trim()!==""&&password!==confirmPassword&&"solid 1px red"}} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value); setMessage("")}} placeholder="Confirm Password" className={`bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150`} type="password"/>
                        </div>
    
                        <div className="flex  gap-3 w-full">
    
                            {/* Submit */}
                            {/* <SubmitButton func={(e)=>{login(e)}} text={'Login'}/> */}
                            
                            {/* Signup */}
                            <SubmitButton func={(e)=>{e.preventDefault(); window.location.assign('/login')}} text={'Go to Login'}/>

                            {/* Register */}
                            <SubmitButton func={(e)=>{handleSignup(e)}} text={'Register'}/>


                        </div>
    
                    </div>
    
    
                </div>
    
                {/* Infographic */}
                <div className="hidden md:flex justify-end gap-16 h-full md:w-[50%]">
                    <img src="/Rectangle 4.svg"/>
                </div>
    
            </div>
  );
}
