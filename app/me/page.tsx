"use server";

import { GetUser } from "../helpers/isLoggedIn";
import { findHackerByEmail } from "../db/controllers";

import FirstTimePopUpModal from "../components/PopUp/FirstTimeModal";
import HackerDetails from "../components/HackerProfile/HackerDetails";

import { cookies } from "next/headers";

export default async function Me() {
  const cookieStore = cookies();
  const hasOpenedModal = cookieStore.has("modal_opened");

  // Call the GetUser function and wait for its result
  const currentUser = await GetUser();

  const hacker = await findHackerByEmail(currentUser.email);

  return (
    <>
      {hasOpenedModal ? null : (
        <FirstTimePopUpModal
          qrcode={hacker.qrcode}
          size={250}
          discord={process.env.FRONTERA_DISCORD_INVITE}
        />
      )}
      <HackerDetails hacker={hacker} />
    </>
  );
}
