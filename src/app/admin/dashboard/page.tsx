import { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard | Gyun's Blog",
  description: "관리자 대시보드",
};

export default function DashboardPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          관리자 대시보드
        </h1>
        <AdminDashboard />
      </div>
    </div>
  );
}
