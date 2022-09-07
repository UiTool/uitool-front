import type { NextPage } from 'next'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.outerContainer}>
        <Header />
        <div className={styles.videoContainer}>
          <div className={styles.videoBox}>
            <span>VIDEO</span>
          </div>
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
