import axios from "axios";

const body = {
  query: "query {allMembers {data {username}}}",
};

const getMembers = async (): Promise<any[]> => {
  const { data } = await axios.post(process.env.DB_URL!, JSON.stringify(body), {
    headers: {
      Authorization: "bearer " + process.env.DB_SECRET!,
    },
  });
  return data.data.allMembers.data;
};

export default getMembers;
