import { SERVICE_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { Mochiy_Pop_One } from "next/font/google";

const mochiyPopOne = Mochiy_Pop_One({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal"],
});
export const Header = () => {
	return (
		<header className="fixed top-0 left-0 p-4">
			<h1 className={cn("font-bold text-4xl", mochiyPopOne.className)}>
				{SERVICE_NAME}
			</h1>
		</header>
	);
};
