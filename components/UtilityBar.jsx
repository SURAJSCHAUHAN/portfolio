// Dependencies: npm i framer-motion tailwindcss @radix-ui/react-tooltip

'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";
import { AiOutlineHome } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { PiHandbagFill } from "react-icons/pi";
import { FaPencilRuler } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { TbMessageCircleFilled } from "react-icons/tb";


const SCALE = 2.25; // max scale factor of an icon
const DISTANCE = 110; // pixels before mouse affects an icon
const NUDGE = 40; // pixels icons are moved away from mouse
const SPRING = {
  mass: 0.1,
  stiffness: 170,
  damping: 12,
};
const APPS = [
  { "name": 'Home', icon: <AiOutlineHome size={20} />, bg:'bg-linear-to-r/srgb from-indigo-500 to-teal-400' },
  { "name": 'About', icon: <LuUser size={20} />, bg:'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' },
  { "name": 'Experience', icon: <PiHandbagFill size={20} />, bg:'bg-linear-65 from-purple-500 to-pink-500' },
  { "name": 'Skills', icon: <FaPencilRuler size={20} /> , bg:'bg-linear-to-bl from-violet-500 to-fuchsia-500'},
  { "name": 'Projects', icon: <FaCode size={20}  />, bg:"bg-linear-to-t from-sky-500 to-indigo-500" },
  { "name": 'Contact', icon: <TbMessageCircleFilled size={20} />, bg:'bg-linear-to-r from-cyan-500 to-blue-500' }
];

export default function UtilityBar() {
  const mouseLeft = useMotionValue(-Infinity);
  const mouseRight = useMotionValue(-Infinity);
  const left = useTransform(mouseLeft, [0, 40], [0, -40]);
  const right = useTransform(mouseRight, [0, 40], [0, -40]);
  const leftSpring = useSpring(left, SPRING);
  const rightSpring = useSpring(right, SPRING);

  

  const maxScale = useMotionValue(1);

  // Adjust the parent width & height dynamically based on maxScale
  //const height = useTransform(maxScale, [1, SCALE], ["4rem", "4.5rem"]);
  const width = useTransform(maxScale, [1, SCALE], ["20rem", "24rem"]);
  return (
    <>
      <motion.div
        onMouseMove={(e) => {
          const { left, right } = e.currentTarget.getBoundingClientRect();
          const offsetLeft = e.clientX - left;
          const offsetRight = right - e.clientX;
          mouseLeft.set(offsetLeft);
          mouseRight.set(offsetRight);
        }}
        onMouseLeave={() => {
          mouseLeft.set(-Infinity);
          mouseRight.set(-Infinity);
          maxScale.set(1);
        }}
        style={{width}}
        className="mx-auto hidden min-h-[4rem] w-fit items-end gap-3 px-3 pb-3 sm:flex relative rounded-xl bg-black transition-all"
      >
        <motion.div
          className="absolute rounded-2xl inset-y-0 bg-gray-700 border border-gray-600 -z-10"
          style={{ left: leftSpring, right: rightSpring }}
        />

        {APPS.map((app,i) => (
          <AppIcon key={i} mouseLeft={mouseLeft}  maxScale={maxScale} app={app}/>
        ))}
      </motion.div>
    </>
  );
}

function AppIcon({
  mouseLeft,
  children,
  maxScale,
  app
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };

    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, 1.5, 1]);
  scale.on("change",(value) => {
    if (value > maxScale.get()) {
      maxScale.set(value);
    }
  });
  const x = useTransform(() => {
    const d = distance.get();
    if (d === -Infinity) {
      return 0;
    } else if (d < -DISTANCE || d > DISTANCE) {
      return Math.sign(d) * -1 * NUDGE;
    } else {
      return (-d / DISTANCE) * NUDGE * scale.get();
    }
  });

  const scaleSpring = useSpring(scale, SPRING);
  const xSpring = useSpring(x, SPRING);
  const y = useMotionValue(0);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            ref={ref}
            style={{ x: xSpring, scale: scaleSpring, y }}
            onClick={() => {
              animate(y, [0, -10, 0], {
                repeat: 2,
                ease: [
                  [0, 0, 0.2, 1],
                  [0.8, 0, 1, 1],
                ],
                duration: 0.7,
              });
              dispatch(setSelectedApp(app.name))
            }}
            className={`aspect-square w-10 rounded-xl ${app.bg} shadow origin-bottom flex justify-center items-center`}
          >
            {app.icon}
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            className="bg-gray-700 shadow shadow-black border border-gray-600 px-2 py-1.5 text-sm rounded text-white font-medium"
          >
            {app.name}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
