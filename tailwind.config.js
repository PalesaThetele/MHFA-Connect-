
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        mhfa: {
          primary: "#176B57",
          dark: "#104C40",
          light: "#E5F1EC",
          accent: "#D9A441",
          background: "#F7FAF8",
          surface: "#FFFFFF",
          text: "#20332E",
          muted: "#64756F",
          danger: "#B42318",
          dangerLight: "#FFF1F0",
          success: "#237A52",
          border: "#DCE7E1",
          surfaceSoft: "#F0F6F2",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      borderRadius: {
        mhfa: "1rem",
        button: "10px",
      },

      boxShadow: {
        mhfa: "0 8px 30px rgba(23, 107, 87, 0.08)",
        header: "0 2px 12px rgba(16, 76, 64, 0.12)",
      },

      maxWidth: {
        dashboard: "1200px",
      },

      spacing: {
        "screen-x": "1rem",
        "screen-y": "1.5rem",
      },
    },
  },

  plugins: [],
};
