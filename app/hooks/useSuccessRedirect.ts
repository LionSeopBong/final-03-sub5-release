import { removeRecord } from "@/app/action/records";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function useSuccessRedirect(state: { success?: boolean; error?: string } | null, path: string) {
  const router = useRouter();

  //추가여부
  useEffect(() => {
    if (state?.success) {
      router.push(path);
      router.refresh();
    }
  }, [state, path]);
  // //삭제성공
  //   useEffect(() => {
  //     if (deleteState?.success) {
  //       alert("삭제 완료!");
  //       router.push("");
  //       router.refresh();
  //     }
  //   }, [deleteState, router]);
  // //수정성공
  //     useEffect(() => {
  //   if (state?.success) {
  //     alert("수정 완료!");
  //     router.push("/records");
  //     router.refresh();
  //   }
  // }, [state, router]);
}
