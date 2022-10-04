import type { NextPage } from 'next'
import Image from 'next/image'
import { Header } from '../components/header'
import google_button from '../public/google_button.svg'
import face_button from '../public/face_button.svg'
import { api } from '../services/api'

import styles from '../styles/Signup.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'

const Signup: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async () => {
    try {
      await api.post('account/create', {
        name,
        email,
        password
      });
      
      Router.push('/login')
      
    } catch {
      Router.push('/login')
    }
  }

  return (
    <>
     <Header /> 
      <section>
        <h1 className={styles.title}>Welcome!!</h1>
      </section>

      <section className={styles.container}>

        <div className={styles.buttons}>
            <a href='#'><Image src={google_button} alt="Login with google" /></a>
            <a  href='#'><Image src={face_button} alt="Login with facebook" /></a>
        </div>

        <div className={styles.separation}>
          <div className={styles.bar}></div>
          <div> or </div>
          <div className={styles.bar}></div>
        </div>
      
        <div className={styles.sign_in}>
          <h2 className={styles.subtitle}>Sign in</h2>
          <form action="">
            <input className={styles.login_data} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" id="name"/>
            <input className={styles.login_data} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" id="email"/>
            <input className={styles.login_data} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <input className={styles.login_data} onChange={(e) => setPassword(e.target.value)}placeholder="Confirm Password" type="password" id="password"/>
            <div className={styles.remember_sign_in}>
              <button onClick={handleSubmit}>Sign up</button>
            </div>
          </form>
          <div className={styles.pass_alternate}>
            <div className={styles.register}><Link href='/login'><a>Already have an account?</a></Link></div>
          </div>
        </div>
      </section>
    </>
  ) 
}

export default Signup
