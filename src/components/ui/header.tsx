"use client";
import { SERVICE_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { Mochiy_Pop_One } from "next/font/google";
import { usePathname } from "next/navigation";

const mochiyPopOne = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const Header = () => {
  const pathName = usePathname();
  if (pathName.includes("/rooms/")) {
    return null;
  }
  return (
    <header className="fixed top-0 left-0 p-4">
      <h1 className={cn("font-bold text-4xl", mochiyPopOne.className)}>
        {SERVICE_NAME}
      </h1>
    </header>
  );
};
