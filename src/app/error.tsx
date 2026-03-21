"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        color: "#f0f0f0",
        fontFamily: "var(--font-mono, monospace)",
        padding: "24px",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <div style={{ fontSize: "48px" }}>⚠</div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#00f0ff",
        }}
      >
        Une erreur est survenue
      </h2>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", maxWidth: "400px" }}>
        {error.message || "Something went wrong loading the portfolio."}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 24px",
          background: "rgba(0,240,255,0.1)",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "6px",
          color: "#00f0ff",
          fontSize: "13px",
          fontFamily: "var(--font-mono, monospace)",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
