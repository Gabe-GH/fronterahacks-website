"use client";

import Link from "next/link";
import { Bruno_Ace, Hanken_Grotesk, Pontano_Sans } from "next/font/google";

import DiscordBtn from "../ui/DiscordBtn";
import { RegisterBtn } from "./Registerbtn";

import styles from "./HeroSection.module.css";
import Image from "next/image";
import { schedule } from "./schedule";
import { profiles } from "./team";

import honeyStyle from "./honeycomb.module.css";

import { frontera_logo_font } from "@/app/fonts";

const footer_font = Pontano_Sans({
  weight: "300",
});

const sponsor_button_font = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function HeroSection() {
  return (
    <hgroup className={`mt-20 w-full`}>
      <div className="bg-geometricBg bg-no-repeat w-full flex flex-col items-center bg-cover bg-center">
        <div className="md:w-3/4 w-full">
          <Headers />
          <HookText />
          <div
            className={`flex mt-6 w-40 justify-between md:justify-between md:w-64`}
          >
            <RegisterBtn isRegistrationOpen={false} />
          </div>
          <AboutSection />
          <PillarsSection />
        </div>
      </div>
      <div className="bg-starBg bg-repeat flex flex-col items-center bg-auto bg-center">
        <div className="md:w-3/4 w-full">
          <ScheduleSection />
          <SponsorsSection />
          <FaqSection />
          <TeamSection />
          <VenueSection />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </hgroup>
  );
}

const Headers = () => {
  return (
    <div className="container mx-auto max-md:pl-12">
      <div className="text-left">
        <time
          dateTime="2024-10-19"
          className={`${styles.dateText} text-date-grey font-bold block`}
        >
          October 19-20, 2024
        </time>
        <h1
          className={`mx-w-md ${styles.fronteraHacksLogo} ${frontera_logo_font.className} mr-10 my-4 md:my-10 md:max-w-2xl ${styles.fronteraHacksLogoSm} ${frontera_logo_font.className}`}
        >
          frontera hacks
        </h1>
        <h2 className={`${styles.hookText} mr-10 font-semibold mb-10 md:my-10`}>
          Accelerate innovation in the RGV
        </h2>
      </div>
    </div>
  );
};

const HookText = () => {
  return (
    <p
      className={`lg:${styles.descriptionText} font-light mr-16 sm:mr-44 md:mr-12 md:mb-3 max-sm:pl-12 max-md:text-xs`}
    >
      Collaborate with peers to learn new skills, unleash your creativity and
      build solutions for real-world problems at the 2nd hackathon hosted by{" "}
      <span>
        <a
          className={`lg:${styles.fronteraLink} link link-underline hover:text-blue-300 max-md:text-xs`}
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

const AboutSection = () => {
  return (
    <div className="w-full">
      <div className={`mt-32 max-md:mt-10 max-md:p-12`}>
        <h1
          className={`${frontera_logo_font.className} max-md:text-2xl mr-10 my-4 md:my-10 text-5xl`}
        >
          About
        </h1>
        <p
          className={`lg:${styles.descriptionText} font-light mx-auto md:mx-0 md:mr-12 md:mb-6 w-full max-md:text-xs`}
        >
          Frontera Hacks is a 24-hour hackathon that aims to foster a community
          of developers driven to innovate. At Frontera Hacks, we aim to provide
          an experience for developers of all skill levels to adopt skills
          taught outside of the classroom, collaborate with like-minded teams,
          and design projects with the potential to accelerate innovation in the
          Rio Grande Valley.
        </p>
      </div>
    </div>
  );
};

const PillarsSection = () => {
  return (
    <>
      <div className={`${styles.pillarsSection} max-md:mt-1 mt-12 `}></div>
      <h1
        className={` ${frontera_logo_font.className} max-md:text-2xl max-md:pl-12 mr-10  md:my-10 text-5xl`}
      >
        Pillars
      </h1>

      <div
        className={
          "mt-20 max-md:mt-16 flex w-full justify-center gap-x-12 max-md:flex-col"
        }
      >
        <div className={`flex flex-col items-center md:mt-6`}>
          <Image
            src="/connect-pillar-image.png"
            alt="Connect"
            width={150}
            height={150}
            className={styles.pillarImage}
          />
          <div
            className={`${frontera_logo_font.className} mt-1 text-3xl max-md: text-lg`}
          >
            Connect
          </div>
          <div
            className={`mt-5 font-light  max-md: mt-1 max-md: text-xs max-md:w-1/2 lg:w-4/5 xl:w-full`}
          >
            Meet developers interested in shaping the future of innovation at
            Frontera Hacks
          </div>
        </div>

        <div className={`flex flex-col items-center max-md: mt-6`}>
          <Image
            src="/grow-pillar-image.png"
            alt="Grow"
            width={150}
            height={150}
            className={styles.pillarImage}
          />
          <div
            className={`${frontera_logo_font.className} mt-1 text-3xl max-md: text-lg`}
          >
            Grow
          </div>
          <div
            className={`mt-5 font-light  max-md: mt-1  max-md: text-xs max-md:w-1/2 lg:w-4/5 xl:w-full`}
          >
            Advance your technical and interpersonal skills through our hands-on
            workshops
          </div>
        </div>

        <div className={`flex flex-col items-center max-md: mt-6`}>
          <Image
            src="/build-pillar-image.png"
            alt="Build"
            width={150}
            height={150}
            className={styles.pillarImage}
          />
          <div
            className={`${frontera_logo_font.className} mt-1 text-3xl max-md: text-lg`}
          >
            Build
          </div>
          <div
            className={`mt-5 font-light  max-md: mt-1 max-md: text-xs max-md:w-1/2 lg:w-4/5 xl:w-full`}
          >
            Develop solutions with the potential to aid and impact our community
          </div>
        </div>
      </div>
    </>
  );
};

const ScheduleSection = () => {
  return (
    <div className={`mt-36 md:mt-14 w-full max-md:pl-12`} id="schedule">
      <h1
        className={`${frontera_logo_font.className} max-md:text-2xl mr-10 my-4 md:my-10 text-5xl`}
      >
        Schedule
      </h1>

      <div className={` mt-12 w-full flex max-md:flex-col gap-x-16`}>
        {schedule.map((day, idx) => (
          <div
            key={idx}
            className={`w-3/4 max-md:w-full ${idx === 1 ? "max-md:mt-10" : ""}`}
          >
            <span className={`${styles.subtitleText} text-xl max-md:text-lg`}>
              Day {day.dayNumber} - {day.date}
            </span>
            {day.events.map((evnt, idx) => (
              <div
                key={idx}
                className={`flex w-full whitespace-nowrap mt-3 justify-between`}
              >
                <div
                  className={`w-40 ${
                    idx === 0 ? "text-date-grey" : ""
                  } max-md:text-xs`}
                >
                  {evnt.time}
                </div>

                <div
                  className={`flex w-full flex-col items-start justify-start ${
                    idx === 0 ? "text-date-grey" : ""
                  } max-md:text-xs`}
                >
                  {evnt.eventName}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SponsorsSection = () => {
  return (
    <div className={`mt-36 w-full`}>
      <h1
        className={`${frontera_logo_font.className} max-md:text-2xl max-md:pl-12 mr-10 my-4 md:my-10 text-5xl`}
      >
        Sponsors
      </h1>
      <p
        className={`font-light text-sm justify-self-center text-center max-sm:text-xs max-md:mt-10`}
      >
        Frontera Hacks is made possible by our wonderful sponsors.
      </p>
      <div
        className={`mt-12 grid grid-cols-3 gap-y-10 gap-x-5 place-items-center max-md:grid-cols-1`}
      >
        <Image
          src="/sponsors/Google.png"
          alt=""
          width={170}
          height={70}
          className={``}
        />
        <Image
          src="/sponsors/HackerRank.png"
          alt=""
          width={400}
          height={50}
          className={``}
        />
        <Image
          src="/sponsors/Heb.png"
          alt=""
          width={160}
          height={60}
          className={``}
        />
        <Image
          src="/sponsors/Galaxy.png"
          alt=""
          width={200}
          height={50}
          className={``}
        />
        <Image
          src="/sponsors/CodePath.png"
          alt=""
          width={445}
          height={40}
          className={`max-sm:w-72`}
        />
        <Image
          src="/sponsors/MasterStitch.png"
          alt=""
          width={190}
          height={53}
          className={``}
        />
      </div>
      <p
        className={`md:mt-20 font-light text-sm justify-self-center text-center max-sm:mt-10 max-sm:text-xs`}
      >
        Want to help make this event a reality?
      </p>

      <div className={`mt-4`}>
        <Link
          className={`bg-white text-black border border-white rounded-full py-1 px-4 block text-center max-w-40 mx-auto`}
          href="mailto:fronteradevs@gmail.com"
        >
          <p className={`${sponsor_button_font.className} text-xs `}>
            BECOME A SPONSOR{" "}
          </p>
        </Link>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <div className="max-sm:hidden sm:hidden lg:block mt-36">
      <h1
        className={`${frontera_logo_font.className} mr-10 my-4 md:my-10 text-5xl`}
      >
        Team
      </h1>

      <p className={`font-light text-sm justify-self-center text-center`}>
        Our team is a vibrant mix of passionate students, each bringing their
        own unique flavor to the table. Together, we&#39;ve blended our skills
        and creativity to brew up an unforgettable hackathon experience.
        We&#39;re here to support, inspire, and cheer you on every step of the
        way. Feel free to connect with us on LinkedIn!
      </p>

      <div
        className={`grid ${honeyStyle.grid_temp} lg:grid-rows-2 max-w-min mx-auto mt-20 xl:pl-7`}
      >
        {profiles.map((profile, idx) => {
          let gridColumnClass = "";

          // Define the grid column class based on the index
          switch ((idx % 13) + 1) {
            case 1:
              gridColumnClass = "col-start-1";
              break;
            case 2:
              gridColumnClass = "col-start-3";
              break;
            case 3:
              gridColumnClass = "col-start-5";
              break;
            case 4:
              gridColumnClass = "col-start-7";
              break;
            case 5:
              gridColumnClass = "col-start-9";
              break;
            case 6:
              gridColumnClass = "col-start-11";
              break;
            case 7:
              gridColumnClass = "col-start-13";
              break;
            case 8:
              gridColumnClass = "col-start-2";
              break;
            case 9:
              gridColumnClass = "col-start-4";
              break;
            case 10:
              gridColumnClass = "col-start-6";
              break;
            case 11:
              gridColumnClass = "col-start-8";
              break;
            case 12:
              gridColumnClass = "col-start-10";
              break;
            case 13:
              gridColumnClass = "col-start-12";
              break;
            default:
              gridColumnClass = "";
              break;
          }

          return (
            <div
              key={idx}
              className={`${gridColumnClass} ${honeyStyle.items} min-w-max flex justify-center items-center`}
              id="item"
            >
              <a href={profile.url} target="_blank" rel="noopener noreferrer">
                <Image
                  width={160}
                  height={170}
                  src={profile.folderPath}
                  alt={`Profile ${idx + 1}`}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FaqSection = () => {
  const faqStyle = "font-black text-xl underline underline-offset-4 mb-1";

  return (
    <div className="mt-36 md:mt-14 sm:pb-40 md:pb-0" id="faq">
      <h1
        className={`${frontera_logo_font.className} mr-10 my-4 md:my-10 text-5xl max-md:text-2xl max-md:pl-12`}
      >
        Fequently Asked Questions
      </h1>

      <div
        className={
          "mt-10 grid grid-cols-2 justify-center gap-x-12 max-md:grid-cols-1 max-md:w-3/4 "
        }
      >
        <div className={`mt-5 flex flex-col max-md:pl-20`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            What is a hackathon?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            A hackathon is a sprint-like event where developers collaborate to
            build projects that solve challenges. At Frontera Hacks, hackers can
            look forward to educational workshops, learning from skilled
            mentors, and, of course, fun games and great swag.
          </div>
        </div>

        <div className={`flex flex-col max-md:pl-20 max-md: mt-5`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            What is the cost to participate?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            Nada, nothing, zilch. There is absolutely no cost for applying or
            participating in Frontera Hacks. We want to make this event as
            accessible as possible to all those interested so make sure you
            apply!
          </div>
        </div>

        <div className={`mt-5 md:mt-8 flex flex-col max-md:pl-20`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            Who is this event for?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            Students from all backgrounds are welcome at Frontera Hacks. No
            extensive knowledge of programming is necessary.
          </div>
        </div>

        <div className={` mt-5 flex flex-col max-md:pl-20`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            What if I don’t know how to code?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            No experience is needed — whether you&#39;re a coder, an artist, a
            designer, or a writer, you&#39;ll get a chance to work with various
            mentors, attend workshops, interact with companies, and learn
            alongside fellow participants.
          </div>
        </div>

        <div className={`flex flex-col max-md:pl-20 max-md: mt-5`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            Do I need a team to participate?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            While teams are not required in order to participate, it’s a great
            way to meet new people and create something together. Teams may have
            up to 4 members, and you will have a chance to meet other hackers at
            our Team Formation events and in the Discord server!
          </div>
        </div>

        <div className={`mt-5 flex flex-col max-md:pl-20`}>
          <span
            className={`${styles.subtitleText} font-bold text-xl max-md:text-lg`}
          >
            What if I need special accomodations?
          </span>
          <div className={`text-sm max-md:text-xs`}>
            Frontera Hacks prioritizes accessibility and accomodations that make
            our event welcoming for everyone. Please list any special
            accommodations in your admissions, or contact us with any other
            concerns.
          </div>
        </div>
      </div>
    </div>
  );
};

const VenueSection = () => {
  return (
    <div className="lg:mt-44 pb-40 max-md:hidden md:hidden lg:block ">
      <h1
        className={`${frontera_logo_font.className} mt-10 mr-10 my-4 md:my-10 text-5xl max-md:text-2xl max-md:pl-12`}
      >
        Venue
      </h1>

      <div className={`relative`}>
        <Image
          src="/venue-location.png"
          alt=""
          width={1157}
          height={158}
          className={`relative`}
        />
      </div>

      <div className={``}>
        <div className={`top-[-30px] max-lg:h-96 left-[-5px] relative`}>
          <Image
            src="/map-cropped.png"
            alt="Map"
            width={600}
            height={450}
            className={`absolute top-0 left-0`}
          />
          <Image
            src="/weird-shape.png"
            alt="Border"
            width={600}
            height={450}
            className={`absolute top-0 left-0 pointer-events-none`}
          />
        </div>

        <div className={`lg:ml-96 flex flex-col justify-center`}>
          <h1
            className={`${frontera_logo_font.className}  ${styles.venueFaqText} text-2xl lg:ml-56 lg:text-xl`}
          >
            {" "}
            Where do I park?
          </h1>
          <p className={`mt-1 lg:ml-56 max-w-96 lg:text-sm`}>
            Lots E16 or E21 are closest to the Engineering building. These are
            along 4th Ave.
          </p>
          <h1
            className={`${frontera_logo_font.className} ${styles.venueFaqText} text-2xl lg:ml-40 lg:mt-10 xl:ml-52 xl:mt-20 lg:text-xl`}
          >
            Extra Information
          </h1>
          <p className={`mt-1 lg:ml-40 xl:ml-40 max-w-80 lg:text-sm`}>
            Enter through the door closest to the science building. Check-in
            will be in the lobby. The building has ample space and internet
            connectivity. Here, you will work with a team to bring your ideas to
            life! Happy hacking!
          </p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <div
        className={`${frontera_logo_font.className} mt-28 text-center text-4xl max-md:text-2xl`}
      >
        <h1>frontera hacks</h1>
      </div>
      <div
        className={`mt-5 flex flex-row justify-center md:gap-x-10 max-sm:gap-x-6`}
      >
        <a href="https://discord.gg/XfjsWxPgBj">
          <Image
            src="/footer_images/discord.png"
            alt=""
            width={37}
            height={40}
            className={``}
          />
        </a>

        <a href="https://x.com/fronteradevsrgv">
          <Image
            src="/footer_images/twitter.png"
            alt=""
            width={37}
            height={40}
            className={``}
          />
        </a>

        <a href="https://www.facebook.com/people/Frontera-Hacks/pfbid05mq7GpLNvxvwoCtZH1V2VQY2tFPxwFEh6EXKvjJsvKWWq9jXAi7WYVU8V4CTkrPwl/">
          <Image
            src="/footer_images/facebook.png"
            alt=""
            width={37}
            height={40}
            className={``}
          />
        </a>

        <a href="https://www.instagram.com/fronterahacks/">
          <Image
            src="/footer_images/instagram.png"
            alt=""
            width={37}
            height={40}
            className={``}
          />
        </a>

        <a href="https://www.youtube.com/@fronteradevsutrgv3696 ">
          <Image
            src="/footer_images/youtube.png"
            alt=""
            width={37}
            height={40}
            className={``}
          />
        </a>
      </div>

      <div>
        <p
          className={`${footer_font.className} mt-4 text-center max-md:text-xs`}
        >
          © 2024 Frontera Hacks. Made with ♡ by the Frontera Devs team
        </p>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};
