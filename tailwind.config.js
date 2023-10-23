/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundSize: {
      full: '100%'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'create-profile': "url('/images/bg-create-profile.png')",
        'signup': "url('/images/bg-signup.png')",
        'login': "url('/images/bg-login.png')",
        'password': "url('/images/bg-password.png')",
        'verified': "url('/images/bg-verify.png')",
      },
      colors: {
        primary: '#232E60',
        success: "#00CCBB",
        secondary: '#FFDE59',
        lightgreen: "#00CCBB14",
        pinky: '#FF67C4',
        grey: '#F9F9F9',
        'grey-100': '#868686',
        'grey-200': '#E0DEDE',
        'grey-300': '#D9D9D9',
        "white-smoke": "#FAFAFA",
      },
      fontFamily: {
        publicSans: '"Public Sans", sans-serif'
      },
      spacing: {
        5.5: '22px',
        90: '360px',
        100: '400px',
        106: '424px',
        125: '500px'
      }
    },
  },
  plugins: [],
}
