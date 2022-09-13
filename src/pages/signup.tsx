import type { NextPage } from 'next'
import { Header } from '../components/header'

import styles from '../styles/Signup.module.scss'

const Signup: NextPage = () => {
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <h1>Welcome</h1>
          <div className={styles.containerSignup}>
          <div className={styles.registerSocials}>
            <button></button>
            <button></button>
          </div>
          <div className={styles.verticalLine}/>
          <div className={styles.register}>
            <h2>Register</h2>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <button></button>
            <span>Already have an account?</span>
          </div>
        </div>
      </div>
    </>
  ) 
}

export default Signup
