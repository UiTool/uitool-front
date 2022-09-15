
import type { NextPage } from 'next'
import Link from 'next/link'
import { Header } from '../components/header' 
import styles from '../styles/Forgot.module.scss'

const Forgot: NextPage = () => {
  return (
    <>
      <Header /> 
      <section>
        <h1 className={styles.title}>Forgot Password</h1>
      </section>

      <section className={styles.container}>
        <div className={styles.sign_in}>
          <h2 className={styles.subtitle}>Enter your E-mail address</h2>
          <form action="">
            <input className={styles.login_data} placeholder="E-mail" type="email" id="email"/>
            <div className={styles.remember_sign_in}>
              <button>Continue</button>
            </div>
          </form>
          <div className={styles.pass_alternate}>
            <div className={styles.forgot}><Link href='/login'>Cancel</Link></div>
          </div>
        </div>


      </section>
    </>
  )
}

export default Forgot
