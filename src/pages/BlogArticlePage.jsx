import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.min.css';
import { loadArticleMarkdown } from '../lib/loadArticleMarkdown.js';
import '../styles/blogArticle.css';

export default function BlogArticlePage() {
    const { slug: file } = useParams();
    const [html, setHtml] = useState('');
    const [status, setStatus] = useState('loading');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        let cancelled = false;

        marked.setOptions({
            highlight(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: false,
            gfm: true,
        });

        const run = async () => {
            setStatus('loading');
            setHtml('');
            setErrorMsg('');
            try {
                const md = await loadArticleMarkdown(file);
                if (cancelled) return;
                const out = marked.parse(md);
                setHtml(out);
                setStatus('ok');
                const parser = new DOMParser();
                const doc = parser.parseFromString(out, 'text/html');
                const h1 = doc.querySelector('h1');
                if (h1?.textContent) {
                    document.title = `${h1.textContent} - 阳光小站`;
                }
            } catch (e) {
                if (cancelled) return;
                setStatus('error');
                setErrorMsg(e.message || '加载失败');
                document.title = '文章阅读 - 阳光小站';
            }
        };

        run();
        return () => {
            cancelled = true;
            document.title = '阳光小站';
        };
    }, [file]);

    return (
        <main className="main-content">
            <div className="blog-container">
                <Link to="/" className="blog-back-link">
                    <i className="fas fa-arrow-left" /> 返回首页
                </Link>
                <div className="blog-card">
                    {status === 'loading' && (
                        <div className="blog-loading">
                            <i className="fas fa-spinner" />
                            <span>正在加载文章...</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="blog-error">
                            <i className="fas fa-exclamation-circle" />
                            <p>{errorMsg}</p>
                            <Link to="/" className="btn-read-more">
                                <i className="fas fa-home" /> 返回首页
                            </Link>
                        </div>
                    )}
                    {status === 'ok' && (
                        <div
                            className="blog-article"
                            // 内容由受控 Markdown 生成，来源为本地静态文件
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
