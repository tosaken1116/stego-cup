import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundSize: {
				"size-200": "200% 200%",
			},
			backgroundPosition: {
				"pos-0": "0% 0%",
				"pos-20": "20% 20%",
				"pos-30": "30% 30%",
				"pos-40": "40% 40%",
				"pos-50": "50% 50%",
				"pos-60": "60% 60%",
				"pos-80": "80% 80%",
				"pos-100": "100% 100%",
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-out": {
					"0%": { opacity: "1", scale: "1" },
					"20%": { opacity: "1", scale: "0.7" },
					"100%": { opacity: "0", scale: "2" },
				},
				"fade-in": {
					"0%": { opacity: "0", scale: "2" },
					"40%": { opacity: "1", scale: "0.7" },
					"100%": { opacity: "1", scale: "1" },
				},
				"fall-out": {
					"0%": { opacity: "1", translate: "0 0", rotate: "0" },
					"100%": { opacity: "0", translate: "0 200px", rotate: "180deg" },
				},
				shake: {
					"0%": { transform: "translateX(0)" },
					"10%": { transform: "translateX(-10px)" },
					"20%": { transform: "translateX(10px)" },
					"30%": { transform: "translateX(-10px)" },
					"40%": { transform: "translateX(10px)" },
					"50%": { transform: "translateX(-10px)" },
					"60%": { transform: "translateX(10px)" },
					"70%": { transform: "translateX(-10px)" },
					"80%": { transform: "translateX(10px)" },
					"90%": { transform: "translateX(-10px)" },
					"100%": { transform: "translateX(0)" },
				},
				recover: {
					"0%": {
						transform: "scale(0.8)",
						opacity: "0.5",
						filter: "blur(2px)",
					},
					"25%": { transform: "scale(1.1)", opacity: "1", filter: "blur(0px)" },
					"50%": { transform: "scale(1)", opacity: "1", filter: "blur(2px)" },
					"75%": { transform: "scale(1.1)", opacity: "1", filter: "blur(0px)" },
					"100%": { transform: "scale(1)", opacity: "1", filter: "blur(2px)" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(40px)" },
					"50%": { opacity: "1", transform: "translateY(0px)" },
					"100%": { opacity: "0", transform: "translateY(-40px)" },
				},
				expand: {
					from: { scale: "0" },
					to: { scale: "1" },
				},
				"jump-up": {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
					"100%": { transform: "translateY(0)" },
				},
				"slide-in-tr": {
					"0%": {
						transform: "translateY(-1000px) translateX(1000px)",
						opacity: "0",
					},
					to: {
						transform: "translateY(0) translateX(0)",
						opacity: "1",
					},
				},
				"slide-out-tr": {
					"0%": {
						transform: "translateY(0) translateX(0)",
						opacity: "1",
					},
					to: {
						transform: "translateY(-1000px) translateX(1000px)",
						opacity: "0",
					},
				},
				"puff-out-hor": {
					"0%": {
						transform: "scaleX(1)",
						filter: "blur(0)",
						opacity: "1",
					},
					to: {
						transform: "scaleX(2)",
						filter: "blur(2px)",
						opacity: "0",
					},
				},
				"slide-in": {
					from: {
						transform: "translateX(100%)",
						opacity: "0",
					},
					to: {
						transform: "translateX(0)",
						opacity: "1",
					},
				},
			},
			transitionDelay: {
				"1500": "1500ms",
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-out": "fade-out 1s ease-out forwards",
				"fade-in": "fade-in 0.3s ease-out backwards",
				"fall-out": "fall-out 1s ease-out forwards",
				shake: "shake 0.5s",
				recover: "recover 2s ease-in-out infinite",
				"fade-in-up": "fade-in-up 1s ease-out forwards",
				expand: "expand 0.3s ease-out",
				"jump-up": "jump-up 1s ease-out infinite",
				"slide-in-tr":
					"slide-in-tr 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)",
				"slide-out-tr":
					"slide-out-tr 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)",
				"puff-out-hor":
					"puff-out-hor 0.9s cubic-bezier(0.165, 0.840, 0.440, 1.000)   both",
				"slide-in": "slide-in 0.5s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					"text-stroke": (value) => ({
						"-webkit-text-stroke-width": value,
						"text-stroke-width": value,
					}),
				},
				{
					type: "length",
					values: {
						px: "1px",
					},
				},
			);
			matchUtilities(
				{
					"text-stroke": (value) => ({
						"-webkit-text-stroke-color": value,
						"text-stroke-color": value,
					}),
				},
				{
					type: "color",
					values: theme("colors"),
				},
			);
			matchUtilities(
				{
					"font-style-oblique": (value) => ({
						"font-style": `oblique ${value}`,
					}),
				},
				{
					type: "length",
					values: {
						"10": "10deg",
						"30": "30deg",
						"45": "45deg",
						"60": "60deg",
						"90": "90deg",
					},
				},
			);
		}),
	],
} satisfies Config;

export default config;
