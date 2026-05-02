import AddRecordForm from "@/app/records/new/AddRecordForm";

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
