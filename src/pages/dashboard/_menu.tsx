import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBox } from 'react-icons/bs'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePalette } from 'react-icons/md'
import { HelperUi } from '../../components/helperUi'
import styles from '../../styles/Dashboard.module.scss'

interface Props {
  handleResearch(): void;
  handlePrototyping(): void;
  handleIdeation(): void;
  handleEvaluation(): void;
}

const Menu: React.FC<Props> = ({handleEvaluation, handleIdeation, handlePrototyping, handleResearch}) => {

  return (
    <div className={styles.menu}>
      <div className={styles.menu_container}>
        <div className={styles.menu_item_container} onClick={handleResearch}><span><p data-hover="Research"><AiOutlineSearch size={40} /></p></span></div>
        <div className={styles.menu_item_container} onClick={handleIdeation}><span><p data-hover="Ideation"><HiOutlineLightBulb size={40} /></p></span></div>
        <div className={styles.menu_item_container} onClick={handlePrototyping}><span><p data-hover="Prototyping"><MdOutlinePalette size={40} /></p></span></div>
        <div className={styles.menu_item_container} onClick={handleEvaluation}><span><p data-hover="Evaluation"><BsBox size={40} /></p></span></div>
      </div>
    </div>
  )
}

export default Menu