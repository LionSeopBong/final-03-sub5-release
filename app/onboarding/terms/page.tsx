"use client";

import TermsForm from "@/app/onboarding/terms/TermsForm";
import { Suspense } from "react";

export default function TermsPage() {
  return (
    <Suspense fallback={null}>
      <TermsForm />
    </Suspense>
  );
}
