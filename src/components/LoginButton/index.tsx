import autoAnimate from "@formkit/auto-animate";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useState, useRef, useEffect } from "react";

import { BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { GoGear } from "react-icons/go"

import styles from "./styles.module.scss";

type Props = {
  color?: string;
};

export const LoginMenu: React.FC<Props> = ({ color = "white" }) => {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return session ? (
    <div ref={parent}>
      <div
        style={{ color: color }}
        onClick={reveal}
        className={styles.menuButton}
      >
        <BsPersonCircle />
        {session.user?.name}
      </div>
      {show && (
        <nav className={styles.dropdownMenu}>
          <Link href="/dashboard">
            <a>
              <MdSpaceDashboard />
              Dashboard
            </a>
          </Link>
          {session.isAdmin ? (
            <Link href="/admin">
              <a>
                <GoGear />
                Setup
              </a>
            </Link>
          ) : (
            <></>
          )}
          <Link href="/login">
            <a onClick={() => signOut({ callbackUrl: "/login" })}>
              <RiLogoutCircleRFill />
              Logout
            </a>
          </Link>
        </nav>
      )}
    </div>
  ) : (
    <div className={styles.buttons}>
      <button
        onClick={() => Router.push("/login")}
        type="button"
        className={styles.loginButton}
      >
        <BsPersonFill />
        Login
      </button>
      <button
        onClick={() => Router.push("/signup")}
        type="button"
        className={styles.signupButton}
      >
        Sign Up
      </button>
    </div>
  );
};
