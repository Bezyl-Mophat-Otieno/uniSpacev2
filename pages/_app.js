import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import '@/styles/globals.css'
import { useEffect } from "react";



export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle")
  },[])
  return <Component {...pageProps} />
}
