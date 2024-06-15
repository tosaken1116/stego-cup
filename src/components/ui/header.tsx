import { cn } from "@/lib/utils";
import { Mochiy_Pop_One } from "next/font/google";

const mochiyPopOne = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const Header = () => {
  return (
    <header className="fixed left-0 top-0 p-4">
      <h1 className={cn("text-4xl font-bold", mochiyPopOne.className)}>
        タイピング99
      </h1>
    </header>
  );
};
