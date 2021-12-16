import axios from "axios";

const deleteBody = (username: string): string => {
  const res = {
    query: `mutation {deleteMember(username:"${username}") {username, initialRating, currentRating}}`,
  };
  return JSON.stringify(res);
};

const deleteMember = async (username: string) => {
  const { data } = await axios.post(process.env.DB_URL!, deleteBody(username), {
    headers: {
      Authorization: "bearer " + process.env.DB_SECRET!,
    },
  });
  console.log("[DELETE]");
  console.log(JSON.stringify(data, null, 4));
};

const deleteMembers = async (
  curMembers: string[],
  dbMembers: string[],
  dangerMode: boolean
): Promise<void> => {
  dbMembers.map((e) => {
    if (!curMembers.includes(e)) {
      if (dangerMode) {
        deleteMember(e);
      } else {
        console.log("[DELETE] " + e);
      }
    }
  });
};

export default deleteMembers;
