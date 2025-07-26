"use client";

import { ReactNode } from "react";
import "./Container.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = "" }: Props) => {
  return <div className={`custom-container ${className}`}>{children}</div>;
};
