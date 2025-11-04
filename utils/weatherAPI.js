import axios from "axios";

export const getWeather = async (city) => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
  return res.data;
};
