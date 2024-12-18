import "@/styles/globals.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(true)
  const [show, setShow] = useState(null)

  useEffect(() => {
    
    // console.log(Cookies.get('username'));
    

    if(Cookies.get('token') && (window.location.pathname === '/login' || window.location.pathname === '/signup')){
      window.location.assign("/")
      return ()=>{}
  
    }

    if(!Cookies.get('token') && (window.location.pathname !== '/login' && window.location.pathname !== '/signup')){
      window.location.assign("/login")
      return ()=>{}
    }

    setShow(true)
    
    return ()=>{}
    
  }, [])
  
  if(show === true ){
    return(
      <div className={isDark?`dark`:``}>
        <Component setIsDark={setIsDark} isDark={isDark} {...pageProps} />
      </div>
    )
  }

  else{
    return(
      <div className={isDark?`dark`:``}>
        
      </div>
    )
  }
  
  
}
