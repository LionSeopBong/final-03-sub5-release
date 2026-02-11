import { ErrorRes, FileUploadRes } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

export async function uploadFile(
  file: File,
): Promise<FileUploadRes | ErrorRes> {
  // 새로운 FormData 객체 생성 후 파일 추가
  const fileForm = new FormData();
  fileForm.append("attach", file);

  // API 서버에 파일 업로드 요청
  const res = await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: {
      "Client-Id": CLIENT_ID,
    },
    body: fileForm,
  });
  return res.json();
}
