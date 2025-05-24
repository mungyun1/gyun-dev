import { Metadata } from "next";
import AdminLogin from "@/components/AdminLogin";

export const metadata: Metadata = {
  title: "Admin | Gyun's Blog",
  description: "관리자 페이지",
};

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            관리자 로그인
          </h2>
        </div>
        <AdminLogin />
      </div>
    </div>
  );
}
