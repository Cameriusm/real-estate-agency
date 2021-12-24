import axios from "axios";

export const baseUrl = "https://real-estate-agency-deployed-beta.vercel.app/";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "aee2712cbdmsh2baad80f7e95b8cp15b18ejsna39a6064f3c7",
    },
  });
  return data;
};
