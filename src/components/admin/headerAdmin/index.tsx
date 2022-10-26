import Image from "next/image";

import styles from "./styles.module.scss";

import logo from "../../../../public/logo.svg";


export const HeaderAdmin: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div style={{ width: "70px", height: "70px" }}>
          <Image src={logo} alt="New Logo UxLeris" />
        </div>
      </div>
    </header>
  );
};

