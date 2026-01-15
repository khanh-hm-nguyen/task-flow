import DashBoard from "@/components/task/DashBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your tasks and track your efficiency.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <>
      <DashBoard />
    </>
  );
};

export default page;
