import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AiOutlineHome } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { PiHandbagFill } from "react-icons/pi";
import { FaPencilRuler } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { TbMessageCircleFilled } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";

import { useRef, useState } from "react";

export const Dock = () => {
  const APPS = [
    {
      name: "Home",
      icon: <AiOutlineHome size={20} />,
      bg: "bg-linear-to-r/srgb from-indigo-500 to-teal-400",
    },
    {
      name: "About",
      icon: <LuUser size={20} />,
      bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      name: "Experience",
      icon: <PiHandbagFill size={20} />,
      bg: "bg-linear-65 from-purple-500 to-pink-500",
    },
    {
      name: "Skills",
      icon: <FaPencilRuler size={20} />,
      bg: "bg-linear-to-bl from-violet-500 to-fuchsia-500",
    },
    {
      name: "Projects",
      icon: <FaCode size={20} />,
      bg: "bg-linear-to-t from-sky-500 to-indigo-500",
    },
    {
      name: "Contact",
      icon: <TbMessageCircleFilled size={20} />,
      bg: "bg-linear-to-r from-cyan-500 to-blue-500",
    },
  ];
  return (
    <div className="flex items-center justify-center  w-full">
      <FloatingDock items={APPS} />
    </div>
  );
};

/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  const radius = 100; // Semi-circle radius
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        "relative md:hidden flex items-center justify-center bottom-20",
        className
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex items-center justify-center w-40 h-20">
            {items.map((item, idx) => {
              const angle = (idx / (items.length - 1)) * Math.PI; // Spread in 180° semi-circle
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * -radius; // Move items upward

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: idx * 0.05,
                  }}
                  className="absolute"
                >
                  {/* dispatch function used here */}
                  <div
                    onClick={() => dispatch(setSelectedApp(item.name))}
                    className={`h-12 w-12 rounded-full ${item.bg} flex items-center justify-center shadow-md`}
                  >
                    <div>{item.icon}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Center Button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-linear-65 from-purple-500 to-pink-500 flex items-center justify-center shadow-lg absolute left-1/2 -translate-x-1/2 bottom-0"
      >
        <IconLayoutNavbarCollapse className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.name} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, name, icon, bg }) {
  let ref = useRef(null);
  const dispatch = useDispatch();

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`aspect-square rounded-xl ${bg} dark:bg-neutral-800 flex items-center justify-center relative`}
      onClick={() => dispatch(setSelectedApp(name))}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
