import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置开发服务器
  server: {
    port: 3000, // 设置默认端口为 3000
    open: false, // 可选：启动时自动打开浏览器
    strictPort: true, // 可选：如果端口已被占用，则终止启动
  },
});
