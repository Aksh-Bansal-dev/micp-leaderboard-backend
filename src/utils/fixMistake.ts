import axios from "axios";

const createBody = (num: number): string => {
  const res = {
    query: `mutation {fixMistake(spell: ${num}) {username}}`,
  };
  return JSON.stringify(res);
};

export const alal = async (num: number) => {
  const { data } = await axios.post(process.env.DB_URL!, createBody(num), {
    headers: {
      Authorization: "bearer " + process.env.DB_SECRET!,
    },
  });
  console.log(data);
};
