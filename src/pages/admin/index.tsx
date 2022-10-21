import { GetServerSideProps, NextPage } from "next";
import { getSession, signOut } from "next-auth/react";

import Link from "next/link";

import { BsQuestionSquare } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";

import { HeaderAdmin } from "../../components/admin/headerAdmin";
import { SideBarAdmin } from "../../components/admin/sideBarAdmin";

import styles from "./styles.module.scss";

const Dashboard: NextPage = () => {

  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if(!session?.isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
    },
  };
};