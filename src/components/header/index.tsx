import Image from 'next/image'
import styles from './styles.module.scss'

import logo from '../../public/logo.svg'
import Link from 'next/link'
import { LoginButton } from '../LoginButton'

export const Header: React.FC = () => {
  return (
    <>
    <header className={styles.headerContainer}>
      <span  className={styles.logo}>
       <Link href='/'><a><Image src={logo} alt="Logo UI Tools"/></a></Link>
      </span>
      <span className={styles.login}>
        <LoginButton />
        {/* <Image src={login} alt="Login" /> */}
      </span>
    </header>
    </>
  )
}