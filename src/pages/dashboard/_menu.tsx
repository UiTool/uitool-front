import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBox } from 'react-icons/bs'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePalette } from 'react-icons/md'
import styles from '../../styles/Dashboard.module.scss'

const Menu: React.FC = () => {
  return (
      <div className={styles.menu_container}>
        <div className={styles.menu_item_container}><span><p data-hover="Pesquisa"><AiOutlineSearch size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><HiOutlineLightBulb size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><MdOutlinePalette size={40} /></p></span></div>
        <div className={styles.menu_item_container}><span><p data-hover="exemplo"><BsBox size={40} /></p></span></div>
      </div>
  )
}

export default Menu
