import type { NextPage } from 'next'
import { Header } from '../components/header'
import { Footer } from '../components/footer'


import styles from '../styles/Home.module.scss'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const {data: session} = useSession()
  console.log(session)
  
  return (
    <>
      <Header />
      <div className={styles.outerContainer}>     
        <div className={styles.videoBox}>
          <span>VÍDEO</span>
        </div>
        <div className={styles.videoInfo}>
          <h2>Lorem Ipsun</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ligula ipsum. Suspendisse vel nibh nec eros dapibus malesuada.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home