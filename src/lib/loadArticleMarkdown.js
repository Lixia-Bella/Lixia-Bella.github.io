/**
 * 加载单篇 Markdown：优先 .md，否则执行原 .js 包装脚本读取 __BLOG_MD__
 */
import { assetUrl } from '@/lib/paths.js';

export async function loadArticleMarkdown(file) {
    if (!file || !/^[\w-]+$/.test(file)) {
        throw new Error('无效的文章名称');
    }

    const mdRes = await fetch(assetUrl(`blogs/${file}.md`));
    if (mdRes.ok) {
        return mdRes.text();
    }

    const jsRes = await fetch(assetUrl(`blogs/${file}.js`));
    if (!jsRes.ok) {
        throw new Error('文章加载失败，请检查文件是否存在');
    }
    const text = await jsRes.text();

    return new Promise((resolve, reject) => {
        const blob = new Blob([text], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const s = document.createElement('script');
        s.src = url;
        s.onload = () => {
            const md = window.__BLOG_MD__;
            delete window.__BLOG_MD__;
            URL.revokeObjectURL(url);
            s.remove();
            if (md) resolve(md);
            else reject(new Error('文章数据为空'));
        };
        s.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('文章脚本执行失败'));
        };
        document.head.appendChild(s);
    });
}
