"use client";

import { useCallback, useState } from "react";

type AlertState = {
  open: boolean;
  message: string;
  onConfirm?: () => void;
  showCancel?: boolean;
};

export default function useAlert() {
  const [state, setState] = useState<AlertState>({
    open: false,
    message: "",
  });

  // 일반 알림(Alert)
  const openAlert = useCallback((message: string) => {
    setState({
      open: true,
      message,
      onConfirm: undefined,
      showCancel: false,
    });
  }, []);

  // confirm 알림
  const openConfirm = useCallback(
    (message: string, onConfirm: () => void, showCancel = true) => {
      setState({
        open: true,
        message,
        onConfirm,
        showCancel,
      });
    },
    [],
  );

  const closeAlert = useCallback(() => {
    setState({
      open: false,
      message: "",
      onConfirm: undefined,
      showCancel: false,
    });
  }, []);

  return { ...state, openAlert, openConfirm, closeAlert };
}
