
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useEffect } from "react";
import { Provider } from 'react-redux';
import {store , persistor} from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react';



export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle")
  },[])
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
      </Provider>
    </>
  )
}
