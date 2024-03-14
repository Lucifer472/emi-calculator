import { redirect } from "next/navigation";

const RePage = () => {
  redirect("/article/car");
  return <div></div>;
};

export default RePage;
