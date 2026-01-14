import LoginPage from "@/components/auth/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login", 
  description: "Sign in to your account securely.",
};

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;