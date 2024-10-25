import Link from "next/link";
import Image from "next/image";

import styles from "./DiscordIcon.module.css";

export default function DiscordBtn() {
  return (
    <div className="max-sm:pl-12">
      <a
      className={`${styles.customBtnRadius} btn btn-ghost px-1 py-2 md:px-2 md:py-8`}
      href={`${process.env.FRONTERA_DISCORD_INVITE}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={"discord_icon.svg"}
        width={5}
        height={5}
        className={`${styles.discordIcon}`}
        alt=""
      />
    </a>
    </div>
  );
}
