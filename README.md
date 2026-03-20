# AI_Coding_Blog_Learning

> 一个由 AI 编程驱动的全栈博客项目实训 —— 在 3 个月内，每天 1.5-2 小时，通过 AI 辅助完成一个完整的 Blog 项目。
>
> 代码示例可在 [https://Bella-bella.github.io/](https://Bella-bella.github.io/) 这里查看网页结果。使用 github Pages 发布到网页。
>
> IDE：Cursor
>
> 模型：glm-5（阿里百炼，时不时就连不上），Opus 4.6（目前来说一直挺顺畅的）

## 项目简介

本项目是一个**AI 编程实训项目**，核心理念是：**除了必须人工干预的决策环节外，所有代码均由 AI 编程完成**。通过 3 个月的系统学习与实践，掌握 AI 辅助编程的工作流程，培养与 AI 协作开发的能力。

### 项目特点

- **AI 驱动开发**：代码编写、调试、优化主要由 AI 完成
- **人工决策主导**：需求分析、架构设计、技术选型由人工把控
- **渐进式学习**：从基础到进阶，循序渐进掌握全栈开发
- **实战导向**：以真实项目为载体，边学边做

## 学习计划

项目为期 **12 周（3 个月）**，每天投入 **1.5-2 小时**，学习路径如下：

| 周次     | 主题                        | 核心内容                                |
| -------- | --------------------------- | --------------------------------------- |
| 第 1 周  | 前端核心 + AI 工具入门      | HTML/CSS/ES6+ 基础、AI 编程工具使用     |
| 第 2 周  | React 全家桶 + 基础工程化   | React、Redux、Webpack/Vite、组件开发    |
| 第 3 周  | Node.js 后端 + 数据库入门   | Express/Koa、MongoDB/MySQL、RESTful API |
| 第 4 周  | 全栈链路打通 + 基础部署     | 前后端联调、Docker、云服务器部署        |
| 第 5 周  | Next.js 全栈框架 + 性能优化 | SSR/SSG、SEO、性能优化策略              |
| 第 6 周  | Node.js 后端进阶 + 性能调优 | 缓存、消息队列、数据库优化              |
| 第 7 周  | 云原生 + 微服务基础         | Kubernetes、微服务架构、服务治理        |
| 第 8 周  | 全栈项目加固 + 版本迭代     | 测试、CI/CD、代码质量、迭代优化         |
| 第 9 周  | LLM 应用开发 + AI 博客助手  | OpenAI API、LangChain、AI 功能集成      |
| 第 10 周 | RAG 进阶 + AI 业务落地      | 向量数据库、RAG 架构、AI 应用场景       |
| 第 11 周 | 技术沉淀 + 开源项目搭建     | 文档编写、开源贡献、个人品牌建设        |
| 第 12 周 | 总结 + 长期规划             | 项目复盘、技术总结、职业规划            |

详细的学习资料位于 `docs/` 目录。

## 项目结构

```
AI_Coding_Blog_Learning/
├── blog/                    # 博客项目源码
│   ├── frontend/           # 前端代码
│   ├── backend/            # 后端代码
│   └── ...
├── docs/                    # 学习资料与文档
│   ├── 第 1 周：前端核心（HTML:CSS:ES6+）+ AI 工具入门.xlsx
│   ├── 第 2 周：React 全家桶 + 基础工程化.xlsx
│   └── ...
├── .vscode/                 # VS Code 配置
│   ├── settings.json       # 编辑器设置
│   ├── extensions.json     # 推荐扩展
│   └── launch.json         # 调试配置
├── .editorconfig            # 跨编辑器配置
├── .gitignore              # Git 忽略规则
├── .gitattributes          # Git 换行符配置
├── AI_Coding.md            # 项目配置指南
└── README.md               # 项目说明文档
```

## 技术栈

### 前端

- **框架**: React 18 / Next.js
- **状态管理**: Redux Toolkit / Zustand
- **样式方案**: Tailwind CSS / CSS Modules
- **构建工具**: Vite / Next.js 内置

### 后端

- **运行时**: Node.js
- **框架**: Express / Koa / Next.js API Routes
- **数据库**: MongoDB / PostgreSQL
- **缓存**: Redis
- **消息队列**: RabbitMQ / Kafka

### AI 相关

- **LLM API**: OpenAI / Claude / 国产大模型
- **AI 编程工具**: Cursor / GitHub Copilot
- **AI 应用框架**: LangChain / LlamaIndex

### DevOps

- **容器化**: Docker / Docker Compose
- **CI/CD**: GitHub Actions
- **云服务**: 阿里云 / 腾讯云 / Vercel

## 开发指南

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x（推荐）或 npm >= 9.x
- Git >= 2.x
- VS Code（推荐）

### 快速开始

1. **克隆项目**

```bash
 git clone <repository-url>
 cd AI_Coding_Blog_Learning
```

2. **安装推荐扩展**
   打开 VS Code 后，会自动提示安装推荐扩展，包括：

- Prettier - 代码格式化
- ESLint - 代码检查
- EditorConfig - 编辑器配置
- Code Spell Checker - 拼写检查

3. **开始开发**
   详细配置说明请参考 [AI_Coding.md](./AI_Coding.md)

### AI 编程工作流

本项目的核心理念是 **AI 辅助编程**，推荐的工作流程：

```
┌─────────────────────────────────────────────────────────────┐
│                      AI 编程工作流                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ 需求分析  │───▶│ 架构设计  │───▶│ 技术选型  │              │
│  │ (人工)    │    │ (人工+AI) │    │ (人工+AI) │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│                                        │                    │
│                                        ▼                    │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ 测试验证  │◀───│ 代码审查  │◀───│ 代码编写  │              │
│  │ (人工+AI) │    │ (人工+AI) │    │ (AI主导)  │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│        │                                                   │
│        ▼                                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ 部署上线  │───▶│ 监控运维  │───▶│ 迭代优化  │              │
│  │ (AI辅助)  │    │ (AI辅助)  │    │ (循环)    │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**关键原则：**

| 环节     | 主导方    | 说明                          |
| -------- | --------- | ----------------------------- |
| 需求分析 | 人工      | 明确做什么，AI 辅助梳理       |
| 架构设计 | 人工 + AI | 把控整体架构，AI 提供建议     |
| 技术选型 | 人工 + AI | 根据团队和场景决策            |
| 代码编写 | AI 主导   | 人工审查和调整                |
| 代码审查 | 人工 + AI | 确保代码质量和安全性          |
| 测试验证 | 人工 + AI | 编写测试用例，AI 生成测试代码 |
| 部署运维 | AI 辅助   | 配置脚本、监控告警            |

## 学习资源

### 官方文档

- [React 文档](https://react.dev/)
- [Next.js 文档](https://nextjs.org/docs)
- [Node.js 文档](https://nodejs.org/docs)
- [MongoDB 文档](https://www.mongodb.com/docs/)

### AI 编程工具

- [Cursor 编辑器](https://cursor.sh/)
- [GitHub Copilot](https://github.com/features/copilot)
- [OpenAI API 文档](https://platform.openai.com/docs)

### 推荐阅读

- [LangChain 文档](https://python.langchain.com/docs/)
- [Docker 官方文档](https://docs.docker.com/)

## 项目进度

- 项目初始化与配置
- 开发环境搭建
- 第 1 周：前端核心 + AI 工具入门
- 第 2 周：React 全家桶 + 基础工程化
- 第 3 周：Node.js 后端 + 数据库入门
- 第 4 周：全栈链路打通 + 基础部署
- 第 5 周：Next.js 全栈框架 + 性能优化
- 第 6 周：Node.js 后端进阶 + 性能调优
- 第 7 周：云原生 + 微服务基础
- 第 8 周：全栈项目加固 + 版本迭代
- 第 9 周：LLM 应用开发 + AI 博客助手
- 第 10 周：RAG 进阶 + AI 业务落地
- 第 11 周：技术沉淀 + 开源项目搭建
- 第 12 周：总结 + 长期规划

## 贡献指南

本项目为个人学习项目，暂不接受外部贡献。但欢迎提出建议和讨论。

## 许可证

MIT License

---

**开始时间**：2026 年 3 月

**预计完成**：2026 年 6 月

> 💡 本项目由 AI 编程驱动完成，旨在探索人机协作的软件开发新模式。
