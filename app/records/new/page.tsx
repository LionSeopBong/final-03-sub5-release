import AddRecordForm from "@/app/records/new/AddRecordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "러닝 기록 추가 - 서브5",
  description: "기록을 추가하세요",
};

export default function NewRecordPage() {
  return (
    <>
      <main className="flex-1 min-w-[320px] p-4 bg-[#FFFFFF]">
        <div className="text-center py-4"></div>
        <section className="mb-8 p-4 ">
          <AddRecordForm />
        </section>
      </main>
    </>
  );
}
