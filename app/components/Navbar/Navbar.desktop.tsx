"use client";

import Link from "next/link";

import styles from "./Navbar.desktop.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function DesktopNavbar(props: any) {
  const { user } = useUser();

  return (
    <div
      className={`${styles.desktopNavBar} navbar navbar-no-boxShadow bg-transparent pt-8 mb-9`}
    >
      {/* Nav Links */}
      <div
        className={`${styles.linksGroupStyle} navbar-start uppercase font-extralight text-base`}
      >
        <Link href="/#about" className={`${styles.linkStyle} navbar-item`}>
          about
        </Link>
        <Link href="/#schedule" className={`${styles.linkStyle} navbar-item`}>
          schedule
        </Link>
        <Link
          href="/#challenges"
          className={`${styles.linkStyle} navbar-item hidden`}
        >
          challenges
        </Link>
        <Link
          href="/#prizes"
          className={`${styles.linkStyle} navbar-item hidden`}
        >
          prizes
        </Link>
        <Link href="/#faq" className={`${styles.linkStyle} navbar-item`}>
          faq
        </Link>
      </div>

      {/* USER NOT LOGGED IN */}
      {!user && (
        <>
          {/* Login */}
          <div className="navbar-end">
            <a href={`/api/auth/login?prompt=login`}>
              <button type="button" className="btn btn-outline btn-md p-4 ">
                <span className="uppercase font-extralight text-base text-nowrap">
                  log in
                </span>
              </button>
            </a>
          </div>
        </>
      )}

      {/* USER LOGGED IN */}
      {user && (
        <>
          {/* Login */}
          <div className="navbar-end">
            <a href={`/api/auth/logout`}>
              <button type="button" className="btn btn-outline btn-md p-4">
                <span className="uppercase font-extralight text-base text-nowrap">
                  log out
                </span>
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
