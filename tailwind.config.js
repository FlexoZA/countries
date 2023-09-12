/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      customUtilities: {
        "success-notification":
          "fixed top-4 right-4 bg-white shadow-md p-4 max-w-sm min-w-[250px] border-b-4 border-green-500",
      },
    },
  },
  plugins: [],
};
