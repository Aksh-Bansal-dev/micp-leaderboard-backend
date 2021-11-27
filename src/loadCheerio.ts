import axios from "axios";
import cheerio from "cheerio";

export const loadCheerio = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const res = await cheerio.load(data);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Bad URL");
  }
};
