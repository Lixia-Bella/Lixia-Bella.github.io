/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * 主题上下文默认值。
 * 当前任务只要求先提供基础的 theme 与 toggleTheme 能力，
 * 默认主题固定为 light，后续再按需要接入全局页面逻辑。
 */
const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

const THEME_STORAGE_KEY = 'theme';

const getStoredTheme = () => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getStoredTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            // 本地存储不可用时保持页面可切换，不中断渲染
        }
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;
