import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 静态资源与路由前缀。
 * - 本地开发：保持 `/`
 * - GitHub Pages「项目站」：一般为 `/<仓库名>/`，构建前设置环境变量 VITE_BASE_PATH（须以 / 开头，建议以 / 结尾）
 */
const raw = process.env.VITE_BASE_PATH?.trim();
const base =
    raw && raw !== '/'
        ? raw.endsWith('/')
            ? raw
            : `${raw}/`
        : '/';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base,
});
