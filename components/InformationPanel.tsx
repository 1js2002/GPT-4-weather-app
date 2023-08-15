"use client";

import { MoonIcon, SunIcon, CloudIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // set state to update currentDateTime

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Add a variable to get the current hour:
  const currentHour = new Date().getHours();

  // Modify the hourly variable to only include the next 24 hours starting from the current hour:
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
        // timeZone: "America/New_York", // Set the timezone to EST
      })
    )
    .slice(currentHour, currentHour + 24);

  // Modify the data variable to include the "Feels like" temperature for the next 24 hours:
  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Feels like": results?.hourly.apparent_temperature?.[i + currentHour],
    "Current weather": results?.hourly.temperature_2m?.[i + currentHour],
    "Tomorrow Max": results?.daily.temperature_2m_max?.[i + 1],
    "Tomorrow Min": results?.daily.temperature_2m_min?.[i + 1],
    "Tomorrow Rain": results?.daily.precipitation_probability_max?.[i + 1],
  }));

  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-white p-10">
      <div className="pb-5">
        <Link href={"/"}>
          <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        </Link>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-8 mb-5">
        <div>
          <p className="text-sm md:text-xl">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        
      </div>

      <hr className="mt-10 mb-5" />

      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-3xl md:text-6xl font-semibold">
              {data[0]["Current weather"].toFixed(0)}°F
            </p>

            <p className="text-right font-extralight text-xs md:text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
            <div className="xs:flex-1 text-right">
              <p className="text-xs">
                {/* update the line that displays the "Feels like" temperature 
                  to use the appropriate value from the data array */}{" "}
                Feels like: {data[0]["Feels like"].toFixed(0)}°F
                {/* Tomorrow's Max: {data[1]["Tomorrow's Max"].toFixed(1)}°F
              Day Two's Max: {data[2]["Day Two's Max"].toFixed(1)}°F
              Day Three's Max: {data[3]["Day Three's Max"].toFixed(1)}°F
              Day Four's Max: {data[4]["Day Four's Max"].toFixed(1)}°F */}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>



       
      </div>
    </div>
  );
}

export default InformationPanel;
