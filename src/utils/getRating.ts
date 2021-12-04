import axios from "axios";

const getURL = (arr: string[]): string => {
  const res = arr.join(";");
  return res;
};

const getRating = async (arr: string[]): Promise<any[]> => {
  const { data } = await axios.get(
    process.env.CF_API! + "/user.info?handles=" + getURL(arr)
  );
  const res = data.result;
  for (let i = 0; i < res.length; i++) {
    if (!res[i].maxRating || res[i].maxRating < 1000) {
      res[i].maxRating = 1000;
    }
  }
  return res;
};

export default getRating;
