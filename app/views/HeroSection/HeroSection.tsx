import Link from "next/link";
import { Bruno_Ace } from "next/font/google";

import DiscordBtn from "../ui/DiscordBtn";

import styles from "./HeroSection.module.css";

const frontera_logo_font = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function HeroSection() {
  return (
    <hgroup className={`${styles.heroContainer} ml-10`}>
      <Headers />
      <HookText />
      <div
        className={`flex mt-6 w-40 justify-between md:justify-between md:w-64`}
      >
        <RegisterBtn />
        <DiscordBtn />
      </div>
    </hgroup>
  );
}

const Headers = () => {
  return (
    <>
      <time
        dateTime="2024-10-19"
        className={`${styles.dateText} text-date-grey font-bold`}
      >
        October 19-20, 2024
      </time>
      <h1
        className={`${styles.fronteraHacksLogo} ${frontera_logo_font.className} mr-10 my-4 md:my-10`}
      >
        frontera hacks
      </h1>
      <h2 className={`${styles.hookText} mr-10 font-semibold mb-10`}>
        Accelerate innovation in the RGV
      </h2>
    </>
  );
};

const HookText = () => {
  return (
    <p
      className={`${styles.descriptionText} font-light mr-16 sm:mr-44 md:mr-12 md:mb-3`}
    >
      Collaborate with peers to learn new skills, unleash your creativity and
      build solutions for real-world problems at the 2nd hackathon hosted by{" "}
      <span>
        <a
          className={`${styles.fronteraLink} link link-underline hover:text-blue-300`}
          href={`https://fronteradevs.com`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontera Devs
        </a>
      </span>
    </p>
  );
};

export const RegisterBtn = () => {
  return (
    <Link
      className={`${styles.customBtnRadius} btn p-4 md:px-6 md:py-8`}
      href={"/login"}
    >
      <p className={`${styles.btnText} uppercase`}>Register</p>
    </Link>
  );
};
