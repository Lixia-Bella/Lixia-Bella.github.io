import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

/**
 * 静态资源与路由前缀。
 * - 本地开发：保持 `/`
 * - GitHub Pages「项目站」：一般为 `/<仓库名>/`，构建前设置环境变量 VITE_BASE_PATH（须以 / 开头，建议以 / 结尾）
 */
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, rootDir, '');
    const raw = env.VITE_BASE_PATH?.trim();
    const base = raw && raw !== '/' ? (raw.endsWith('/') ? raw : `${raw}/`) : '/';

    return {
        plugins: [react()],
        base,
        optimizeDeps: {
            entries: ['index.html'],
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
