import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";
import { FaJsSquare } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { SiRapid } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { ImDatabase } from "react-icons/im";
import { FaAngular } from "react-icons/fa";
import { SiPrisma } from "react-icons/si";

export const Skills = () => {
  const [maxView, setmaxView] = useState(false);
  const dispatch = useDispatch();

  const skills = [
    { name: "JavaScript", icon: <FaJsSquare size={50} color="yellow" /> },
    { name: "React", icon: <FaReact size={50} color="cyan" /> },
    { name: "NodeJS", icon: <FaNodeJs size={50} color="#90CA51" /> },
    { name: "NextJS", icon: <RiNextjsFill size={50} color="black" /> },
    {
      name: "Tailwind",
      icon: <RiTailwindCssFill size={50} color="#00BCFF" />,
    },
    {
      name: "TypeScript",
      icon: <BiLogoTypescript size={50} color="#377CC8" />,
    },
    { name: "Angular", icon: <FaAngular size={50} color="#00BCFF" /> },
    { name: "GIT", icon: <FaGithub size={50} color="black" /> },
    { name: "API", icon: <SiRapid size={50} color="#00BCFF" /> },
    { name: "Prisma", icon: <SiPrisma size={50} color="black" /> },
    { name: "MongoDB", icon: <SiMongodb size={50} color="#08B148" /> },
    { name: "SQL", icon: <ImDatabase size={50} color="#00BCFF" /> },
  ];

  return (
    <div
      className={`${
        maxView
          ? "w-[100vw] h-[100vh]"
          : " w-[90vw] min-h-[50vh] md:w-[60vw] md:min-h-[40vh] rounded-2xl"
      } bg-[#333333] text-white`}
    >
      <div className="flex gap-4 items-center h-[10%] pt-3 pl-6 text-lg font-bold">
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
        <h1>Skills</h1>
      </div>

      <div
        className={`grid grid-cols-3 md:grid-cols-4 gap-4 py-5 md:py-10 max-h-[50vh] overflow-y-auto overflow-x-hidden scrollbar-none ${
          maxView ? "px-30" : "px-5"
        }`}
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col justify-center items-center p-5 "
          >
            {skill.icon}
            <p className="mt-3">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
