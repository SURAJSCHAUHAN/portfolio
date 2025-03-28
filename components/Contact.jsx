"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSelectedApp } from "../redux/appSlice";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

import * as LabelPrimitive from "@radix-ui/react-label";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [maxView, setmaxView] = useState(false);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Sending...");

    try {
      const response = await emailjs.send(
        "service_6h4ccfj", // Replace with your Email.js Service ID
        "template_6c8lo1w", // Replace with your Email.js Template ID
        form,
        "Z11xAB_DQDcgKvttQ" // Replace with your Email.js Public Key
      );
      console.log("SUCCESS!", response);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message.");
    }
  };
  return (
    <div
      className={`${
        maxView
          ? "w-[100vw] h-[100vh]"
          : " w-[90vw] min-h-[50vh] md:w-[60vw] md:min-h-[40vh] rounded-2xl "
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
        <h1>Contact</h1>
      </div>

      <div className="text-center w-full mt-5">
        <h1 className="text-xl font-semibold">Let's Connect</h1>
        <div
          className={`mx-auto w-full  bg-transparent ${
            maxView ? "p-30" : "p-6 md:p-10"
          } md:rounded-2xl`}
        >
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="firstname">Name</Label>
                <Input
                  id="firstname"
                  placeholder="Suraj"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="xyz@mail.com"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer>
              <Label>Message</Label>
              <Textarea
                placeholder="Message"
                type="textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
              ></Textarea>
            </LabelInputContainer>

            <button
              className="group/btn mt-2 relative block h-10 w-full rounded-md text-white font-medium bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Submit
              <BottomGradient />
            </button>
          </form>
          <div className="flex justify-center items-center gap-5 mt-10 text-2xl">
            <Link
              href="https://github.com/SURAJSCHAUHAN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub />
            </Link>
            <Link
              href="https://www.instagram.com/suraj_padmawat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.linkedin.com/in/chauhan-suraj-singh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        #3b82f6,
        transparent 80%
      )
    `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border-none px-3 py-2 text-sm transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-800 text-white shadow-[0px_0px_1px_1px_#404040] focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        type={type}
        className={cn(
          `flex h-20 w-full rounded-md border-none px-3 py-2 text-sm  transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-800 text-white shadow-[0px_0px_1px_1px_#404040] focus-visible:ring-neutral-600`,
          className
        )}
        ref={ref}
        {...props}
      ></textarea>
    </motion.div>
  );
});
Textarea.displayName = "Textarea";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-start text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
