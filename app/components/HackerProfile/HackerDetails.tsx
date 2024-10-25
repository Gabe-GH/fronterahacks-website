"use server";

import RenderQR from "../QRCode/RenderQR";

import styles from "./HackerDetails.module.css";

const HackerDetails = (props: any) => {
  const user = props.hacker;

  return (
    <div className={`flex flex-col h-screen`}>
      <div className={`${styles.profile} flex flex-col mx-auto mt-10`}>
        <div className="flex self-start">
          <h3 className="text-4xl items-start">
            Hi {`${user.firstName + " " + user.lastName}`}!
          </h3>
        </div>
        <div
          className={`${styles.QRcode} mt-5 mb-8 self-center w-60 lg:w-auto`}
        >
          <RenderQR qrcode={user.qrcode} size={300} />
        </div>
        <div className="pb-10 text-xl">
          {user.checked_in ? (
            <p>{`Status: Checked-In`}</p>
          ) : (
            <p>{`Status: Registered`}</p>
          )}

          <p>{`Email: ${user.email}`}</p>
        </div>
      </div>
    </div>
  );
};

export default HackerDetails;
