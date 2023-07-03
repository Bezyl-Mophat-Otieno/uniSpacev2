import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import  org2  from '@/public/org2.jpg';
import LoginForm from '@/components/LoginForm';
import { useEffect } from 'react';







export default function Home() {

  
  return (
    <>
      <Head>
        <title>uniSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&family=Ysabeau+Infant:wght@200&display=swap" rel="stylesheet"/>
                
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
      </Head>
      <main className={styles.main}>
      <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={org2} alt="Login" className={styles.image} />
      </div>
      <LoginForm/>
    </div>
      </main>
    </>
  )
}
