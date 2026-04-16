# 代码规范说明

本项目使用 **ESLint + Prettier** 统一代码质量与格式，目标是让代码风格一致、结构清晰、便于维护。

## 1. 基础格式规范

- 缩进统一使用 **4 个空格**
- 字符串统一使用 **单引号**
- 语句结尾统一保留 **分号**
- 建议一行代码长度尽量控制在 **100** 字符以内
- Markdown 保留必要的空行，避免无意义格式噪音

对应配置文件：

- `.editorconfig`
- `.prettierrc.json`
- `eslint.config.js`

## 2. 代码质量要求

- **禁止保留未使用变量**
- 提交前至少执行一次 `npm run lint`
- 修改完成后建议执行一次 `npm run build`
- 能复用的逻辑优先抽离，避免重复代码

当前 ESLint 会重点检查：

- 未使用变量
- React Hooks 使用规范
- React Refresh 兼容性相关问题

## 3. 导入规范

- 优先使用 `@` 路径别名引用 `src` 下的模块
- 避免过深的相对路径，例如 `../../../`

推荐写法：

```js
import Navbar from '@/components/Navbar.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { assetUrl } from '@/lib/paths.js';
```

## 4. React 编码约定

- 页面级组件放在 `src/pages`
- 通用组件放在 `src/components`
- 上下文状态放在 `src/context`
- 工具函数与业务辅助逻辑放在 `src/lib`
- 样式文件放在 `src/styles`

另外建议：

- 组件名使用 **大驼峰** 命名
- 普通函数、变量使用 **小驼峰** 命名
- 上下文相关能力优先通过 `Provider + Hook` 暴露
- 复杂逻辑前可以补充**简短中文注释**

## 5. 主题与状态相关约定

- 主题状态统一通过 `ThemeContext` 管理
- 需要跨层级共享的数据，优先考虑 Context，而不是逐层传 props
- 持久化状态（如主题）统一通过 `localStorage` 管理，并保持键名稳定

## 6. 常用命令

```bash
npm run format
npm run lint
npm run build
```

含义说明：

- `npm run format`：使用 Prettier 统一格式
- `npm run lint`：检查代码规范与潜在问题
- `npm run build`：验证项目是否可正常构建

## 7. 提交前自检

提交代码前建议至少确认以下几点：

1. 代码已按统一格式整理
2. 没有未使用变量和明显警告
3. 功能改动不影响已有正常功能
4. 构建通过
5. 新增文件路径与目录职责清晰

## 8. 规范目标

这份规范不追求“复杂”或“面面俱到”，而是确保项目在学习和迭代过程中保持：

- 风格统一
- 容易阅读
- 便于排查问题
- 方便后续继续重构
