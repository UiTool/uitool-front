import { useEffect, useRef } from "react";
import Image from "next/image";

import styles from './styles.module.scss'

export const HelperUi: React.FC = () => {
  const p_ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (p_ref.current) (p_ref.current as any).style.display = "block";
    }, 2500); // 2500 = 2.5s
  }, []);

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={styles.avatarImg}
        src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
        alt="Avatar Helpe Ui"
      />
      <p ref={p_ref} id="label-avatar">
        Olá! Você precisa de ajuda?
      </p>
    </div>
  );
};
