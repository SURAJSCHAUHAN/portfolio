import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Project = () => {
  const [maxView, setmaxView] = useState(false);
  const dispatch = useDispatch();

  const project = [
    {
      title: "Daily Journel",
      image: "./blogweb.png",
      description:
        "Its a blog web, one can use CRUD application on their blog and can view others blog. It uses NextAuth for secure user management.",
      techStack: ["NextJS", "NestJS", "Tailwind CSS"],
      url: "https://daily-journel-blog-app-main.vercel.app/",
    },
    {
      title: "Tour Sense",
      image: "./toursense.png",
      description:
        "This is a frontend project for a travel website, where user can explore places to plan their trip. Currently, its in developing stage, working on backend.",
      techStack: ["ReactJS", "CSS"],
      url: "https://tour-sense-suraj.vercel.app/",
    },
    {
      title: "EkRaahi- Online Clothing",
      image: "./ekrahhi.png",
      description:
        "This is a frontend project for an e-commerce website, where user can buy products online.",
      techStack: ["NextJS", "NestJS", "Tailwind CSS"],
      url: "https://ek-raahi-suraj-frontend.vercel.app/",
    },
  ];

  return (
    <div
      className={`${
        maxView
          ? "w-[100vw] h-[100vh]"
          : " w-[90vw] min-h-[50vh] md:w-[60vw] md:min-h-[40vh] rounded-2xl text-white"
      } bg-[#333333] `}
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
            className=" hidden md:block bg-[#EAB308] w-4 h-4 rounded-full overflow-hidden  items-center justify-center text-transparent hover:text-black"
          >
            {" "}
            <VscChromeMinimize size={10} />
          </div>
          <div
            onClick={() => setmaxView(true)}
            className="hidden md:block bg-[#22C55E] w-4 h-4 rounded-full overflow-hidden items-center justify-center text-transparent hover:text-black"
          >
            {" "}
            <FiMaximize2 size={10} />{" "}
          </div>
        </div>
        <h1>Project</h1>
      </div>

      <div className="w-[100%] text-center">
        <h1 className="mt-6 text-lg font-semibold">My Projects</h1>
        <div
          className={`w-full p-10 mt-2 md:mt-5 ${
            maxView ? "max-h-[75vh] px-30 " : " max-h-[43vh] md:max-h-[55vh]"
          } overflow-y-auto overflow-x-hidden scrollbar-none`}
        >
          {project.map((item, i) => {
            return (
              <div
                key={i}
                className={`md:flex md:gap-10 w-[100%] mb-10 ${
                  i % 2 !== 0
                    ? "md:flex-row-reverse border-t-1 border-b-1 border-gray-500 py-10"
                    : ""
                }`}
              >
                <img
                  src={item.image}
                  alt="image"
                  className="w-[100%] md:w-[50%] rounded-2xl"
                />
                <div className="pt-5 md:pt-0 text-start flex flex-col justify-around">
                  <h2
                    className={`${
                      maxView ? "text-2xl font-bold" : "text-xl font-semibold"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p className={`text-gray-100 ${maxView && "text-lg"}`}>
                    {item.description}
                  </p>
                  <p className="pt-2 md:pt-0 text-gray-300">
                    Technology:{" "}
                    <span className="font-bold">
                      {item.techStack.join(", ")}
                    </span>
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-500 pt-2 md:pt-0"
                  >
                    Visit Site <FaExternalLinkAlt size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
