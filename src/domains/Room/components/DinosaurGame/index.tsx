import type React from "react";
import { useEffect, useRef, useState } from "react";
import { CactusSVG } from "./cactus";
import { DinosaurSVG } from "./dinosaur";

interface Obstacle {
	id: number;
	left: number;
}

export const DinosaurGame: React.FC = () => {
	const [dinoY, setDinoY] = useState(0);
	const [isJumping, setIsJumping] = useState(false);
	const [obstacles, setObstacles] = useState<Obstacle[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const gameAreaRef = useRef<HTMLDivElement>(null);
	const gameSpeed = 15; // Speed adjustment
	const jumpHeight = 200; // Increase jump height
	const jumpSpeed = 10; // Increase jump speed
	const gravity = 8; // Adjust fall speed
	const obstacleMinInterval = 2000; // Minimum interval between obstacles
	const obstacleMaxInterval = 4000; // Maximum interval between obstacles

	const handleJump = (event: KeyboardEvent) => {
		if (event.key === " " && !isJumping && dinoY === 0) {
			setIsJumping(true);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.addEventListener("keydown", handleJump);
		return () => {
			window.removeEventListener("keydown", handleJump);
		};
	}, [isJumping, dinoY]);

	useEffect(() => {
		let jumpAnimationFrame: number;

		const handleJumpAnimation = () => {
			setDinoY((prev) => {
				if (isJumping) {
					if (prev >= jumpHeight) {
						setIsJumping(false);
						return jumpHeight;
					}
					return prev + jumpSpeed;
				}
				return Math.max(prev - gravity, 0);
			});
			jumpAnimationFrame = requestAnimationFrame(handleJumpAnimation);
		};

		handleJumpAnimation();
		return () => cancelAnimationFrame(jumpAnimationFrame);
	}, [isJumping]);

	useEffect(() => {
		if (!gameOver) {
			const gameInterval = setInterval(() => {
				setScore((prevScore) => prevScore + 1);
				setObstacles((prevObstacles) => {
					const newObstacles = prevObstacles.map((obstacle) => ({
						...obstacle,
						left: obstacle.left - gameSpeed,
					}));

					return newObstacles.filter((obstacle) => obstacle.left > -50);
				});
			}, 100);

			return () => clearInterval(gameInterval);
		}
	}, [gameOver]);

	useEffect(() => {
		if (!gameOver) {
			const addObstacle = () => {
				setObstacles((prevObstacles) => [
					...prevObstacles,
					{ id: Date.now(), left: 800 },
				]);
			};

			const randomInterval =
				Math.random() * (obstacleMaxInterval - obstacleMinInterval) +
				obstacleMinInterval;
			const obstacleTimer = setInterval(addObstacle, randomInterval);
			return () => clearInterval(obstacleTimer);
		}
	}, [gameOver]);

	useEffect(() => {
		const checkCollision = () => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			obstacles.forEach((obstacle) => {
				if (
					obstacle.left < 80 && // Dinosaur position x + width
					obstacle.left > 40 && // Dinosaur width
					dinoY < 20 // Dinosaur height
				) {
					setGameOver(true);
				}
			});
		};

		const collisionInterval = setInterval(() => {
			if (!gameOver) {
				checkCollision();
			}
		}, 10);

		return () => clearInterval(collisionInterval);
	}, [obstacles, dinoY, gameOver]);

	const restartGame = () => {
		setDinoY(0);
		setIsJumping(false);
		setObstacles([]);
		setScore(0);
		setGameOver(false);
	};

	if (gameOver) {
		return (
			<div className="flex h-screen flex-col items-center justify-center bg-red-100">
				<div className="mb-4 font-bold text-3xl">Game Over! Score: {score}</div>
				<button
					type="button"
					className="rounded bg-blue-500 px-4 py-2 text-white"
					onClick={restartGame}
				>
					Restart Game
				</button>
			</div>
		);
	}

	return (
		<div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-900">
			<div className="relative h-full w-full" ref={gameAreaRef}>
				<div
					className="absolute bottom-0 left-20 h-20 w-20"
					style={{ transform: `translateY(-${dinoY}px)` }}
				>
					<DinosaurSVG />
				</div>
				{obstacles.map((obstacle) => (
					<div
						key={obstacle.id}
						className="absolute bottom-0 h-20 w-20"
						style={{
							left: `${obstacle.left}px`,
							transition: `left ${gameSpeed / 100}s linear`,
						}}
					>
						<CactusSVG />
					</div>
				))}
				<div className="absolute top-0 left-0 p-4 text-xl">Score: {score}</div>
			</div>
		</div>
	);
};
