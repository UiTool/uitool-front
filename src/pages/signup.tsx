import type { NextPage } from "next";
import Image from "next/image";
import { Header } from "../components/header";
import google_button from "../public/google_button.svg";
import face_button from "../public/face_button.svg";
import { api } from "../services/api";

import styles from "../styles/Signup.module.scss";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: "Can't be empty" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirm"],
    message: "Passwords don't match",
  });

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: RegisterFormSchema): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  }

  return (
    <>
      <Header />
      <section>
        <h1 className={styles.title}>Welcome!!</h1>
      </section>

      <section className={styles.container}>
        <div className={styles.buttons}>
          <a href="#">
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
          <form onSubmit={handleSubmit(handleRegister)}>
            <input
              className={styles.login_data}
              placeholder="Name"
              type="text"
              id="name"
              required
              {...register("name")}
            />
            <input
              className={styles.login_data}
              placeholder="E-mail"
              type="email"
              id="email"
              required
              {...register("email")}
            />
            <input
              className={styles.login_data}
              placeholder="Password"
              type="password"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
            <input
              className={styles.login_data}
              placeholder="Confirm Password"
              type="password"
              id="Confirmpassword"
              required
              {...register("confirmPassword")}
            /> {errors.confirm && (
              <p className={styles.errorMessage}>{errors.confirm.message}</p>
            )}
            <div className={styles.remember_sign_in}>
              <button type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </div>
          </form>
          <div className={styles.pass_alternate}>
            <div className={styles.register}>
              <Link href="/login">
                <a>Already have an account?</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
