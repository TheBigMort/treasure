module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    important: '#root',
    theme: {
        letterSpacing: {
            tight: '-.015em',
        },
        extend: {
            height: {
                'half-screen': '50vh',
            },
        },
    },
    plugins: [],
};
