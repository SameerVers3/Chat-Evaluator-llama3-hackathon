// vite.config.mts
import { defineConfig } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension-boilerplate-react-vite/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_sass@1.77.6_terser@5.31.1/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension-boilerplate-react-vite/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@5.3.3_@types+node@20.14.10_sass@1.77.6_terser@5.31.1_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import { watchRebuildPlugin } from "file:///E:/Chat-Evaluator-llama3-hackathon/chrome-extension-boilerplate-react-vite/packages/hmr/dist/index.js";
var __vite_injected_original_dirname = "E:\\Chat-Evaluator-llama3-hackathon\\chrome-extension-boilerplate-react-vite\\pages\\popup";
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
  plugins: [react(), isDev && watchRebuildPlugin({ refresh: true })],
  publicDir: resolve(rootDir, "public"),
  build: {
    outDir: resolve(rootDir, "..", "..", "dist", "popup"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvblxcXFxjaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlLXJlYWN0LXZpdGVcXFxccGFnZXNcXFxccG9wdXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENoYXQtRXZhbHVhdG9yLWxsYW1hMy1oYWNrYXRob25cXFxcY2hyb21lLWV4dGVuc2lvbi1ib2lsZXJwbGF0ZS1yZWFjdC12aXRlXFxcXHBhZ2VzXFxcXHBvcHVwXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ2hhdC1FdmFsdWF0b3ItbGxhbWEzLWhhY2thdGhvbi9jaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlLXJlYWN0LXZpdGUvcGFnZXMvcG9wdXAvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IHdhdGNoUmVidWlsZFBsdWdpbiB9IGZyb20gJ0BjaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlL2htcic7XHJcblxyXG5jb25zdCByb290RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUpO1xyXG5jb25zdCBzcmNEaXIgPSByZXNvbHZlKHJvb3REaXIsICdzcmMnKTtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gJ3RydWUnO1xyXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSAhaXNEZXY7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAc3JjJzogc3JjRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJhc2U6ICcnLFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBpc0RldiAmJiB3YXRjaFJlYnVpbGRQbHVnaW4oeyByZWZyZXNoOiB0cnVlIH0pXSxcclxuICBwdWJsaWNEaXI6IHJlc29sdmUocm9vdERpciwgJ3B1YmxpYycpLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IHJlc29sdmUocm9vdERpciwgJy4uJywgJy4uJywgJ2Rpc3QnLCAncG9wdXAnKSxcclxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgc291cmNlbWFwOiBpc0RldixcclxuICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uLFxyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGlzUHJvZHVjdGlvbixcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsnY2hyb21lJ10sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBpc0RldiA/IGBcImRldmVsb3BtZW50XCJgIDogYFwicHJvZHVjdGlvblwiYCxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnYyxTQUFTLG9CQUFvQjtBQUM3ZCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsMEJBQTBCO0FBSG5DLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sVUFBVSxRQUFRLGdDQUFTO0FBQ2pDLElBQU0sU0FBUyxRQUFRLFNBQVMsS0FBSztBQUVyQyxJQUFNLFFBQVEsUUFBUSxJQUFJLFlBQVk7QUFDdEMsSUFBTSxlQUFlLENBQUM7QUFFdEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsbUJBQW1CLEVBQUUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQ2pFLFdBQVcsUUFBUSxTQUFTLFFBQVE7QUFBQSxFQUNwQyxPQUFPO0FBQUEsSUFDTCxRQUFRLFFBQVEsU0FBUyxNQUFNLE1BQU0sUUFBUSxPQUFPO0FBQUEsSUFDcEQsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1Isc0JBQXNCO0FBQUEsSUFDdEIsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFFBQVE7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLHdCQUF3QixRQUFRLGtCQUFrQjtBQUFBLEVBQ3BEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
