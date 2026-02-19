import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // When fs.allow is set, Vite disables auto workspace root — include project root so src/ is served
    fs: {
      allow: [
        path.resolve(__dirname),  // Explicitly allow project root (includes src/)
        path.resolve(__dirname, "data"),
      ],
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Serve project root ./data folder at /data for chatbot real data (dev only)
    {
      name: "serve-data",
      configureServer(server) {
        const dataDir = path.resolve(__dirname, "data");
        server.middlewares.use("/data", (req, res, next) => {
          const raw = (req.url || "").replace(/\?.*$/, "");
          const safe = path.normalize(decodeURIComponent(raw)).replace(/^(\.\.(\/|\\))+/g, "");
          const filePath = path.join(dataDir, safe);
          if (!filePath.startsWith(dataDir) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            return next();
          }
          res.setHeader("Content-Type", filePath.endsWith(".csv") ? "text/csv; charset=utf-8" : "text/plain; charset=utf-8");
          res.end(fs.readFileSync(filePath, "utf-8"));
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
