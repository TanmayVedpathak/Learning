import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-tanmay/next";

const eslintConfig = defineConfig([...nextConfig]);

export default eslintConfig;
