"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#f0f0f0",
          fontFamily: "monospace",
          gap: "20px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <h2 style={{ color: "#00f0ff", fontSize: "20px" }}>
          Portfolio — Erreur critique
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", maxWidth: "400px" }}>
          {error.message}
        </p>
        <button
          onClick={reset}
          style={{
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid rgba(0,240,255,0.3)",
            borderRadius: "6px",
            color: "#00f0ff",
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
