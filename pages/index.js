import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import  org2  from '@/public/org2.jpg';
import LoginForm from '@/components/LoginForm';


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
