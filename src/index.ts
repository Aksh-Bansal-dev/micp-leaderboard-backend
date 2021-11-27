import { loadCheerio } from "./loadCheerio";

const url = "https://codeforces.com/contest/1614/standings";

(async () => {
  const $ = await loadCheerio(url);
  const toper = await $(`[participantid=124048161] a`);
  console.log(toper.text());
})();
