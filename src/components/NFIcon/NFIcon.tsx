import type { FC } from "react";

interface NFIconProps {
  icon: string;
  className?: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
}

const sizeMap: Record<NonNullable<NFIconProps["size"]>, string> = {
  xs: "text-[11px]",
  sm: "text-xs",
  base: "text-sm",
  lg: "text-base",
  xl: "text-lg",
  "2xl": "text-xl",
};

export const NFIcon: FC<NFIconProps> = ({ icon, className = "", size = "base" }) => (
  <span
    className={`font-nerd inline-flex items-center justify-center leading-none ${sizeMap[size]} ${className}`}
    aria-hidden="true"
  >
    {icon}
  </span>
);
