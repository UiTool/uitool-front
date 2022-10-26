import Image from 'next/image'
import styles from './styles.module.scss'

import logo from '../../../public/logo.svg'

export const Footer: React.FC = () => {
  return (
    <>
    <footer className={styles.footerContainer}>
      <span className={styles.logo}>
        <Image src={logo} alt="Logo UI Tools" />
      </span>
      <div className={styles.textArea}>
        <p>Telefone: (99) 12345-6789</p>
        <p>Endereço: Rdv. João Leme dos Santos, Km 110 | <br/>Bairro Itinga Sorocaba – SP – Brazil</p>
      </div>
    </footer>
    </>
  )
}