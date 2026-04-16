import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.jsx';
import '@/styles/style.css';
import { restoreTheme } from '@/lib/siteUtils.js';
import { ThemeProvider } from '@/context/ThemeContext.jsx';

restoreTheme();

// 与 vite.config base 一致；根路径部署时 BASE_URL 为 "/"，不设 basename
const baseUrl = import.meta.env.BASE_URL;
const routerBasename = baseUrl.length > 1 ? baseUrl.replace(/\/$/, '') : undefined;

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <BrowserRouter basename={routerBasename}>
            <App />
        </BrowserRouter>
    </ThemeProvider>
);
