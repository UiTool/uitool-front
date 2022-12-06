import Image from "next/image";

import styles from "./styles.module.scss";

import { LoginMenu } from "../LoginButton";
import logoUiTool from "../../../public/logo.svg";
import Link from "next/link";

export const Header: React.FC = () => {
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>EUXT <br></br> Exploring <br></br> UX Tools</h1>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image src={logoUiTool} alt="Logo UI Tools" />
            </a>
          </Link>
        </div>
        <div className={styles.loginButton}>
          <LoginMenu />
        </div>
      </div>
    </header>
  );
};
