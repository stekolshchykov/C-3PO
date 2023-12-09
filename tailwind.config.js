/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.{js,ts,jsx,tsx,vue,js,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                white: '#DCD8D8',
                gray: '#313131',
                grayLight: '#494949',
                grayDark: '#262626',
                yellow: '#F8CB5C',
                red: '#F54A2E'
            }
        }
    },
    plugins: [],
}

