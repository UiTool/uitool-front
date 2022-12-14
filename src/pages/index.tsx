import type { NextPage } from "next";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

import styles from "../styles/Home.module.scss";
import { useEffect, useRef } from "react";
import { HelperUi } from "../components/helperUi";
import Link from "next/link";

const Home: NextPage = () => {
  const p_ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (p_ref.current) (p_ref.current as any).style.display = "block";
    }, 2500); // 2500 = 2.5s
  }, []);

  return (
    <>
      <Header />
      <HelperUi />
      <div className={styles.outerContainer}>
        <div className={styles.videoBox}>
          <span>
            <iframe
              width="854"
              height="480"
              src="https://www.youtube.com/embed/G-C0Gqu9Ybw"
              title="UXLERIS"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </span>
        </div>
        <div className={styles.videoInfo}>
          <h2>Welcome EUXT - Exploring UX Tools</h2>
          <p>
            This is an application that provides an aggregate of tools to
            facilitate the search for solutions for the moment in which your
            software finds itself.  <br/>The tools are laid out in a <Link href="/dashboard"><a>Dashboard </a></Link>
            organized around the four processes of user-centered design.
            <br/> <br/>
            You can also use Helper Ui to find the best tools for your current moment.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
