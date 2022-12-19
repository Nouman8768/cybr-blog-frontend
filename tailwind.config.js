/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#f7fa00",
        border: "#d9d9d9",
        white: "#ffffff",
        black: "#000000",
      },
      boxShadow: {
        primary: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        card: "1px 5px 14px rgba(23, 39, 46, 0.12)",
        table: "1px 5px 14px rgba(23, 39, 46, 0.12)",
      },
    },
    screens: {
      xxsm: "380px",
      xsm: "540px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      llg: "1155px",

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
};
