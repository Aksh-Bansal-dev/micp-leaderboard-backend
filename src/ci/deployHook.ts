import axios from "axios";

const deployHook = async (): Promise<void> => {
  const { data } = await axios.post(process.env.DEPLOY_HOOK!);
  console.log("Deploying...");
  console.log(data);
};

export default deployHook;
