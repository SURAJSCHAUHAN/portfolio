"use client";
import React from "react";
import { useEffect, useState } from "react";
import { IoBatteryCharging } from "react-icons/io5";
import { IoBatteryFull } from "react-icons/io5";

export const Header = () => {
  const [battery, setBattery] = useState({ level: 0, charging: false });
  const [time, setTime] = useState(null);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setBattery({
          level: (battery.level * 100).toFixed(0), // Convert to percentage
          charging: battery.charging,
        });

        battery.addEventListener("levelchange", () => {
          setBattery((prev) => ({
            ...prev,
            level: (battery.level * 100).toFixed(0),
          }));
        });

        battery.addEventListener("chargingchange", () => {
          setBattery((prev) => ({
            ...prev,
            charging: battery.charging,
          }));
        });
      });
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "short", // "Sun"
        month: "short", // "Mar"
        day: "2-digit", // "16"
      });

      const formattedTime = now
        .toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Ensures 24-hour format
        })
        .replace(/^0/, ""); // Remove leading zero (optional)

      setTime(`${formattedDate} ${formattedTime}`);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-[30px] h-[6vh] text-amber-50  top-0 w-[100%] bg-gray-950">
      <div className="font-orbitron font-bold text-2xl">Suraj Singh</div>
      <div className="flex text-[15px] justify-center items-center gap-1 font-semibold">
        <h5>{battery.level}% </h5>
        {battery.charging ? (
          <IoBatteryCharging size={20} />
        ) : (
          <IoBatteryFull size={20} />
        )}
        <div className="mx-5">{time}</div>
      </div>
    </div>
  );
};
