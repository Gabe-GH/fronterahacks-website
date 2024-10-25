"use client";

import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

import styles from "./HeroSection.module.css";

interface RegisterActive {
  isRegistrationOpen: boolean;
}

export const RegisterBtn = (props: RegisterActive) => {
  const { user } = useUser();

  const redirectLink = user ? "/register" : "/api/auth/signup";

  if (props.isRegistrationOpen) {
    return (
      <div className="max-sm:pl-12">
        <Link
          className={`${styles.customBtnRadius} btn p-4 md:px-6 md:py-8`}
          href={redirectLink}
        >
          <p className={`${styles.btnText} uppercase`}>Register</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="max-sm:pl-12">
        <div
          className={`${styles.customBtnRadiusDisabled} btn p-4 md:px-6 md:py-8 cursor-not-allowed`}
        >
          <p className={`${styles.btnTextDisabled} uppercase`}>
            Registration Closed
          </p>
        </div>
      </div>
    );
  }
};
