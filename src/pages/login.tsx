import Image from "next/image";
import type { NextPage } from "next";
import { Header } from "../components/header";
import styles from "../styles/Login.module.scss";
import google_button from "../public/google_button.svg";
import face_button from "../public/face_button.svg";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import * as y from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";


type LoginFormSchema = {
  email: string;
  password: string;
}

const loginFormSchema = y
  .object().shape({
    email: y.string().email("Invalid email address"),
    password: y.string().min(6,"Must be 6 or more characters long"),
  })

const Login: NextPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema), 
    
  });

  async function handleRegister(data: LoginFormSchema): Promise<void> {
    const {email, password} = data

    try {
      signIn("credentials", {
        callbackUrl: "/",
        email,
        password,
      })
      
    }catch {
      Router.push("/login")
    }
  }

  return (
    <>
      <Header />
      <section>
        <h1 className={styles.title}>Welcome Back!!</h1>
      </section>

      <section className={styles.container}>
        <div className={styles.buttons}>
          <a onClick={() => signIn("google", { callbackUrl: "/" })}>
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
          <h2 className={styles.subtitle}>Log in</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
          <input
            className={styles.login_data}
            placeholder="E-mail"
            type="email"
            {...register("email")}
          /> {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
          <input
            className={styles.login_data}
            placeholder="Password"
            type="password"
            {...register("password")}
          /> {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
          <div className={styles.remember_sign_in}>
            <input
              className={styles.check}
              type="checkbox"
              placeholder="Remember me"
              id="check"
            />
            <span>Remember me</span>
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </div>
          </form>

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
