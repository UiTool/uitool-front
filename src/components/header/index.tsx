import Image from "next/image";

import styles from "./styles.module.scss";

import { LoginMenu } from "../LoginButton";
import logo from "../../public/logo.svg";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image src={logo} alt="Logo UI Tools" />
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
