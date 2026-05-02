"use client";

import { useSearchParams } from "next/navigation";

export default function LoginErrorMessage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  if (!errorMessage) return null;

  return (
    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      {errorMessage}
    </div>
  );
}
