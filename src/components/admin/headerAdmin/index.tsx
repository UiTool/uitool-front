import Image from "next/image";

import styles from "./styles.module.scss";

import new_logo from "../../../public/new_logo.svg";


export const HeaderAdmin: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div style={{ width: "70px", height: "70px" }}>
          <Image src={new_logo} alt="New Logo UxLeris" />
        </div>
      </div>
    </header>
  );
};

