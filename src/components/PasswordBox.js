export default function PasswordBox({name, value="", onchange=()=>{}}){
    return(
        <input name={name} id={name} value={value} onChange={()=>{onchange()}} placeholder="Password" className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150" type="password"/>
    )
}