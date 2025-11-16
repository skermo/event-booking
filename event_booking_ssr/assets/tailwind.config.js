module.exports = {
  content: ["./js/**/*.js", "../lib/*_web.ex", "../lib/*_web/**/*.*ex", "../lib/*_web.heex", "../lib/*_web/**/*.*.heex"],
  theme: {
    extend: {
      colors: {
        primary: "#FCA311",
        secondary: "#14213d",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
