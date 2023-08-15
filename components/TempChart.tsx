"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const currentHour = new Date().getHours();
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
        // timeZone: "America/New_York", // Set the timezone to EST
      })
    )
    .slice(currentHour, currentHour + 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Temperature (F)": results.hourly.temperature_2m[currentHour + i],
    "Feels like": results.hourly.apparent_temperature[currentHour + i],
    "UV Index": results.hourly.uv_index[currentHour + i],
    "Tomorrow's Temperature (F)": results.hourly.temperature_2m[currentHour + i + 24],
    "Tomorrow's Feels like": results.hourly.apparent_temperature[currentHour + i + 24],
    "Tomorrow's UV Index": results.hourly.uv_index[currentHour + i + 24],
  }));

  const dataFormatter = (number: number) => `${number}`;

  // const dataFormatter = (number: number) => {
  //   const hours = Math.floor(number);
  //   const minutes = Math.round((number - hours) * 60);
  //   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  // };

  return (
    <div>
      <Card>
        <Title>Temperature &amp; UV Index</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time" // related in data variable
          categories={["Feels like", "Temperature (F)", "UV Index"]}
          colors={["amber", "orange", "yellow"]}
          minValue={1}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
      <Card>
        <Title>Tomorrow&apos;s Temp</Title>
        <AreaChart
          className="mt-6"
          data={data}
          index="time"
          categories={[
            "Tomorrow's Feels like",
            "Tomorrow's Temperature (F)",
            "Tomorrow's UV Index",
          ]}
          colors={["teal", "sky", "cyan"]}
          minValue={1}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
}

export default TempChart;
