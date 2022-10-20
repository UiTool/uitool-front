import Link from "next/link";
import { VscTools } from "react-icons/vsc";
import { BsQuestionSquare } from "react-icons/bs";

import styles from "./styles.module.scss";
import { RiLogoutBoxLine, RiLogoutCircleRFill } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const SideBar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.menu}>
        <div className={styles.section}>
          <h3>GERAL</h3>
          <div className={styles.options}>
          <Link href="/admin">
              <a className={styles.option}>
                <MdOutlineSpaceDashboard style={{fontSize: '1.25rem'}}/>
                <p>Dashboard</p>
              </a>
            </Link>
            <Link href="/admin/tools">
              <a className={styles.option}>
                <VscTools />
                <p>Tools</p>
              </a>
            </Link>
            <Link href="/admin/questions">
              <a className={styles.option}>
                <BsQuestionSquare />
                <p>Questions</p>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.section}>
          <h3>SESSION</h3>
          <div className={styles.options}>
            <Link href="/admin/questions">
              <a className={styles.option}>
                <RiLogoutBoxLine style={{fontSize: '1.25rem'}}/>
                <p>Log Out</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};