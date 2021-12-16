import axios from "axios";
import deleteMembers from "./deleteMember";
import getMembers from "./getMembers";
import getRating from "./getRating";

const updateBody = (username: string, rating: string): string => {
  const res = {
    query: `mutation {updateMember(username:"${username}", rating:${rating}) {username, initialRating, currentRating}}`,
  };
  return JSON.stringify(res);
};
const createBody = (username: string, cur: string, ini: string): string => {
  const res = {
    query: `mutation {addMember(username:"${username}", currentRating:${cur}, initialRating:${ini}) {username, initialRating, currentRating}}`,
  };
  return JSON.stringify(res);
};

const updateMember = async (username: string, rating: string) => {
  const { data } = await axios.post(
    process.env.DB_URL!,
    updateBody(username, rating),
    {
      headers: {
        Authorization: "bearer " + process.env.DB_SECRET!,
      },
    }
  );
  console.log("[UPDATE]");
  console.log(JSON.stringify(data, null, 4));
};

const addMember = async (username: string, cur: string, ini: string) => {
  const { data } = await axios.post(
    process.env.DB_URL!,
    createBody(username, cur, ini),
    {
      headers: {
        Authorization: "bearer " + process.env.DB_SECRET!,
      },
    }
  );
  console.log("[CREATE]");
  console.log(JSON.stringify(data, null, 4));
};
const updateDB = async (
  arr: string[],
  callback?: () => Promise<void>
): Promise<void> => {
  const members = await getMembers();
  const ratings = await getRating(arr);
  deleteMembers(arr, members);
  arr.map((e, i) => {
    const username = e;
    if (members.includes(e)) {
      updateMember(username, ratings[i].maxRating);
    } else {
      addMember(username, ratings[i].maxRating, ratings[i].maxRating);
    }
  });
  if (callback) await callback();
};

export default updateDB;
