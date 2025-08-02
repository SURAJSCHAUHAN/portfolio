import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";
import { FaExternalLinkAlt } from "react-icons/fa";

const resume_url =
  "https://drive.google.com/file/d/1X-kkzU_Hx1UYLHGXoyburnoS4wSQYzoO/view?usp=drive_link";

export const About = () => {
  const [maxView, setmaxView] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        maxView
          ? "w-[100vw] h-[100vh]"
          : " w-[90vw] min-h-[50vh] md:w-[60vw] md:min-h-[40vh] rounded-2xl "
      } bg-[#333333] text-white`}
    >
      <div className="flex gap-4 items-center h-[10%] pt-2 pl-6 text-lg font-bold">
        <div className="flex gap-2">
          <div
            onClick={() => dispatch(setSelectedApp(null))}
            className="md:bg-[#EF4444] w-4 h-4 rounded-full overflow-hidden flex items-center justify-center text-white md:text-transparent md:hover:text-black"
          >
            {" "}
            <RxCross1 size={10} />{" "}
          </div>
          <div
            onClick={() => setmaxView(false)}
            className=" hidden md:flex bg-[#EAB308] w-4 h-4 rounded-full overflow-hidden  items-center justify-center text-transparent hover:text-black"
          >
            {" "}
            <VscChromeMinimize size={10} />
          </div>
          <div
            onClick={() => setmaxView(true)}
            className="hidden md:flex bg-[#22C55E] w-4 h-4 rounded-full overflow-hidden items-center justify-center text-transparent hover:text-black"
          >
            {" "}
            <FiMaximize2 size={10} />{" "}
          </div>
        </div>
        <h1>About</h1>
      </div>
      <div
        className={`flex flex-col h-[90%] ${
          maxView ? "px-50 py-30" : " justify-center items-center px-10"
        } mt-10 md:mt-5 gap-5 py-5`}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Suraj
          </span>
        </h1>
        <p className="text-lg text-center ">
          I am a full-stack developer, enjoy building dynamic, user-friendly,
          and scalable web applications. With expertise in React, Next.js and
          Node.js, I focus on creating seamless front-end experiences and robust
          back-end solutions.
        </p>
        {/* <p className="text-sm mt-2 text-gray-300 text-center">
          Currently Working as Software Development Intern @ I2E Consulting Pvt
          Ltd.
        </p> */}
        <a
          href={resume_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 pt-2 md:pt-0"
        >
          Resume <FaExternalLinkAlt size={15} />
        </a>
      </div>
    </div>
  );
};
//
