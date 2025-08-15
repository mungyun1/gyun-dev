import { Metadata } from "next";
import Auth from "@/components/Auth";

export const metadata: Metadata = {
  title: "Login | Gyun's Blog",
  description: "관리자 로그인",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { reason?: string; redirectedFrom?: string };
}) {
  return (
    <Auth
      reason={searchParams.reason}
      redirectedFrom={searchParams.redirectedFrom}
    />
  );
}
