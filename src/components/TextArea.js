export default function TextArea({name, id, placeholder}){
    return(
        <textarea name={name} id={id} placeholder={placeholder} className="bg-[#F3F1FF] dark:bg-[#252525] focus:scale-[1.02] ease-out duration-150 h-[8rem]"/>
    )
}