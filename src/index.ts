import { loadCheerio } from "./loadCheerio";
import updateDB from "./utils/updateDB";
require("dotenv").config();

const url = "https://codeforces.com/group/TImmUza0J0/members";

(async () => {
  const $ = await loadCheerio(url);
  const toper = await $(`.rated-user`);
  const set: Set<string> = new Set();
  toper.each((_i, e) => {
    set.add($(e).text());
  });

  const res = Array.from(set);
  await updateDB(res);
})();
