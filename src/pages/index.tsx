import type { NextPage } from 'next'
import { Header } from '../components/header'
import { Footer } from '../components/footer'


import styles from '../styles/Home.module.scss'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const p_ref = useRef(null)  

  useEffect(() => {
    setTimeout(() => {
      if(p_ref.current)
        (p_ref.current as any).style.display = 'block';
    }, 2500) // 2500 = 2.5s
  }, [])

  return (
    <>
      <Header />
      <div className={styles.avatarContainer}>
        <img className={styles.avatarImg} src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" />
        <p ref={p_ref} id='label-avatar'>Olá! Você precisa de ajuda?</p>
      </div>
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