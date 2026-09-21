import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F4", // warm white
        stone: "#EDE9E1", // light gray-warm
        ink: "#1E1C19", // near-black charcoal
        char: "#3A3733", // secondary charcoal
        brass: "#A9835A", // restrained gold accent — used sparingly
        line: "#DDD7CC",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
