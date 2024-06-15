"use client";
import { Input } from "@/components/ui/input";
import { KeyButton } from "@/components/ui/keyButton";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { cn } from "@/lib/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Label } from "@radix-ui/react-label";
import { Bot, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	boolean,
	maxLength,
	maxValue,
	minLength,
	minValue,
	nonNullable,
	nullable,
	number,
	object,
	parse,
	pipe,
	string,
	transform,
} from "valibot";
import type { RESTPostRoomRequest } from "../../types/schema";
import { useRoomUseCase } from "../../usecase";

const formSchema = object({
	name: pipe(
		nonNullable(string(), "部屋名は必須です"),
		minLength(1, "部屋名は3文字以上である必要があります"),
		maxLength(20, "部屋名は20文字以上である必要があります"),
	),
	hostName: string(),
	minUserNum: pipe(
		nonNullable(string(), "最小人数は必須です"),
		minValue("1", "最小人数は1以上である必要があります"),
		maxValue("99", "最小人数は99以下である必要があります"),
	),
	maxUserNum: pipe(
		nonNullable(string(), "最大人数は必須です"),
		minValue("1", "最大人数は1以上である必要があります"),
		maxValue("99", "最大人数は99以下である必要があります"),
	),
	useCpu: boolean(),
});

const CreateRoom = ({ open }: { open: boolean }) => {
	const { user } = useAuthUseCase();
	const { createRoom, isCreating } = useRoomUseCase();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			hostName: user?.displayName ?? "",
			minUserNum: "1",
			maxUserNum: "10",
			useCpu: false,
		},
		mode: "onBlur",
		resolver: valibotResolver(formSchema),
	});
	const onSubmit: SubmitHandler<{
		name: string;
		hostName: string;
		minUserNum: string;
		maxUserNum: string;
		useCpu: boolean;
	}> = async (data) => {
		await createRoom({
			...data,
			minUserNum: Number.parseInt(data.minUserNum),
			maxUserNum: Number.parseInt(data.maxUserNum),
		});
	};
	return (
		<div
			className={cn(
				"fixed top-0 right-0 z-50 h-screen w-2/3 bg-black/90 fill-mode-backwards p-8 duration-500",
				!open
					? " translate-x-full translate-y-full"
					: "translate-x-0 translate-y-0",
			)}
		>
			<h1 className="text-xl">ルーム作成</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(onSubmit)();
				}}
				className="flex flex-col items-center gap-4"
			>
				<Label htmlFor="name">部屋名</Label>
				<Input {...register("name")} id="name" />
				{errors.name && <p className="text-red-400">{errors.name.message}</p>}
				<Label htmlFor="maxUserNum">最大人数</Label>
				<Input {...register("maxUserNum")} id="maxUserNum" />
				{errors.maxUserNum && (
					<p className="text-red-400">{errors.maxUserNum.message}</p>
				)}
				<Label htmlFor="minUserNum">最小人数</Label>
				<Input {...register("minUserNum")} id="minUserNum" />
				{errors.minUserNum && (
					<p className="text-red-400">{errors.minUserNum.message}</p>
				)}
				<span>
					<label
						htmlFor="useCpu"
						className="flex cursor-pointer flex-row items-center gap-2 font-bold"
					>
						{watch("useCpu") ? (
							<Bot className="repeat-1 animate-shake text-primary" />
						) : (
							<Bot />
						)}
						CPUを追加
					</label>
					<input
						id="useCpu"
						{...register("useCpu")}
						className="hidden"
						type="checkbox"
					/>
				</span>
				<button
					type="submit"
					disabled={isCreating}
					className="after:-translate-x-full relative w-fit overflow-hidden rounded-sm border border-primary bg-gradient-to-b from-transparent to-primary/20 px-4 py-2 after:absolute after:top-0 after:left-0 after:block after:h-full after:w-full hover:after:translate-x-0 after:bg-gradient-to-r after:from-transparent after:to-primary/20 after:transition-transform after:duration-300"
				>
					{isCreating ? <Swords className=" animate-spin" /> : "部屋を作成"}
				</button>
			</form>
		</div>
	);
};

export const CreateRoomButton = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			{open && (
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="-z-0 fixed top-0 left-0 h-screen w-full bg-black/20"
				/>
			)}
			<KeyButton onClick={() => setOpen(true)} type="button">
				部屋を作る
			</KeyButton>
			<CreateRoom open={open} />
		</>
	);
};
