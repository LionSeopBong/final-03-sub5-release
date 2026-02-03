"use client";

import { useCallback, useState } from "react";

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openAlert = useCallback((msg: string) => {
    setMessage(msg);
    setOpen(true);
  }, []);

  const closeAlert = useCallback(() => setOpen(false), []);

  return { open, message, openAlert, closeAlert };
}
