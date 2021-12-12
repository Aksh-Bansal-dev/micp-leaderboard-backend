import deployHook from "./ci/deployHook";
import { loadCheerio } from "./loadCheerio";
import updateDB from "./utils/updateDB";
require("dotenv").config();

const url = process.env.CF_GROUP_URL;

(async () => {
  const $ = await loadCheerio(url!);
  const toper = await $(`.rated-user`);
  const set: Set<string> = new Set();
  toper.each((_i, e) => {
    set.add($(e).text());
  });

  const res = Array.from(set);
  console.log("Entries: " + res.length);
  if (!res || res.length == 0) {
    console.log("CF cookie expired!");
    return;
  }
  await updateDB(res);
  await deployHook();
})();
