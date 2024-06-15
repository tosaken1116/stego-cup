import { cn } from "@/lib/utils";
import { set } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { KeyBoard } from "../KeyBoard";
const keyboardLayout: string[][] = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
];
const words = [
	{
		ruby: "JavaScript",
		value: "JavaScript",
	},
	{
		ruby: "TypeScript",
		value: "TypeScript",
	},
	{
		ruby: "React",
		value: "React",
	},
	{
		ruby: "Vue.js",
		value: "Vue.js",
	},
	{
		ruby: "Angular",
		value: "Angular",
	},
	{
		ruby: "Node.js",
		value: "Node.js",
	},
	{
		ruby: "Express",
		value: "Express",
	},
	{
		ruby: "Tailwind CSS",
		value: "Tailwind CSS",
	},
	{
		ruby: "Bootstrap",
		value: "Bootstrap",
	},
	{
		ruby: "Sass",
		value: "Sass",
	},
	{
		ruby: "Webpack",
		value: "Webpack",
	},
	{
		ruby: "Babel",
		value: "Babel",
	},
	{
		ruby: "GraphQL",
		value: "GraphQL",
	},
	{
		ruby: "Apollo",
		value: "Apollo",
	},
	{
		ruby: "Redux",
		value: "Redux",
	},
	{
		ruby: "Next.js",
		value: "Next.js",
	},
	{
		ruby: "Gatsby",
		value: "Gatsby",
	},
	{
		ruby: "Docker",
		value: "Docker",
	},
	{
		ruby: "Kubernetes",
		value: "Kubernetes",
	},
	{
		ruby: "Firebase",
		value: "Firebase",
	},
];
export const TypingGameOffline = () => {
	const [text, setText] = useState("");
	const [word, setWord] = useState(words[0]);
	const [currentText, setCurrentText] = useState("");
	const nextText = word.value[text.length];

	const startGame = useCallback(() => {
		const randomWord = words[Math.floor(Math.random() * words.length)];
		setWord(randomWord);
		setText("");
	}, []);
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			setText((prev) => {
				const newVal = prev + e.key;
				if (newVal === word.value) {
					startGame();
					return "";
				}
				if (!word.value.startsWith(newVal)) {
					return prev;
				}
				return newVal;
			});
			setCurrentText(e.key.toUpperCase());
		},
		[startGame, word.value],
	);
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<KeyBoard
				itemClassName={(key) => {
					return key.toLowerCase() === nextText
						? "bg-green-500"
						: currentText === key.toLowerCase() && currentText !== nextText
							? "bg-red-500"
							: "bg-gray-500";
				}}
			/>
			<span className="text-3xl">
				{word.ruby.split("").map((char, i) => (
					<span
						key={i}
						className={
							text[i] === char
								? "text-green-500"
								: text[i]
									? "text-red-500"
									: ""
						}
					>
						{char}
					</span>
				))}
			</span>
		</div>
	);
};
