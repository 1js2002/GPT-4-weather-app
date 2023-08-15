"use client";

import { Card, AreaChart, Title, LineChart } from "@tremor/react";
import CalloutCard from "./CalloutCard";

type Props = {
  results: Root;
};

function WindLineChart({ results }: Props) {
  // Add a variable to get the current hour:
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
    "Today": results?.hourly.windgusts_10m?.[currentHour + i],
    "Tomorrow": results?.hourly.windgusts_10m?.[currentHour + i + 24],
    "Three": results?.hourly.windgusts_10m?.[currentHour + i + 48],
  }));

  const dataFormatter = (number: number) => `${number} m/s`;

  return (
    <div>
      <Card>
        <Title>Wind Speeds</Title>
        <LineChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Today", "Tomorrow", "Three"]}
          colors={["blue", "orange", "fuchsia"]}
          minValue={0}
          // maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
}

export default WindLineChart;
