import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        shine: "shine 1s linear infinite",
        fadeRight: "fadeRight .3s ease-in-out",
        fadeLeft: "fadeLeft .3s ease-in-out",
        fadeUp: "fadeUp .3s ease-in-out",
      },

      // that is actual animation
      keyframes: {
        shine: {
          "0%": { 
            backgroundImage: "linear-gradient(90deg,transparent 25%,rgb(200 200 200) 50%,transparent 75%,transparent 100%)",
            backgroundSize: "250% 250%,100% 100%",
            backgroundPosition: "-50% 0, 0 0"
          },
          "100%": {
            backgroundImage: "linear-gradient(90deg,transparent 25%,rgb(200 200 200) 50%,transparent 75%,transparent 100%)",
            backgroundSize: "250% 250%,100% 100%",
            backgroundPosition: "140% 0, 0 0"
          },
        },
        fadeLeft: {
          "0%": { transform: "translateX(32px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        fadeRight: {
          "0%": { transform: "translateX(-32px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(32px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value: string) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
} satisfies Config;
