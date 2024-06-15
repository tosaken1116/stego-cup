export const withSound = (Component: React.ComponentType, fileName: string) => {
	return () => {
		const audio = new Audio(`audio/${fileName}`);
		const play = () => {
			audio.play();
		};
		return (
			<button type="button" onClick={play}>
				<Component />
			</button>
		);
	};
};
