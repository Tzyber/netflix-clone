/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#05070f",
                panel: "#0a0e1c",
                hairline: "rgba(140, 155, 220, 0.14)",
                ink: {
                    DEFAULT: "#eaecf6",
                    dim: "#a8aec7",
                },
                signal: "#7c8cff",
                aurora: {
                    teal: "#4fd6c4",
                    pink: "#ff5c9a",
                },
            },
            fontFamily: {
                display: ['"Space Grotesk"', "system-ui", "sans-serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ['"Space Mono"', "ui-monospace", "monospace"],
            },
        },
    },
    plugins: [],
}
