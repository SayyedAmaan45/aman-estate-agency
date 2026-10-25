"use client";

import { useEffect } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3500);

    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role={type === "error" ? "alert" : "status"}
    >
      <span className={styles.icon} aria-hidden="true">
        {type === "success" ? "✓" : type === "warning" ? "!" : "×"}
      </span>

      <p>{message}</p>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
