import Image from 'next/image'
import styles from './styles.module.scss'

import logo from '../../public/logo.svg'
import login from '../../public/login.svg'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <span  className={styles.logo}>
        <Image src={logo} alt="Logo UI Tools"/>
      </span>
      <span className={styles.login}>
        <Image src={login} alt="Login" />
      </span>
    </header>
  )
}