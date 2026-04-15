/** 静态资源在 public 下，拼接 Vite BASE_URL */
export const assetUrl = (path) => {
    const base = import.meta.env.BASE_URL || '/';
    const p = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${p}`;
};
