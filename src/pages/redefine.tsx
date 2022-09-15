
import type { NextPage } from 'next'
import { Header } from '../components/header' 
import styles from '../styles/Redefine.module.scss'

const Redefine: NextPage = () => {
  return (
    <>
      <Header /> 
      <section>
        <h1 className={styles.title}>Create New Password</h1>
      </section>

      <section className={styles.container}>
        <div className={styles.sign_in}>
          <h2 className={styles.subtitle}>Enter Your new Password</h2>
          <form action="">
            <input className={styles.login_data} placeholder="New Password" type="password" id="password"/>
            <input className={styles.login_data} placeholder="Confirm new Password" type="password" id="password"/>
            <div className={styles.remember_sign_in}>
              <button>Create</button>
            </div>
          </form>
        </div>


      </section>
    </>
  )
}

export default Redefine
