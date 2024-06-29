/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'custom-bg': "url('./assets/nacho_background.jpg')",
                'custom-bg-mobile': "url('./assets/hero-cat-mobile.png')",
            },
        },
    },
    plugins: [],
}
