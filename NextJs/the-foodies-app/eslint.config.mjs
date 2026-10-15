import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-custom/next";

const eslintConfig = defineConfig([...nextConfig]);

export default eslintConfig;
