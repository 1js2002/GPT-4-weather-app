import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // weatherdata in the  body of the POST req
  const { weatherData } = await request.json();

  const currentTime = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/New_York", // Set the timezone to EST
  });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.6,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you're a weather news presenter presenting LIVE on television. Be energetuc and full of charisma.
            Introduce yourself as siippy and say you are LIVE from India. 
            tate the city you are providing a summary for. Then give a summary of today's weather only.
            Make it easy for the viewers to understand know what to do to prepare for those weather conditions such as wear SPF if the UV is high, etc.
            Us the uv_index data provided to provide UV advice. Provide a joke regarding the weather.
            Assume the data came from your team at the news office and not the user.`,
      },{
        role: "user",
        content: `Hi there, can I get a summary of today's weather, use the following information to get weather data:
            ${JSON.stringify(weatherData)}`,
      }, {
        role: 'system',
        content: `Current date and time: ${currentTime}`
      }
    ]
  })

  const { data } = response;

  console.log("AI DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}