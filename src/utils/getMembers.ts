import axios from "axios";

const body = {
  query: "query {allMembers(_size: 1000) {data {username}}}",
};

const getMembers = async (): Promise<any[]> => {
  const { data } = await axios.post(process.env.DB_URL!, JSON.stringify(body), {
    headers: {
      Authorization: "bearer " + process.env.DB_SECRET!,
    },
  });
  const res = data.data.allMembers.data;
  const arr = [];
  for (let i = 0; i < res.length; i++) {
    arr.push(res[i].username);
  }
  return arr;
};

export default getMembers;
