"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";

export const Experience = () => {
  const [maxView, setmaxView] = useState(false);
  const dispatch = useDispatch();

  const data = [
    {
      title: "Oct 2024- April 2025",
      content: (
        <div>
          <h3 className="text-start text-neutral-200 text-lg md:text-lg font-normal mb-5">
            Software Dev Intern @
            <span className="text-blue-500 font-bold">I2E Consulting</span>
          </h3>
          <p className="text-start text-[15px] text-gray-300">
            I've worked as a software developer intern at I2E, specializing in
            web dev. I've had the opportunity to work on various projects and
            technologies like React, Angular, .NET etc.
          </p>
        </div>
      ),
    },
    {
      title: "Oct 2023- Feb 2024",
      content: (
        <div>
          <h3 className="text-start text-neutral-200 text-lg md:text-lg font-normal mb-5">
            Software Trainee @
            <span className="text-blue-500 font-bold">Cnetric Global</span>
          </h3>
          <p className="text-start text-[15px] text-gray-300">
            I've worked as a software developer trainee at Cnetric Global where
            I have gained valuable experience in MACH Architecture, React and
            REST-api's.
          </p>
        </div>
      ),
    },
    {
      title: "July 2020- June 2024",
      content: (
        <div>
          <h3 className="text-start text-neutral-200 text-lg md:text-lg font-normal mb-5">
            B.Tech in Computer Science
          </h3>
          <p className="text-start text-[15px] text-gray-300">
            Techno India NJR Institute of Technology, Udaipur
          </p>
        </div>
      ),
    },
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
        <h1>Experience</h1>
      </div>
      <div className="w-full">
        <Timeline data={data} maxView={maxView} />
      </div>
    </div>
  );
};

export const Timeline = ({ data, maxView }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight);
    }
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [data]);

  return (
    <div
      className="w-full h-full overflow-hidden px-5 md:px-10 pb-2 md:pb-10"
      ref={containerRef}
    >
      <div className="pt-10 px-4 text-center">
        <h2 className="text-lg md:text-xl mb-4 text-white">
          My Professional Journey
        </h2>
      </div>

      {/* Scrollable Timeline Container */}
      <div
        ref={ref}
        className="relative overflow-y-auto scrollbar-hide"
        style={{
          maxHeight: maxView ? "75vh" : "45vh", // Adjust for full-screen mode
        }}
      >
        {data.map((item, index) => (
          <div key={index} className="flex pt-10 gap-4 last:pb-4">
            {/* Timeline Dot */}
            <div className="relative flex flex-col md:items-center z-10">
              <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-500" />
              </div>
            </div>

            {/* Timeline Content */}
            <div className="w-full flex gap-10">
              <h3 className="w-[20%] text-[15px] md:text-lg font-semibold text-neutral-400">
                {item.title}
              </h3>
              <div
                className={`w-[80%] text-[15px] md:text-lg px-5  ${
                  maxView ? "px-20" : ""
                }`}
              >
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Timeline Line */}
        <div
          className="absolute left-[11px] top-0 w-[2px] bg-neutral-700"
          style={{ height: contentHeight }}
        />
      </div>
    </div>
  );
};
