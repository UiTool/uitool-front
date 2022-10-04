import React, { useEffect, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBox } from 'react-icons/bs'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePalette } from 'react-icons/md'
import styles from '../../styles/Dashboard.module.scss'

const Menu: React.FC = () => {
  const p_ref = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (p_ref.current)
        (p_ref.current as any).style.display = 'block';

      setTimeout(() => {
        if (p_ref.current)
          (p_ref.current as any).style.display = 'none';
      }, 4000) // 4000 = 4s
    }, 2500) // 2500 = 2.5s
  }, [])
  
  return (
      <div className={styles.menu_container}>
        <div className={styles.menu_item_container}><span><p data-hover="Pesquisa"><AiOutlineSearch size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><HiOutlineLightBulb size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><MdOutlinePalette size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><BsBox size={40} /></p></span></div>
        <div className={styles.avatarContainer}>
          <img className={styles.avatarImg} src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" />
          <p ref={p_ref} id='label-avatar'>Olá! Você precisa de ajuda?</p>
        </div>
      </div>
  )
}

export default Menu