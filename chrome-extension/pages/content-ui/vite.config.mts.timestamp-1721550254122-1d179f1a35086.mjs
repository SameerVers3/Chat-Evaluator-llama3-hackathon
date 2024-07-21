// vite.config.mts
import { defineConfig } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.11_terser@5.31.3/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@5.3.3_@types+node@20.14.11_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import { makeEntryPointPlugin, watchRebuildPlugin } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension/packages/hmr/dist/index.js";
var __vite_injected_original_dirname = "E:\\Chat-Evaluator-llama3-hackathon\\chrome-extension\\pages\\content-ui";
var rootDir = resolve(__vite_injected_original_dirname);
var srcDir = resolve(rootDir, "src");
var isDev = process.env.__DEV__ === "true";
var isProduction = !isDev;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": srcDir
    }
  },
  base: "",
  plugins: [react(), isDev && watchRebuildPlugin({ refresh: true }), isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, "public"),
  build: {
    lib: {
      entry: resolve(srcDir, "index.tsx"),
      name: "contentUI",
      formats: ["iife"],
      fileName: "index"
    },
    outDir: resolve(rootDir, "..", "..", "dist", "content-ui"),
    emptyOutDir: true,
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      external: ["chrome"]
    }
  },
  define: {
    "process.env.NODE_ENV": isDev ? `"development"` : `"production"`
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvblxcXFxjaHJvbWUtZXh0ZW5zaW9uXFxcXHBhZ2VzXFxcXGNvbnRlbnQtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENoYXQtRXZhbHVhdG9yLWxsYW1hMy1oYWNrYXRob25cXFxcY2hyb21lLWV4dGVuc2lvblxcXFxwYWdlc1xcXFxjb250ZW50LXVpXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvbi9jaHJvbWUtZXh0ZW5zaW9uL3BhZ2VzL2NvbnRlbnQtdWkvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IG1ha2VFbnRyeVBvaW50UGx1Z2luLCB3YXRjaFJlYnVpbGRQbHVnaW4gfSBmcm9tICdAY2hyb21lLWV4dGVuc2lvbi1ib2lsZXJwbGF0ZS9obXInO1xyXG5pbXBvcnQgKiBhcyBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5cclxuY29uc3Qgcm9vdERpciA9IHJlc29sdmUoX19kaXJuYW1lKTtcclxuY29uc3Qgc3JjRGlyID0gcmVzb2x2ZShyb290RGlyLCAnc3JjJyk7XHJcblxyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJztcclxuY29uc3QgaXNQcm9kdWN0aW9uID0gIWlzRGV2O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQHNyYyc6IHNyY0RpcixcclxuICAgIH0sXHJcbiAgfSxcclxuICBiYXNlOiAnJyxcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgaXNEZXYgJiYgd2F0Y2hSZWJ1aWxkUGx1Z2luKHsgcmVmcmVzaDogdHJ1ZSB9KSwgaXNEZXYgJiYgbWFrZUVudHJ5UG9pbnRQbHVnaW4oKV0sXHJcbiAgcHVibGljRGlyOiByZXNvbHZlKHJvb3REaXIsICdwdWJsaWMnKSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKHNyY0RpciwgJ2luZGV4LnRzeCcpLFxyXG4gICAgICBuYW1lOiAnY29udGVudFVJJyxcclxuICAgICAgZm9ybWF0czogWydpaWZlJ10sXHJcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxyXG4gICAgfSxcclxuICAgIG91dERpcjogcmVzb2x2ZShyb290RGlyLCAnLi4nLCAnLi4nLCAnZGlzdCcsICdjb250ZW50LXVpJyksXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogaXNEZXYsXHJcbiAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbixcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBpc1Byb2R1Y3Rpb24sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ2Nocm9tZSddLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGRlZmluZToge1xyXG4gICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogaXNEZXYgPyBgXCJkZXZlbG9wbWVudFwiYCA6IGBcInByb2R1Y3Rpb25cImAsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFksU0FBUyxvQkFBb0I7QUFDdmEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixTQUFTLHNCQUFzQiwwQkFBMEI7QUFIekQsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxVQUFVLFFBQVEsZ0NBQVM7QUFDakMsSUFBTSxTQUFTLFFBQVEsU0FBUyxLQUFLO0FBRXJDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUN0QyxJQUFNLGVBQWUsQ0FBQztBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxtQkFBbUIsRUFBRSxTQUFTLEtBQUssQ0FBQyxHQUFHLFNBQVMscUJBQXFCLENBQUM7QUFBQSxFQUNsRyxXQUFXLFFBQVEsU0FBUyxRQUFRO0FBQUEsRUFDcEMsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLFFBQVEsV0FBVztBQUFBLE1BQ2xDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNO0FBQUEsTUFDaEIsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFFBQVEsUUFBUSxTQUFTLE1BQU0sTUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN6RCxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0QixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsUUFBUTtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sd0JBQXdCLFFBQVEsa0JBQWtCO0FBQUEsRUFDcEQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
