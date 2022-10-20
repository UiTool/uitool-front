import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

import logoHelperUi from "../../public/helperui.jpg";
import robot from "../../public/robot.png";
import { Modal } from "./modal";

export const HelperUi: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const p_ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (p_ref.current) (p_ref.current as any).style.display = "block";
    }, 2500); // 2500 = 2.5s
  }, []);

  return (
    <div>
      <div
        className={
          router.pathname != "/dashboard"
            ? styles.avatarContainerDashboard
            : styles.avatarContainer
        }
        onClick={() => setOpenModal(true)}
      >
        <Image
          className={styles.avatarImg}
          src={robot}
          alt="Logo Helper Ui"
        />
        <p ref={p_ref} id="label-avatar">
          Olá! Você precisa de ajuda?
        </p>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};
