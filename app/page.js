"use client";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Dock } from "@/components/Dock";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Project } from "@/components/Project";
import { Skills } from "@/components/Skills";
import UtilityBar from "@/components/UtilityBar";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { selectedApp } = useSelector((state) => state.app);

  return (
    <div>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/stars.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="hidden md:block w-[100%] absolute">
          <Header />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center pt-40 md:pt-0 md:justify-center bg-black/30 text-white text-center">
          <Hero />
          <div className="absolute bottom-3">
            {/* <UtilityBar/> */}
            <Dock />
          </div>
        </div>
        {/* pop-up-container */}
        <div className="absolute inset-0 flex  md:items-center justify-center items-start pt-20 md:pt-0 pointer-events-none">
          {selectedApp && (
            <div className="pointer-events-auto">
              {selectedApp === "About" ? (
                <About />
              ) : selectedApp === "Skills" ? (
                <Skills />
              ) : selectedApp === "Experience" ? (
                <Experience />
              ) : selectedApp === "Projects" ? (
                <Project />
              ) : selectedApp === "Contact" ? (
                <Contact />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
