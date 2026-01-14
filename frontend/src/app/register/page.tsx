import RegisterPage from "@/components/auth/RegisterPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join today.",
};

const page = () => {
  return (
    <>
      <RegisterPage />
    </>
  );
};

export default page;