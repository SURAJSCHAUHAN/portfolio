import { Geist, Geist_Mono,Orbitron } from "next/font/google";

import "./globals.css";
import ReduxProvider from "../redux/Provider";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Suraj Singh | Portfolio",
  description: "Welcome to my personal portfolio website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
       <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
