"use client";

import Image from "next/image";
import { useState } from "react";

import modalAnnouncements from "@/app/data/modalAnnouncements.json";
import RenderQR from "../QRCode/RenderQR";
import { frontera_logo_font } from "@/app/fonts";

export default function FirstTimePopUpModal(props: any) {
  const [modalPage, setModalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [lastPageVisted, setLastPageVisited] = useState(false);

  const pages = modalAnnouncements;

  const handleNextPageClick = () => {
    if (modalPage < pages.length - 1) setModalPage(modalPage + 1);

    if (modalPage === pages.length - 2) setLastPageVisited(true);
  };

  const handlePrevPageClick = () => {
    if (modalPage > 0) setModalPage(modalPage - 1);
  };

  const handleCloseButton = async () => {
    await fetch("/api/set-modal-cookie", {
      method: "GET",
    });
    setIsModalOpen(!isModalOpen);
  };

  const ModalDotProgress = () => {
    return (
      <div className="flex justify-center gap-x-10">
        {pages.map((_page: any, index: number) => (
          <span
            className={index === modalPage ? "dot bg-purple-500" : "dot"}
            key={index}
          />
        ))}
      </div>
    );
  };

  const QRCodeModalTitle = () => {
    return (
      <>
        <span className="text-xl">{pages[modalPage].title}</span>
        <RenderQR qrcode={props.qrcode} size={props.size} />
      </>
    );
  };

  const DiscordModalTitle = () => {
    return (
      <div className="flex flex-col justify-center">
        <a
          href={`${props.discord}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl link link-underline hover:text-blue-300"
        >
          <span>{pages[modalPage].title}</span>
        </a>
        <Image
          src={`/discord_icon.svg`}
          alt="instagram logo"
          width={50}
          height={50}
          className="self-center my-3"
        />
      </div>
    );
  };

  const HebModalTitle = () => {
    return (
      <>
        <span className="text-xl">{pages[modalPage].title}</span>
        <Image
          src={`/sponsors/HEB.png`}
          alt="heb logo"
          width={100}
          height={100}
          className="self-center"
        />
      </>
    );
  };

  const InstagramModalTitle = () => {
    return (
      <>
        <span className="text-xl">{pages[modalPage].title}</span>
        <Image
          src={`/instagram.svg`}
          alt="instagram logo"
          width={50}
          height={50}
          className="self-center"
        />
      </>
    );
  };

  const ModalPage = () => {
    return (
      <>
        <span className="text-xl">
          {pages[modalPage].title.includes("Discord") ? (
            <DiscordModalTitle />
          ) : (
            <></>
          )}
        </span>
        {pages[modalPage].title.includes("QR Code") ? (
          <QRCodeModalTitle />
        ) : (
          <></>
        )}

        {pages[modalPage].title.includes("HEB") ? <HebModalTitle /> : <></>}
        {pages[modalPage].title.includes("Instagram") ? (
          <InstagramModalTitle />
        ) : (
          <></>
        )}
        <span className="mb-5">{pages[modalPage].blurb}</span>
      </>
    );
  };

  return (
    <>
      {/* Modal is now open by default */}
      <input
        className="modal-state"
        id="modal-3"
        type="checkbox"
        checked={isModalOpen}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-3"></label>
        <div className="modal-content flex flex-col gap-5">
          {lastPageVisted && (
            <label
              htmlFor="modal-3"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseButton}
            >
              ✕
            </label>
          )}
          <div className="-mb-5">
            <h2 className="text-xl">
              Welcome to{" "}
              <span className={`${frontera_logo_font.className}`}>
                FronteraHacks
              </span>
              !
            </h2>
            <p className="font-thin italic text-slate-200 text-sm">
              *yes you need to read through this
            </p>
          </div>
          <div></div>
          <div className="flex gap-10 justify-center">
            <button type="button" onClick={handlePrevPageClick}>
              <Image
                src={"/chevron_left.svg"}
                width={50}
                height={50}
                alt={"previous page"}
                className="flex-shrink-0"
              />
              <p className="hidden">prev page</p>
            </button>
            <div className="flex flex-col gap-4">
              <ModalPage />
            </div>
            <button type="button" onClick={handleNextPageClick}>
              <Image
                src={"/chevron_right.svg"}
                width={50}
                height={50}
                alt={"next page"}
                className="flex-shrink-0"
              />
              <p className="hidden">next page</p>
            </button>
          </div>
          <ModalDotProgress />
        </div>
      </div>
    </>
  );
}
