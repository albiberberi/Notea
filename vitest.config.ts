import { defineConfig, configDefaults } from "vitest/config";
import react from '@vitejs/plugin-react'

export default defineConfig({

    plugins: [react()],
    test: {
        exclude: [...configDefaults.exclude, "e2e/**"], // Exclude e2e tests from unit test runs
        environment: "jsdom", //this is for simulating a browser env
        globals: true, //that we can use global test funct. without importing them
        setupFiles: "./src/test/setup.ts", 
    }

    
});
