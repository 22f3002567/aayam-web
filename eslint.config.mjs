// import { defineConfig, globalIgnores } from "eslint/config";
// import nextVitals from "eslint-config-next/core-web-vitals";
// import nextTs from "eslint-config-next/typescript";

// const eslintConfig = defineConfig([
//   ...nextVitals,
//   ...nextTs,
//   // Override default ignores of eslint-config-next.
//   globalIgnores([
//     // Default ignores of eslint-config-next:
//     ".next/**",
//     "out/**",
//     "build/**",
//     "next-env.d.ts",
//   ]),
// ]);

// export default eslintConfig;


import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // 1. Next.js Default Rules (Spread the arrays)
  ...nextVitals,
  ...nextTs,

  // 2. Global Ignores (The Cleanup)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "postcss.config.mjs",
      "tailwind.config.ts"
    ],
  },

  // 3. The God Tier Overrides (Silence the Noise)
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      // Allow unused variables (e.g. 'isScrolled')
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // Allow 'any' types (Vital for Supabase JSON)
      "@typescript-eslint/no-explicit-any": "off",

      // Allow unescaped entities
      "react/no-unescaped-entities": "off",

      // Soft warn for deps instead of error
      "react-hooks/exhaustive-deps": "warn",

      // Allow @ts-ignore
      "@typescript-eslint/ban-ts-comment": "off",
      
      // Allow specific Next.js image configurations if needed
      "@next/next/no-img-element": "off"
    },
  },
];

export default eslintConfig;