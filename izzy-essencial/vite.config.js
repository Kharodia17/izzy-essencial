import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Lazy imports via React.lazy already auto-split each page into its own chunk.
    // Raise the warning threshold so the vendor chunk warning doesn't clutter output.
    chunkSizeWarningLimit: 600,
  },
});
