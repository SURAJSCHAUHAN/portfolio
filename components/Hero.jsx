import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";

export const Hero = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-[80vw] md:w-[50vw]">
      <h1 className="text-4xl md:text-8xl font-bold font-orbitron mb-3">
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
          Suraj
        </span>
      </h1>
      <p className="text-lg md:text-xl ">
        I am a full-stack developer, enjoy building dynamic, user-friendly, and
        scalable web applications. With expertise in React, Next.js and Node.js,
        I focus on creating seamless front-end experiences and robust back-end
        solutions.
      </p>
      <div className="flex gap-10 md:gap-20 justify-center items-center mt-10 text-[15px] font-semibold">
        <button
          onClick={() => dispatch(setSelectedApp("Contact"))}
          className="rounded-3xl bg-white text-black font-bold px-5 py-2 cursor-pointer"
        >
          Let's Connect
        </button>
        <button
          onClick={() => dispatch(setSelectedApp("Projects"))}
          className="rounded-3xl bg-white text-black font-bold px-5 py-2 cursor-pointer"
        >
          View My Work
        </button>
      </div>
    </div>
  );
};
