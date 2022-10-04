import autoAnimate from "@formkit/auto-animate";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useState, useRef, useEffect } from "react";

import { BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";

import styles from "./styles.module.scss";

export const LoginMenu: React.FC = () => {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  const handleLogin = (page: string) => {
    Router.push(page)
  }

  return session ? (
    <div ref={parent}>
      <div onClick={reveal} className={styles.menuButton}>
        <BsPersonCircle />
        John Doe
      </div>
      {show && (
        <nav className={styles.dropdownMenu}>
          <Link href="/dashboard">
            <a>
              <MdSpaceDashboard />
              Dashboard
            </a>
          </Link>
          <Link href="/login">
            <a onClick={() => signOut({callbackUrl: "/login"})}>
              <RiLogoutCircleRFill />
              Logout
            </a>
          </Link>
        </nav>
      )}
    </div>
  ) : (
    <div className={styles.buttons}>
      <button onClick={() => Router.push("/login")}  type="button" className={styles.loginButton}>
        <BsPersonFill />
        Login
      </button>
      <button onClick={() => Router.push("/signup")} type="button" className={styles.signupButton}>
        Sign Up
      </button>
    </div>
  );
};
