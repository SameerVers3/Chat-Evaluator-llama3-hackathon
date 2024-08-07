// vite.config.mts
import { defineConfig } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.11_terser@5.31.3/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import { makeEntryPointPlugin, watchRebuildPlugin } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension/packages/hmr/dist/index.js";
var __vite_injected_original_dirname = "E:\\Chat-Evaluator-llama3-hackathon\\chrome-extension\\pages\\content";
var rootDir = resolve(__vite_injected_original_dirname);
var libDir = resolve(rootDir, "lib");
var isDev = process.env.__DEV__ === "true";
var isProduction = !isDev;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@lib": libDir
    }
  },
  plugins: [isDev && watchRebuildPlugin({ refresh: true }), isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, "public"),
  build: {
    lib: {
      formats: ["iife"],
      entry: resolve(__vite_injected_original_dirname, "lib/index.ts"),
      name: "ContentScript",
      fileName: "index"
    },
    outDir: resolve(rootDir, "..", "..", "dist", "content"),
    emptyOutDir: true,
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvblxcXFxjaHJvbWUtZXh0ZW5zaW9uXFxcXHBhZ2VzXFxcXGNvbnRlbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENoYXQtRXZhbHVhdG9yLWxsYW1hMy1oYWNrYXRob25cXFxcY2hyb21lLWV4dGVuc2lvblxcXFxwYWdlc1xcXFxjb250ZW50XFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvbi9jaHJvbWUtZXh0ZW5zaW9uL3BhZ2VzL2NvbnRlbnQvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgbWFrZUVudHJ5UG9pbnRQbHVnaW4sIHdhdGNoUmVidWlsZFBsdWdpbiB9IGZyb20gJ0BjaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlL2htcic7XHJcblxyXG5jb25zdCByb290RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUpO1xyXG5jb25zdCBsaWJEaXIgPSByZXNvbHZlKHJvb3REaXIsICdsaWInKTtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gJ3RydWUnO1xyXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSAhaXNEZXY7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAbGliJzogbGliRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtpc0RldiAmJiB3YXRjaFJlYnVpbGRQbHVnaW4oeyByZWZyZXNoOiB0cnVlIH0pLCBpc0RldiAmJiBtYWtlRW50cnlQb2ludFBsdWdpbigpXSxcclxuICBwdWJsaWNEaXI6IHJlc29sdmUocm9vdERpciwgJ3B1YmxpYycpLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZm9ybWF0czogWydpaWZlJ10sXHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ2xpYi9pbmRleC50cycpLFxyXG4gICAgICBuYW1lOiAnQ29udGVudFNjcmlwdCcsXHJcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxyXG4gICAgfSxcclxuICAgIG91dERpcjogcmVzb2x2ZShyb290RGlyLCAnLi4nLCAnLi4nLCAnZGlzdCcsICdjb250ZW50JyksXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogaXNEZXYsXHJcbiAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbixcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBpc1Byb2R1Y3Rpb24sXHJcbiAgICBtb2R1bGVQcmVsb2FkOiB0cnVlLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWydjaHJvbWUnXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IGlzRGV2ID8gYFwiZGV2ZWxvcG1lbnRcImAgOiBgXCJwcm9kdWN0aW9uXCJgLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlZLFNBQVMsb0JBQW9CO0FBQzlaLFNBQVMsZUFBZTtBQUN4QixTQUFTLHNCQUFzQiwwQkFBMEI7QUFGekQsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTSxVQUFVLFFBQVEsZ0NBQVM7QUFDakMsSUFBTSxTQUFTLFFBQVEsU0FBUyxLQUFLO0FBRXJDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUN0QyxJQUFNLGVBQWUsQ0FBQztBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxTQUFTLG1CQUFtQixFQUFFLFNBQVMsS0FBSyxDQUFDLEdBQUcsU0FBUyxxQkFBcUIsQ0FBQztBQUFBLEVBQ3pGLFdBQVcsUUFBUSxTQUFTLFFBQVE7QUFBQSxFQUNwQyxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxTQUFTLENBQUMsTUFBTTtBQUFBLE1BQ2hCLE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFFBQVEsUUFBUSxTQUFTLE1BQU0sTUFBTSxRQUFRLFNBQVM7QUFBQSxJQUN0RCxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0QixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsUUFBUTtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sd0JBQXdCLFFBQVEsa0JBQWtCO0FBQUEsRUFDcEQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
