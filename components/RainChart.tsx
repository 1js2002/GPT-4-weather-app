"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function RainChart({ results }: Props) {
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
    "Today": results.hourly.precipitation_probability[currentHour + i],
    "Tomorrow": results.hourly.precipitation_probability[currentHour + i + 24],
    "Next Day": results.hourly.precipitation_probability[currentHour + i + 48],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <div>
      <Card>
        <Title>Chances of Rain</Title>
        <AreaChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Today", "Tomorrow", "Next Day"]}
          colors={["indigo", "blue", "emerald"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
}

export default RainChart;
