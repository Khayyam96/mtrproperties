"use client";

import Image from "next/image";

type TProps = {
  width?: number;
  height?: number;
};

export const ProLogo: React.FC<TProps> = ({ width = 50, height = 43 }) => {
  return <Image src="/logo.png" alt="Logo" width={width} height={height} />;
};
