import Image from "next/image";
import type { NextPage } from "next";
import { Header } from "../components/header";
import styles from "../styles/Login.module.scss";
import google_button from "../public/google_button.svg";
import face_button from "../public/face_button.svg";
import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />
      <section>
        <h1 className={styles.title}>Welcome Back!!</h1>
      </section>

      <section className={styles.container}>
        <div className={styles.buttons}>
          <a onClick={() => signIn("google")}>
            <Image src={google_button} alt="Login with google" />
          </a>
          <a href="#">
            <Image src={face_button} alt="Login with facebook" />
          </a>
        </div>

        <div className={styles.separation}>
          <div className={styles.bar}></div>
          <div> or </div>
          <div className={styles.bar}></div>
        </div>

        <div className={styles.sign_in}>
          <h2 className={styles.subtitle}>Sign in</h2>

          <input
            className={styles.login_data}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
          />
          <input
            className={styles.login_data}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <div className={styles.remember_sign_in}>
            <input className={styles.check} type="checkbox" id="check" />
            Remember me
            <button
              onClick={() =>
                signIn("credentials", {
                  callbackUrl: '/dashboard',
                  email,
                  password,
                })
              }
            >
              Sign in
            </button>
          </div>

          <div className={styles.pass_alternate}>
            <div className={styles.register}>
              <Link href="/signup">
                <a>Register now</a>
              </Link>
            </div>
            <div className={styles.forgot}>
              <Link href="/forgot">
                <a>Forgot Password?</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
