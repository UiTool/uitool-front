import Image from 'next/image'
import styles from './styles.module.scss'

import logo from '../../public/logo.svg'


export function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <Image src={logo} alt="Logo UI Tools"/>
      </span>
    </header>
  )
}