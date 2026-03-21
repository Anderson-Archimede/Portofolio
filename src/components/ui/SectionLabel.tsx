"use client";

export default function SectionLabel({ text }: { text: string }) {
  return (
    <span className="label-badge mb-6 inline-flex">
      {text}
    </span>
  );
}
