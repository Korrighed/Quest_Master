import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
  
    return defineConfig({
        base: env.VITE_BASE || "/",
        build: {
            watch: {
                exclude: ["dist/**"],
            },
        },
    });
};