import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
import InformationPanel from "@/components/InformationPanel";
import TempChart from "@/components/TempChart";
import RainChart from "@/components/RainChart";
import HumidityChart from "@/components/HumidityChart";
import getBasePath from "@/lib/getBasePath";
import cleanData from "@/lib/cleanData";
import WindChart from "@/components/WindChart";
import WindLineChart from "@/components/WindLineChart";

// incremental static regeneration (ISR)
export const revalidate = 1440;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      temperature_unit: "fahrenheit",
      windspeed_unit: "ms",
      forecast_days: "16",
      longitude: long,
      latitude: lat,
      timezone: "auto",
    },
  });

  const results: Root = data.myQuery;

  console.log(results);

  const dataToSend = cleanData(results, city);
  
  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend
    })
  });

  const GPTData = await res.json();
  const { content } = GPTData;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel city={city} long={long} lat={lat} results={results} />
      <div className="flex-1 p-6 lg:p-10">
        <div>
          <div className="p-5">
            <div className="pb-5">
              <h2 className="text-xl font-bold">Todays Overview</h2>
              <p className="text-sm text-gray-400">
                Last Updated at:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,                  
                })} ({results.timezone})
              </p>
            </div>

            {/* OpenAI ChatGPT message here */}
            <div className="m-2 mb-10">
              <CalloutCard message={content} />
              {/* <CalloutCard message={"OpenAI ChatGPT message here"} /> */}
            </div>

            {/* Stat Card Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
              <StatCard
                title="Maximum Temperature"
                // set [0] to [1] to show tomorrow's weather data
                metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
                color="yellow"
              />
              <StatCard
                title="Minimum Temperature"
                metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
                color="green"
              />

              <div className="flex space-x-4">
                <StatCard
                  title="UV Index"
                  metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                  color="rose"
                />
                {Number(results.daily.uv_index_max[0].toFixed(1)) > 9 && (
                  <CalloutCard
                    message={"The UV is high today, be sure to wear SPF!"}
                    warning
                  />
                )}
                <StatCard
                  title="Visibility"
                  metric={`${results?.hourly.visibility[0]?.toFixed(0)}m`}
                  color="slate"
                />                
              </div>

              <div className="flex space-x-2">
                <StatCard
                  title="Wind Speed"
                  metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                  color="cyan"
                />
                <StatCard
                  title="Wind Direction"
                  metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                  color="violet"
                />
              </div>
            </div>
          </div>
          <hr className="mb-5" />

          <div className="space-y-3">
            <TempChart results={results}/>
            <RainChart results={results}/>
            <WindLineChart results={results} />            
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;