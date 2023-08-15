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

  // recurring dates

  const tomorrowFormatted = tomorrow.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayThree = new Date();
  dayThree.setDate(dayThree.getDate() + 2);

  const dayThreeFormatted = dayThree.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFour = new Date();
  dayFour.setDate(dayFour.getDate() + 3);

  const dayFourFormatted = dayFour.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFive = new Date();
  dayFive.setDate(dayFive.getDate() + 4);

  const dayFiveFormatted = dayFive.toLocaleDateString("en-US", {
    hour12: true,
  });

  const daySix = new Date();
  daySix.setDate(daySix.getDate() + 5);

  const daySixFormatted = daySix.toLocaleDateString("en-US", {
    hour12: true,
  });

  const daySeven = new Date();
  daySeven.setDate(daySeven.getDate() + 6);

  const daySevenFormatted = daySeven.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayEight = new Date();
  dayEight.setDate(dayEight.getDate() + 7);

  const dayEightFormatted = dayEight.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayNine = new Date();
  dayNine.setDate(dayNine.getDate() + 8);

  const dayNineFormatted = dayNine.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayTen = new Date();
  dayTen.setDate(dayTen.getDate() + 9);

  const dayTenFormatted = dayTen.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayEleven = new Date();
  dayEleven.setDate(dayEleven.getDate() + 10);

  const dayElevenFormatted = dayEleven.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayTwelve = new Date();
  dayTwelve.setDate(dayTwelve.getDate() + 11);

  const dayTwelveFormatted = dayTwelve.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayThirteen = new Date();
  dayThirteen.setDate(dayThirteen.getDate() + 12);

  const dayThirteenFormatted = dayThirteen.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFourteen = new Date();
  dayFourteen.setDate(dayFourteen.getDate() + 13);

  const dayFourteenFormatted = dayFourteen.toLocaleDateString("en-US", {
    hour12: true,
  });

  const dayFifteen = new Date();
  dayFifteen.setDate(dayFifteen.getDate() + 14);

  const dayFifteenFormatted = dayFifteen.toLocaleDateString("en-US", {
    hour12: true,
  });
  /**
   * To loop through the hours of the day correctly and display the
   * current "Feels like" temperature, you can modify the code as follows:
   */

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

        <div>
          <p className="text-sm md:text-xl font-bold uppercase min-w-max">
            {currentDateTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
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

        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <CloudIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Chance of rain</p>
            <p className="text-2xl">
              {results.daily.precipitation_probability_max[0].toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <CloudIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Gusty</p>
            <p className="text-2xl">
              {results.current_weather.windspeed.toFixed(1)}m/s
            </p>
          </div>
          {/* <hr className="mt-10 mb-5" /> */}
        </div>

        <div className="text-sm py-1">
          <h1 className="font-semibold text-3xl py-4 text-amber-300">
            10-Day Forecast
          </h1>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{tomorrowFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[0]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[0]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[0]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayThreeFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[1]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[1]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[1]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayFourFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[2]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[2]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[2]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayFiveFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[3]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[3]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[3]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{daySixFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[4]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[4]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[4]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{daySevenFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[5]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[5]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[5]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayEightFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[6]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[6]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[6]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayNineFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[7]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[7]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[7]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayTenFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[8]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[8]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[8]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayElevenFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[9]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[9]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
            </div>
          </div>
          {/*  
          <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
            <div className="flex-1 flex justify-between items-center text-xs">
              <h2 className="md:text-base text-sm">{dayTwelveFormatted}</h2>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Max:</p>
                <p className="uppercase font-semibold">
                  {data[10]["Tomorrow Max"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Min:</p>
                <p className="uppercase font-semibold">
                  {data[10]["Tomorrow Min"].toFixed(1)}°F
                </p>
              </div>
              <div className="text-center flex md:flex-row flex-col">
                <p className="font-extralight md:mr-3">Rain:</p>
                <p className="uppercase font-semibold">
                  {data[10]["Tomorrow Rain"].toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
      
        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="md:text-base text-sm">{dayThirteenFormatted}</h2>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Max:</p>
              <p className="uppercase font-semibold">
              {data[11]["Tomorrow Max"].toFixed(1)}°F
              </p>
            </div>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Min:</p>
              <p className="uppercase font-semibold">
              {data[11]["Tomorrow Min"].toFixed(1)}°F
            </p>
            </div>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Rain:</p>
              <p className="uppercase font-semibold">
              {data[11]["Tomorrow Rain"].toFixed(1)}%
            </p>
            </div>
          </div>
        </div> 
        <div className="flex items-center space-x-2 mb-2 px-7 py-4 border border-[#6F90CD] rounded-md bg-[#405885]">
          <div className="flex-1 flex justify-between items-center text-xs">
            <h2 className="md:text-base text-sm">{dayFourteenFormatted}</h2>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Max:</p>
              <p className="uppercase font-semibold">
              {data[12]["Tomorrow Max"].toFixed(1)}°F
              </p>
            </div>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Min:</p>
              <p className="uppercase font-semibold">
              {data[12]["Tomorrow Min"].toFixed(1)}°F
            </p>
            </div>
            <div className="text-center flex md:flex-row flex-col">
              <p className="font-extralight md:mr-3">Rain:</p>
              <p className="uppercase font-semibold">
              {data[12]["Tomorrow Rain"].toFixed(1)}%
            </p>
            </div>
          </div>
        </div>                                      
         */}
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
