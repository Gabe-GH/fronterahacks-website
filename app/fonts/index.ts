import { Bruno_Ace, DM_Sans, Hanken_Grotesk, Inter } from "next/font/google";

export const frontera_logo_font = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const sponsor_button_font = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export const inter = Inter({ subsets: ["latin"] });
