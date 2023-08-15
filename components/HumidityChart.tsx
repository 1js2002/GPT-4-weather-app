"use client";

import { Card, AreaChart, Title, LineChart } from "@tremor/react";

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const currentHour = new Date().getHours();
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(currentHour, currentHour + 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Today": results.hourly.relativehumidity_2m[currentHour + i],
    "Tomorrow": results.hourly.relativehumidity_2m[currentHour + i + 24],
    "Next Day": results.hourly.relativehumidity_2m[currentHour + i + 48],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <div>
      <Card>
        <Title>Humidity Levels</Title>
        <LineChart
          className="mt-6"
          data={data}
          showLegend
          index="time"
          categories={["Today", "Tomorrow", "Next Day"]}
          colors={["yellow", "teal"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </Card>
    </div>
  );
}

export default HumidityChart;
