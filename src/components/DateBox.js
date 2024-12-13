export default function DateBox({name, placeholder}){
    return(
        <input type="date" name={name} id={name} placeholder={placeholder} className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150 "/>
    )
}