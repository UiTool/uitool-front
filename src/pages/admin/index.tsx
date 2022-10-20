import { NextPage } from "next";
import { signOut } from "next-auth/react";

import Link from "next/link";

import { BsQuestionSquare } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";

import Header  from "./components/header";
import SideBar from "./components/sideBar";

import styles from "./styles.module.scss";

const Dashboard: NextPage = () => {

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.cards}>
          <Link href="/admin/tools">
            <a className={styles.option}>
              <div className={styles.card}>
                <VscTools />
                <p>Tools</p>
              </div>
            </a>
          </Link>
          <Link href="/admin/questions">
            <a className={styles.option} onClick={() => signOut({callbackUrl: '/login'})} >
              <div className={styles.card}>
                <BsQuestionSquare />
                <p>Questions</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;