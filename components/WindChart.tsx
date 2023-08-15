"use client";

import { Card, AreaChart, Title } from "@tremor/react";
import CalloutCard from "./CalloutCard";

type Props = {
  results: Root;
};

function WindChart({ results }: Props) {
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
    "Wind (m/s)": results.hourly.windgusts_10m[currentHour + i],
    "Tomorrow's Wind (m/s)": results.hourly.windgusts_10m[currentHour + i + 24],
  }));

  const dataFormatter = (number: number) => `${number} m/s`;

  return (
    <div>
      <Card>
        <Title>Wind Speeds</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Wind (m/s)"]}
          colors={["sky"]}
          minValue={0}
          // maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
      <Card>
        <Title>Tomorrow&apos;s Speeds</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Tomorrow's Wind (m/s)"]}
          colors={["cyan"]}
          minValue={0}
          // maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
}

export default WindChart;
