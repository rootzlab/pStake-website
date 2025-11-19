const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-pxtorem": {
      rootValue: 10,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: ["\\.no-rem", "\\.no-px-to-rem", ":root"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
  },
};

export default config;
