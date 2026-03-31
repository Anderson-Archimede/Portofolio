import React from "react";

// Minimal next/image replacement for test environments.
// Renders a plain <img> — no layout optimisation, no blur placeholder, no lazy loading.
type NextImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  onError?: () => void;
};

export default function NextImage({
  src,
  alt,
  fill: _fill,
  sizes: _sizes,
  priority: _priority,
  ...rest
}: NextImageProps) {
  return <img src={src} alt={alt} {...rest} />;
}
