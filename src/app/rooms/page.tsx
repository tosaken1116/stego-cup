import { StartMatch } from "@/domains/Room/components/StartMatchButton";

export default function RoomsPage() {
	return (
		<div className="h-screen w-full ">
			<div className="absolute right-0 bottom-0 p-12">
				<StartMatch />
			</div>
		</div>
	);
}
