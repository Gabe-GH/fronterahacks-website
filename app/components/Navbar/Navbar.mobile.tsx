"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.mobile.module.css";
import ProfileServer from "@/app/helpers/isLoggedIn";
import { useUser } from "@auth0/nextjs-auth0/client";

// ***
// component as a whole cant be refactored currently as it relies on
// rippleui's drawer component, inner components will be refactored later
// ***
export default function MobileNavbar() {
  return (
    <nav className="navbar navbar-no-boxShadow bg-transparent">
      <div className="navbar-end">
        {/* for defining the side the drawer opens up from */}
        <input
          type="checkbox"
          id="drawer-right"
          className="drawer-toggle navbar-item"
          aria-hidden="true"
        />

        {/* for defining what handles the opening of the drawer */}
        <label htmlFor="drawer-right" className="btn btn-ghost h-14">
          <Image
            src={"/Hamburger_Menu.svg"}
            width={5} // Arbitrary values - required
            height={5} // Arbitrary values - required
            alt="navbar menu icon - closed"
            className="w-8"
          />
        </label>

        {/* overlay for blacking out everything but the drawer */}
        <label htmlFor="drawer-right" className="overlay"></label>

        {/* everything beyond this point is for the drawer and it's content */}
        <div className="drawer drawer-right h-auto min-w-48 max-w-56 text-nowrap text-ellipsis bg-zinc-950">
          {/* this is for handling the layout of the contents in the drawer */}
          <div className="flex flex-col justify-end items-end h-full text-right">
            {/* for defining what closes the drawer*/}
            <label
              htmlFor="drawer-right"
              className="btn btn-sm btn-circle btn-ghost mr-6 mt-6"
            >
              <Image
                src={"/Hamburger_Menu_Close.svg"}
                width={5} // Arbitrary values - required
                height={5} // Arbitrary values - required
                alt="navbar menu icon - closed"
                className="w-6"
              />
            </label>

            {/* menu items inside the drawer */}
            <div className="w-screen font-light">
              <hr className={`${styles.borderDecoration} my-4`} />

              {/* About Link */}
              <h2 className={`${styles.drawerLink} text-xl uppercase mr-8`}>
                <Link href="/#about">about</Link>
              </h2>

              {/* Schedule Link */}
              <h2
                className={`${styles.drawerLink} text-xl uppercase mr-8 mt-4`}
              >
                <Link href="/#schedule">schedule</Link>
              </h2>
              <hr className={`${styles.borderDecoration} my-4`} />

              {/* Challenge Link */}
              <h2
                className={`${styles.drawerLink} text-xl uppercase mr-8 hidden`}
              >
                <Link href="/#challenges">challenges</Link>
              </h2>

              {/* Prizes Link */}
              <h2
                className={`${styles.drawerLink} text-xl uppercase mr-8 mt-4 hidden`}
              >
                <Link href="/#prizes">prizes</Link>
              </h2>

              {/* FAQ Link */}
              <h2
                className={`${styles.drawerLink} text-xl uppercase mr-8 mt-4`}
              >
                <Link href="/#faq">faq</Link>
              </h2>
              <hr className={`${styles.borderDecoration} my-4`} />

              {/* Login Link */}
              <LoginBtn />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const LoginBtn = () => {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <>
          <h2 className={`${styles.drawerLink} text-xl uppercase mr-8 mb-4`}>
            <a href={`/api/auth/login?prompt=login`}>Log In</a>{" "}
          </h2>
        </>
      )}

      {user && (
        <>
          <h2 className={`${styles.drawerLink} text-xl uppercase mr-8 mb-4`}>
            <a href={`/api/auth/logout`}>Log Out</a>{" "}
          </h2>
        </>
      )}
    </>
  );
};
