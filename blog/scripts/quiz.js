/**
 * 知识问答挑战 - 游戏核心逻辑
 * 包含：题库、关卡系统、积分系统、计时器、奖励池
 */

/* ========================================
   题库数据
   ======================================== */
const QUESTION_BANK = [
    // ===== Node.js =====
    {
        category: 'Node.js',
        question: 'Node.js 使用的 JavaScript 引擎是哪个？',
        options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'],
        answer: 1,
        explain: 'Node.js 使用 Google 开发的 V8 引擎来执行 JavaScript 代码。'
    },
    {
        category: 'Node.js',
        question: 'Node.js 中用于读取文件的核心模块是？',
        options: ['http', 'path', 'fs', 'os'],
        answer: 2,
        explain: 'fs（File System）模块提供了文件读写等操作的 API。'
    },
    {
        category: 'Node.js',
        question: 'Node.js 的事件循环（Event Loop）属于什么编程模型？',
        options: ['多线程同步', '单线程异步', '多进程同步', '协程模型'],
        answer: 1,
        explain: 'Node.js 采用单线程异步非阻塞 I/O 模型，通过事件循环处理并发。'
    },
    {
        category: 'Node.js',
        question: 'npm 中 package.json 的 "devDependencies" 字段用于？',
        options: ['生产环境依赖', '开发环境依赖', '可选依赖', '对等依赖'],
        answer: 1,
        explain: 'devDependencies 存放仅在开发阶段需要的依赖包，如测试框架、构建工具等。'
    },
    {
        category: 'Node.js',
        question: '在 Node.js 中，process.env 用于访问什么？',
        options: ['进程 ID', '环境变量', '命令行参数', '内存使用情况'],
        answer: 1,
        explain: 'process.env 返回包含用户环境变量的对象。'
    },
    {
        category: 'Node.js',
        question: 'Express.js 中间件的执行顺序是？',
        options: ['随机执行', '按注册顺序执行', '按优先级执行', '并行执行'],
        answer: 1,
        explain: 'Express 中间件按照 app.use() 注册的顺序依次执行。'
    },
    {
        category: 'Node.js',
        question: 'Node.js 中 Buffer 对象主要用于处理什么数据？',
        options: ['JSON 数据', '二进制数据', 'XML 数据', '文本数据'],
        answer: 1,
        explain: 'Buffer 用于处理二进制数据流，如文件 I/O 和网络通信。'
    },
    {
        category: 'Node.js',
        question: 'Node.js 中 require() 和 import 的主要区别是？',
        options: ['没有区别', 'require 是 CommonJS，import 是 ESM', 'import 更快', 'require 已废弃'],
        answer: 1,
        explain: 'require() 是 CommonJS 模块规范，import 是 ES Modules 规范，两者加载机制不同。'
    },

    // ===== HTML =====
    {
        category: 'HTML',
        question: 'HTML5 中用于定义导航链接的语义化标签是？',
        options: ['<header>', '<nav>', '<aside>', '<section>'],
        answer: 1,
        explain: '<nav> 标签用于定义页面的导航链接区域。'
    },
    {
        category: 'HTML',
        question: 'HTML 中 <meta charset="UTF-8"> 的作用是？',
        options: ['设置页面标题', '声明字符编码', '引入样式表', '定义视口'],
        answer: 1,
        explain: 'charset 属性声明文档使用的字符编码，UTF-8 支持多语言字符。'
    },
    {
        category: 'HTML',
        question: '以下哪个是 HTML5 新增的表单输入类型？',
        options: ['text', 'password', 'email', 'submit'],
        answer: 2,
        explain: 'email 是 HTML5 新增的输入类型，可以自动验证邮箱格式。'
    },
    {
        category: 'HTML',
        question: 'HTML 中 data-* 自定义属性的作用是？',
        options: ['定义样式', '存储自定义数据', '设置事件', '声明变量'],
        answer: 1,
        explain: 'data-* 属性允许在 HTML 元素上存储自定义数据，可通过 JS 的 dataset 访问。'
    },
    {
        category: 'HTML',
        question: '<picture> 标签的主要用途是？',
        options: ['播放视频', '响应式图片', '创建画布', '嵌入音频'],
        answer: 1,
        explain: '<picture> 标签用于为不同设备/屏幕提供不同的图片资源。'
    },
    {
        category: 'HTML',
        question: 'HTML 中 defer 和 async 属性用于哪个标签？',
        options: ['<link>', '<img>', '<script>', '<style>'],
        answer: 2,
        explain: 'defer 和 async 用于 <script> 标签，控制脚本的加载和执行时机。'
    },
    {
        category: 'HTML',
        question: '语义化 HTML 的主要优势不包括？',
        options: ['提升 SEO', '增强可访问性', '提高页面加载速度', '代码可读性更好'],
        answer: 2,
        explain: '语义化 HTML 主要提升 SEO、可访问性和代码可读性，不直接影响加载速度。'
    },

    // ===== CSS =====
    {
        category: 'CSS',
        question: 'CSS Flexbox 中，justify-content 控制的是哪个方向的对齐？',
        options: ['交叉轴', '主轴', '两个轴', '都不是'],
        answer: 1,
        explain: 'justify-content 控制 flex 项目在主轴方向上的对齐方式。'
    },
    {
        category: 'CSS',
        question: 'CSS Grid 中 "fr" 单位表示什么？',
        options: ['固定像素', '可用空间的等份', '百分比', '视口宽度'],
        answer: 1,
        explain: 'fr（fraction）表示可用空间的等份，1fr 表示占据一等份的空间。'
    },
    {
        category: 'CSS',
        question: 'CSS 中 z-index 属性只在什么定位下生效？',
        options: ['static', '非 static 定位', '仅 absolute', '仅 fixed'],
        answer: 1,
        explain: 'z-index 仅在 position 值为 relative、absolute、fixed 或 sticky 时生效。'
    },
    {
        category: 'CSS',
        question: 'CSS 变量（自定义属性）的声明语法是？',
        options: ['$variable: value', '@variable: value', '--variable: value', 'var(variable): value'],
        answer: 2,
        explain: 'CSS 自定义属性使用 -- 前缀声明，如 --main-color: #333，通过 var() 使用。'
    },
    {
        category: 'CSS',
        question: 'CSS 中 BEM 命名规范的全称是？',
        options: ['Block-Element-Modifier', 'Box-Edge-Margin', 'Base-Extend-Mixin', 'Border-Effect-Media'],
        answer: 0,
        explain: 'BEM 代表 Block（块）、Element（元素）、Modifier（修饰符），是一种 CSS 命名方法论。'
    },
    {
        category: 'CSS',
        question: 'CSS 中 clamp() 函数的参数顺序是？',
        options: ['最大值, 首选值, 最小值', '首选值, 最小值, 最大值', '最小值, 首选值, 最大值', '最小值, 最大值, 首选值'],
        answer: 2,
        explain: 'clamp(最小值, 首选值, 最大值) 会将值限制在最小值和最大值之间。'
    },
    {
        category: 'CSS',
        question: 'CSS 选择器优先级最高的是？',
        options: ['class 选择器', 'id 选择器', '标签选择器', '内联样式'],
        answer: 3,
        explain: '优先级从高到低：!important > 内联样式 > id > class > 标签选择器。'
    },

    // ===== Web 开发 =====
    {
        category: 'Web 开发',
        question: 'HTTP 状态码 304 表示什么？',
        options: ['请求成功', '永久重定向', '未修改（使用缓存）', '服务器错误'],
        answer: 2,
        explain: '304 Not Modified 表示资源未修改，客户端可以使用缓存的版本。'
    },
    {
        category: 'Web 开发',
        question: 'RESTful API 中，DELETE 方法用于？',
        options: ['创建资源', '读取资源', '更新资源', '删除资源'],
        answer: 3,
        explain: 'REST 规范中 DELETE 方法用于删除指定的资源。'
    },
    {
        category: 'Web 开发',
        question: 'CORS 的全称是？',
        options: ['Cross-Origin Resource Sharing', 'Client-Origin Request System', 'Cross-Object Rendering Service', 'Cache-Origin Response Standard'],
        answer: 0,
        explain: 'CORS（跨源资源共享）是一种机制，允许服务器声明哪些源可以访问其资源。'
    },
    {
        category: 'Web 开发',
        question: 'JWT（JSON Web Token）由几部分组成？',
        options: ['2 部分', '3 部分', '4 部分', '5 部分'],
        answer: 1,
        explain: 'JWT 由 Header（头部）、Payload（载荷）、Signature（签名）三部分组成。'
    },
    {
        category: 'Web 开发',
        question: 'WebSocket 和 HTTP 的主要区别是？',
        options: ['WebSocket 更安全', 'WebSocket 支持全双工通信', 'HTTP 速度更快', '没有区别'],
        answer: 1,
        explain: 'WebSocket 支持全双工通信，服务器可以主动向客户端推送数据。'
    },
    {
        category: 'Web 开发',
        question: 'localStorage 和 sessionStorage 的区别是？',
        options: ['存储大小不同', 'localStorage 持久化，sessionStorage 会话结束清除', 'API 不同', '安全性不同'],
        answer: 1,
        explain: 'localStorage 数据持久化存储，sessionStorage 数据在页面会话结束时清除。'
    },
    {
        category: 'Web 开发',
        question: 'XSS 攻击的全称是？',
        options: ['Cross-Site Scripting', 'Cross-Server Exchange', 'XML Secure Socket', 'Extended Style Sheet'],
        answer: 0,
        explain: 'XSS（跨站脚本攻击）是一种将恶意脚本注入到网页中的安全漏洞。'
    },

    // ===== 后端服务开发 =====
    {
        category: '后端服务',
        question: 'MongoDB 属于哪种类型的数据库？',
        options: ['关系型数据库', '文档型数据库', '图数据库', '键值数据库'],
        answer: 1,
        explain: 'MongoDB 是文档型 NoSQL 数据库，以 BSON（类 JSON）格式存储数据。'
    },
    {
        category: '后端服务',
        question: 'Redis 最常用的应用场景是？',
        options: ['文件存储', '缓存和会话管理', '视频处理', '日志分析'],
        answer: 1,
        explain: 'Redis 是内存数据库，常用于缓存、会话管理、消息队列等高性能场景。'
    },
    {
        category: '后端服务',
        question: '微服务架构相比单体架构的优势不包括？',
        options: ['独立部署', '技术栈灵活', '开发初期更简单', '故障隔离'],
        answer: 2,
        explain: '微服务在开发初期比单体架构更复杂，需要处理服务间通信、数据一致性等问题。'
    },
    {
        category: '后端服务',
        question: 'Docker 容器和虚拟机的主要区别是？',
        options: ['容器共享宿主机内核', '虚拟机更轻量', '容器不能联网', '没有区别'],
        answer: 0,
        explain: 'Docker 容器共享宿主机内核，比虚拟机更轻量、启动更快。'
    },
    {
        category: '后端服务',
        question: '消息队列（如 RabbitMQ）的主要作用是？',
        options: ['数据存储', '异步解耦和削峰填谷', '用户认证', '日志记录'],
        answer: 1,
        explain: '消息队列用于服务间异步通信、解耦和流量削峰。'
    },
    {
        category: '后端服务',
        question: 'Nginx 最常见的用途是？',
        options: ['数据库管理', '反向代理和负载均衡', '代码编译', '邮件服务'],
        answer: 1,
        explain: 'Nginx 常用作反向代理服务器和负载均衡器，也可作为静态资源服务器。'
    },
    {
        category: '后端服务',
        question: 'gRPC 相比 REST API 的优势是？',
        options: ['更易调试', '使用 Protocol Buffers 序列化更高效', '浏览器原生支持', '不需要定义接口'],
        answer: 1,
        explain: 'gRPC 使用 Protocol Buffers 进行二进制序列化，比 JSON 更高效。'
    },

    // ===== 大模型开发 =====
    {
        category: '大模型',
        question: 'Transformer 架构中的核心机制是？',
        options: ['卷积运算', '自注意力机制', '循环网络', '池化操作'],
        answer: 1,
        explain: 'Transformer 的核心是自注意力（Self-Attention）机制，能捕捉序列中的长距离依赖。'
    },
    {
        category: '大模型',
        question: 'GPT 中的 "T" 代表什么？',
        options: ['Training', 'Transformer', 'Transfer', 'Token'],
        answer: 1,
        explain: 'GPT 全称 Generative Pre-trained Transformer，T 代表 Transformer。'
    },
    {
        category: '大模型',
        question: 'RAG（检索增强生成）的主要目的是？',
        options: ['加速训练', '结合外部知识库减少幻觉', '压缩模型', '数据标注'],
        answer: 1,
        explain: 'RAG 通过检索外部知识库来增强生成质量，减少模型的幻觉问题。'
    },
    {
        category: '大模型',
        question: 'Fine-tuning（微调）和 Prompt Engineering 的区别是？',
        options: ['没有区别', '微调修改模型参数，Prompt 不修改', 'Prompt 更耗时', '微调不需要数据'],
        answer: 1,
        explain: '微调会更新模型参数，而 Prompt Engineering 通过设计输入提示来引导模型输出。'
    },
    {
        category: '大模型',
        question: 'Token 在大语言模型中指的是？',
        options: ['认证令牌', '文本的最小处理单元', '模型参数', '训练轮次'],
        answer: 1,
        explain: 'Token 是模型处理文本的基本单元，一个词可能被拆分为多个 token。'
    },
    {
        category: '大模型',
        question: 'LoRA 微调技术的核心思想是？',
        options: ['全参数更新', '低秩矩阵分解来减少可训练参数', '知识蒸馏', '数据增强'],
        answer: 1,
        explain: 'LoRA 通过低秩矩阵分解，只训练少量参数就能实现高效微调。'
    },
    {
        category: '大模型',
        question: 'LangChain 框架的主要用途是？',
        options: ['图像生成', '构建 LLM 应用的开发框架', '模型训练', '数据清洗'],
        answer: 1,
        explain: 'LangChain 是一个用于构建大语言模型应用的开发框架，提供链式调用等功能。'
    },

    // ===== 算法 =====
    {
        category: '算法',
        question: '快速排序的平均时间复杂度是？',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        answer: 1,
        explain: '快速排序平均时间复杂度为 O(n log n)，最坏情况为 O(n²)。'
    },
    {
        category: '算法',
        question: '二叉搜索树（BST）的查找时间复杂度最优是？',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 1,
        explain: '平衡的 BST 查找时间复杂度为 O(log n)，退化为链表时为 O(n)。'
    },
    {
        category: '算法',
        question: '哈希表解决冲突的常用方法不包括？',
        options: ['链地址法', '开放寻址法', '二分查找法', '再哈希法'],
        answer: 2,
        explain: '哈希冲突常用链地址法、开放寻址法和再哈希法解决，二分查找不用于解决哈希冲突。'
    },
    {
        category: '算法',
        question: '动态规划的核心思想是？',
        options: ['贪心选择', '将问题分解为重叠子问题并记忆化', '穷举所有可能', '随机采样'],
        answer: 1,
        explain: '动态规划通过将问题分解为重叠子问题，利用记忆化避免重复计算。'
    },
    {
        category: '算法',
        question: 'BFS（广度优先搜索）使用的数据结构是？',
        options: ['栈', '队列', '堆', '链表'],
        answer: 1,
        explain: 'BFS 使用队列（FIFO）来逐层遍历图或树的节点。'
    },
    {
        category: '算法',
        question: '归并排序的空间复杂度是？',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explain: '归并排序需要额外的 O(n) 空间来存储合并过程中的临时数组。'
    },
    {
        category: '算法',
        question: 'Dijkstra 算法用于解决什么问题？',
        options: ['最小生成树', '单源最短路径', '拓扑排序', '字符串匹配'],
        answer: 1,
        explain: 'Dijkstra 算法用于求解加权图中从单个源点到其他所有顶点的最短路径。'
    },

    // ===== C/C++ =====
    {
        category: 'C/C++',
        question: 'C 语言中 malloc() 分配的内存需要用什么释放？',
        options: ['delete', 'free()', 'release()', '自动释放'],
        answer: 1,
        explain: 'malloc() 分配的内存必须用 free() 手动释放，否则会造成内存泄漏。'
    },
    {
        category: 'C/C++',
        question: 'C++ 中 virtual 关键字的作用是？',
        options: ['声明静态方法', '实现多态（虚函数）', '定义常量', '声明模板'],
        answer: 1,
        explain: 'virtual 用于声明虚函数，实现运行时多态，允许子类重写父类方法。'
    },
    {
        category: 'C/C++',
        question: 'C++ 智能指针 unique_ptr 的特点是？',
        options: ['可以共享所有权', '独占所有权', '弱引用', '循环引用'],
        answer: 1,
        explain: 'unique_ptr 独占所管理对象的所有权，不能被复制，只能被移动。'
    },
    {
        category: 'C/C++',
        question: 'C 语言中指针 int *p 的 sizeof(p) 在 64 位系统上是？',
        options: ['4 字节', '8 字节', '取决于 int 大小', '2 字节'],
        answer: 1,
        explain: '在 64 位系统上，指针大小固定为 8 字节，与指向的数据类型无关。'
    },
    {
        category: 'C/C++',
        question: 'C++ 中 STL 的 vector 和 list 的主要区别是？',
        options: ['没有区别', 'vector 连续内存，list 链表结构', 'list 更快', 'vector 不能扩容'],
        answer: 1,
        explain: 'vector 使用连续内存（数组），随机访问快；list 使用双向链表，插入删除快。'
    },
    {
        category: 'C/C++',
        question: 'C++ 中 RAII 设计模式的核心思想是？',
        options: ['手动管理资源', '资源获取即初始化，利用析构函数自动释放', '使用全局变量', '延迟加载'],
        answer: 1,
        explain: 'RAII 利用对象的生命周期来管理资源，构造时获取，析构时释放。'
    },
    {
        category: 'C/C++',
        question: 'C 语言中 #define 和 const 的区别是？',
        options: ['没有区别', '#define 是预处理替换，const 是编译期常量', 'const 更快', '#define 有类型检查'],
        answer: 1,
        explain: '#define 在预处理阶段做文本替换，const 定义有类型的编译期常量，更安全。'
    }
];

/* ========================================
   关卡配置
   ======================================== */
const LEVELS = [
    {
        id: 1,
        name: '初出茅庐',
        description: '基础入门题，热身一下吧！',
        icon: 'fa-seedling',
        color: 'mint',
        questionCount: 5,
        timePerQuestion: 30,
        passScore: 3,
        pointsPerCorrect: 10,
        bonusPoints: 20,
        difficulty: '简单',
        unlockPoints: 0
    },
    {
        id: 2,
        name: '小试牛刀',
        description: '稍有难度，考验基本功',
        icon: 'fa-fire',
        color: 'pink',
        questionCount: 5,
        timePerQuestion: 28,
        passScore: 3,
        pointsPerCorrect: 15,
        bonusPoints: 30,
        difficulty: '简单',
        unlockPoints: 0
    },
    {
        id: 3,
        name: '渐入佳境',
        description: '知识面开始拓展',
        icon: 'fa-star',
        color: 'lavender',
        questionCount: 6,
        timePerQuestion: 25,
        passScore: 4,
        pointsPerCorrect: 20,
        bonusPoints: 40,
        difficulty: '中等',
        unlockPoints: 50
    },
    {
        id: 4,
        name: '技术达人',
        description: '需要扎实的技术功底',
        icon: 'fa-laptop-code',
        color: 'blue',
        questionCount: 6,
        timePerQuestion: 25,
        passScore: 4,
        pointsPerCorrect: 25,
        bonusPoints: 50,
        difficulty: '中等',
        unlockPoints: 120
    },
    {
        id: 5,
        name: '知识精英',
        description: '综合能力的考验',
        icon: 'fa-brain',
        color: 'yellow',
        questionCount: 7,
        timePerQuestion: 22,
        passScore: 5,
        pointsPerCorrect: 30,
        bonusPoints: 60,
        difficulty: '中等',
        unlockPoints: 220
    },
    {
        id: 6,
        name: '代码侠客',
        description: '挑战你的编程极限',
        icon: 'fa-code',
        color: 'mint',
        questionCount: 7,
        timePerQuestion: 20,
        passScore: 5,
        pointsPerCorrect: 35,
        bonusPoints: 70,
        difficulty: '困难',
        unlockPoints: 350
    },
    {
        id: 7,
        name: '架构大师',
        description: '系统设计与架构思维',
        icon: 'fa-project-diagram',
        color: 'pink',
        questionCount: 8,
        timePerQuestion: 20,
        passScore: 6,
        pointsPerCorrect: 40,
        bonusPoints: 80,
        difficulty: '困难',
        unlockPoints: 500
    },
    {
        id: 8,
        name: '算法高手',
        description: '数据结构与算法的巅峰',
        icon: 'fa-chart-line',
        color: 'lavender',
        questionCount: 8,
        timePerQuestion: 18,
        passScore: 6,
        pointsPerCorrect: 45,
        bonusPoints: 100,
        difficulty: '困难',
        unlockPoints: 700
    },
    {
        id: 9,
        name: '全栈王者',
        description: '前后端通吃的终极挑战',
        icon: 'fa-crown',
        color: 'yellow',
        questionCount: 10,
        timePerQuestion: 15,
        passScore: 7,
        pointsPerCorrect: 50,
        bonusPoints: 120,
        difficulty: '地狱',
        unlockPoints: 950
    },
    {
        id: 10,
        name: '传说之路',
        description: '只有真正的大神才能通关',
        icon: 'fa-trophy',
        color: 'blue',
        questionCount: 10,
        timePerQuestion: 12,
        passScore: 8,
        pointsPerCorrect: 60,
        bonusPoints: 150,
        difficulty: '地狱',
        unlockPoints: 1300
    }
];

/* ========================================
   奖品池配置
   ======================================== */
const REWARD_POOLS = [
    {
        id: 1,
        name: '程序员贴纸套装',
        description: '精美编程主题贴纸 10 张',
        icon: 'fa-sticky-note',
        color: 'pink',
        requiredPoints: 100,
        value: '约 10 元',
        stock: 3
    },
    {
        id: 2,
        name: '创意书签套装',
        description: '代码主题金属书签 3 枚',
        icon: 'fa-bookmark',
        color: 'mint',
        requiredPoints: 150,
        value: '约 15 元',
        stock: 3
    },
    {
        id: 3,
        name: '编程鼠标垫',
        description: '快捷键速查鼠标垫',
        icon: 'fa-mouse-pointer',
        color: 'lavender',
        requiredPoints: 200,
        value: '约 20 元',
        stock: 3
    },
    {
        id: 4,
        name: 'GitHub 猫手办',
        description: 'Octocat 迷你手办摆件',
        icon: 'fa-cat',
        color: 'blue',
        requiredPoints: 300,
        value: '约 30 元',
        stock: 3
    },
    {
        id: 5,
        name: '代码主题马克杯',
        description: 'Hello World 陶瓷杯',
        icon: 'fa-mug-hot',
        color: 'yellow',
        requiredPoints: 350,
        value: '约 35 元',
        stock: 3
    },
    {
        id: 6,
        name: '机械键帽套装',
        description: '彩色透光键帽 4 颗',
        icon: 'fa-keyboard',
        color: 'pink',
        requiredPoints: 450,
        value: '约 45 元',
        stock: 3
    },
    {
        id: 7,
        name: 'Linux 企鹅公仔',
        description: 'Tux 毛绒玩偶 15cm',
        icon: 'fa-linux',
        color: 'mint',
        requiredPoints: 550,
        value: '约 55 元',
        stock: 3
    },
    {
        id: 8,
        name: '程序员T恤',
        description: '趣味代码主题纯棉T恤',
        icon: 'fa-tshirt',
        color: 'lavender',
        requiredPoints: 700,
        value: '约 65 元',
        stock: 3
    },
    {
        id: 9,
        name: '蓝牙机械键盘',
        description: '迷你 68 键蓝牙机械键盘',
        icon: 'fa-keyboard',
        color: 'blue',
        requiredPoints: 900,
        value: '约 85 元',
        stock: 3
    },
    {
        id: 10,
        name: '树莓派 Zero 套装',
        description: 'Raspberry Pi Zero 2W 入门套件',
        icon: 'fa-microchip',
        color: 'yellow',
        requiredPoints: 1200,
        value: '约 100 元',
        stock: 3
    }
];

/* ========================================
   游戏状态管理
   ======================================== */
const STORAGE_KEY = 'sunnyQuizData';

function getGameData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.warn('读取游戏数据失败，将使用默认数据');
    }
    return {
        totalPoints: 0,
        winStreak: 0,
        levelRecords: {},
        exchangeHistory: [],
        weekSeed: getWeekSeed(),
        weekStock: {}
    };
}

function saveGameData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('保存游戏数据失败');
    }
}

function getWeekSeed() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    return now.getFullYear() + '-W' + weekNumber;
}

function getWeekRange() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    var format = function(d) {
        return (d.getMonth() + 1) + '/' + d.getDate();
    };
    return format(monday) + ' - ' + format(sunday);
}

function checkWeekReset(gameData) {
    var currentWeek = getWeekSeed();
    if (gameData.weekSeed !== currentWeek) {
        gameData.weekSeed = currentWeek;
        gameData.weekStock = {};
        saveGameData(gameData);
    }
    return gameData;
}

function getRewardStock(gameData, rewardId) {
    var key = 'reward_' + rewardId;
    if (gameData.weekStock[key] === undefined) {
        return 3;
    }
    return gameData.weekStock[key];
}

/* ========================================
   游戏核心逻辑
   ======================================== */
var currentLevel = null;
var currentQuestions = [];
var currentQuestionIndex = 0;
var correctCount = 0;
var totalTimeUsed = 0;
var questionStartTime = 0;
var timerInterval = null;
var timeLeft = 0;
var isAnswered = false;

function shuffleArray(arr) {
    var shuffled = arr.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function selectQuestions(count) {
    var shuffled = shuffleArray(QUESTION_BANK);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function startLevel(levelId) {
    var gameData = getGameData();
    var level = LEVELS.find(function(l) { return l.id === levelId; });
    if (!level) return;

    if (gameData.totalPoints < level.unlockPoints) {
        showToast('积分不足，需要 ' + level.unlockPoints + ' 积分解锁此关卡');
        return;
    }

    currentLevel = level;
    currentQuestions = selectQuestions(level.questionCount);
    currentQuestionIndex = 0;
    correctCount = 0;
    totalTimeUsed = 0;
    isAnswered = false;

    var levelsSection = document.getElementById('levelsSection');
    var gameSection = document.getElementById('gameSection');
    if (levelsSection) levelsSection.style.display = 'none';
    if (gameSection) gameSection.style.display = 'block';

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResult();
        return;
    }

    isAnswered = false;
    var q = currentQuestions[currentQuestionIndex];

    var badge = document.getElementById('currentLevelBadge');
    var counter = document.getElementById('questionCounter');
    var catEl = document.getElementById('questionCategory');
    var textEl = document.getElementById('questionText');
    var optList = document.getElementById('optionsList');
    var feedback = document.getElementById('answerFeedback');
    var progressBar = document.getElementById('progressBar');

    if (badge) badge.textContent = '关卡 ' + currentLevel.id + ' · ' + currentLevel.name;
    if (counter) counter.textContent = (currentQuestionIndex + 1) + ' / ' + currentQuestions.length;
    if (catEl) catEl.querySelector('span').textContent = q.category;
    if (textEl) textEl.textContent = q.question;
    if (feedback) feedback.style.display = 'none';
    if (progressBar) progressBar.style.width = ((currentQuestionIndex / currentQuestions.length) * 100) + '%';

    if (optList) {
        optList.innerHTML = '';
        var labels = ['A', 'B', 'C', 'D'];
        q.options.forEach(function(opt, idx) {
            var btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = '<span class="option-label">' + labels[idx] + '</span><span class="option-text">' + opt + '</span>';
            btn.addEventListener('click', function() { handleAnswer(idx); });
            optList.appendChild(btn);
        });
    }

    questionStartTime = Date.now();
    startTimer(currentLevel.timePerQuestion);
}

function startTimer(seconds) {
    timeLeft = seconds;
    var display = document.getElementById('timerDisplay');
    if (display) display.textContent = timeLeft;

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timeLeft--;
        if (display) display.textContent = Math.max(0, timeLeft);

        if (display) {
            if (timeLeft <= 5) {
                display.parentElement.classList.add('timer-warning');
            } else {
                display.parentElement.classList.remove('timer-warning');
            }
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!isAnswered) {
                handleAnswer(-1);
            }
        }
    }, 1000);
}

function handleAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;

    clearInterval(timerInterval);
    var elapsed = (Date.now() - questionStartTime) / 1000;
    totalTimeUsed += elapsed;

    var q = currentQuestions[currentQuestionIndex];
    var isCorrect = selectedIndex === q.answer;
    if (isCorrect) correctCount++;

    var optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach(function(btn, idx) {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.add('correct');
        } else if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    var feedback = document.getElementById('answerFeedback');
    var fIcon = document.getElementById('feedbackIcon');
    var fText = document.getElementById('feedbackText');
    var fExplain = document.getElementById('feedbackExplain');

    if (feedback) feedback.style.display = 'block';

    if (selectedIndex === -1) {
        if (fIcon) fIcon.innerHTML = '<i class="fas fa-clock" style="color: var(--cream-yellow-dark);"></i>';
        if (fText) fText.textContent = '时间到！';
        if (fText) fText.className = 'feedback-text timeout';
    } else if (isCorrect) {
        if (fIcon) fIcon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--mint-green-dark);"></i>';
        if (fText) fText.textContent = '回答正确！';
        if (fText) fText.className = 'feedback-text correct';
    } else {
        if (fIcon) fIcon.innerHTML = '<i class="fas fa-times-circle" style="color: var(--primary-pink-dark);"></i>';
        if (fText) fText.textContent = '回答错误';
        if (fText) fText.className = 'feedback-text wrong';
    }

    if (fExplain) fExplain.textContent = q.explain;

    var nextBtn = document.getElementById('btnNext');
    if (nextBtn) {
        if (currentQuestionIndex >= currentQuestions.length - 1) {
            nextBtn.textContent = '查看结果';
            nextBtn.innerHTML = '查看结果 <i class="fas fa-chart-bar"></i>';
        } else {
            nextBtn.innerHTML = '下一题 <i class="fas fa-arrow-right"></i>';
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    clearInterval(timerInterval);

    var gameSection = document.getElementById('gameSection');
    var resultSection = document.getElementById('resultSection');
    if (gameSection) gameSection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'block';

    var accuracy = Math.round((correctCount / currentQuestions.length) * 100);
    var passed = correctCount >= currentLevel.passScore;
    var earnedPoints = correctCount * currentLevel.pointsPerCorrect;
    if (passed) earnedPoints += currentLevel.bonusPoints;

    var gameData = getGameData();
    gameData.totalPoints += earnedPoints;

    if (passed) {
        gameData.winStreak = (gameData.winStreak || 0) + 1;
    } else {
        gameData.winStreak = 0;
    }

    var levelKey = 'level_' + currentLevel.id;
    if (!gameData.levelRecords[levelKey] || earnedPoints > gameData.levelRecords[levelKey].bestScore) {
        gameData.levelRecords[levelKey] = {
            bestScore: earnedPoints,
            bestAccuracy: accuracy,
            passed: passed || (gameData.levelRecords[levelKey] && gameData.levelRecords[levelKey].passed)
        };
    }
    if (passed && gameData.levelRecords[levelKey]) {
        gameData.levelRecords[levelKey].passed = true;
    }

    saveGameData(gameData);
    updatePointsDisplay(gameData);

    var rIcon = document.getElementById('resultIcon');
    var rTitle = document.getElementById('resultTitle');
    var rAccuracy = document.getElementById('resultAccuracy');
    var rTime = document.getElementById('resultTime');
    var rPoints = document.getElementById('resultPoints');
    var rDetail = document.getElementById('resultDetail');

    if (passed) {
        if (rIcon) rIcon.innerHTML = '<i class="fas fa-trophy" style="color: var(--cream-yellow-dark);"></i>';
        if (rTitle) rTitle.textContent = '恭喜通关！';
        if (rTitle) rTitle.style.color = 'var(--mint-green-dark)';
    } else {
        if (rIcon) rIcon.innerHTML = '<i class="fas fa-heart-broken" style="color: var(--primary-pink);"></i>';
        if (rTitle) rTitle.textContent = '挑战失败，再接再厉！';
        if (rTitle) rTitle.style.color = 'var(--primary-pink-dark)';
    }

    if (rAccuracy) rAccuracy.textContent = accuracy + '%';
    if (rTime) rTime.textContent = Math.round(totalTimeUsed) + 's';
    if (rPoints) rPoints.textContent = '+' + earnedPoints;

    if (rDetail) {
        var detailHtml = '<p>答对 <strong>' + correctCount + '</strong> / ' + currentQuestions.length + ' 题';
        if (passed) {
            detailHtml += '，通关奖励 <strong>+' + currentLevel.bonusPoints + '</strong> 积分</p>';
        } else {
            detailHtml += '，需答对 <strong>' + currentLevel.passScore + '</strong> 题才能通关</p>';
        }
        rDetail.innerHTML = detailHtml;
    }
}

function retryLevel() {
    if (!currentLevel) return;
    var resultSection = document.getElementById('resultSection');
    var gameSection = document.getElementById('gameSection');
    if (resultSection) resultSection.style.display = 'none';
    if (gameSection) gameSection.style.display = 'block';

    currentQuestions = selectQuestions(currentLevel.questionCount);
    currentQuestionIndex = 0;
    correctCount = 0;
    totalTimeUsed = 0;
    isAnswered = false;
    showQuestion();
}

function backToLevels() {
    var gameSection = document.getElementById('gameSection');
    var resultSection = document.getElementById('resultSection');
    var levelsSection = document.getElementById('levelsSection');

    if (gameSection) gameSection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
    if (levelsSection) levelsSection.style.display = 'block';

    clearInterval(timerInterval);
    renderLevels();
}

function quitGame() {
    if (confirm('确定要退出答题吗？当前进度不会保存。')) {
        backToLevels();
    }
}

/* ========================================
   UI 渲染
   ======================================== */
function renderLevels() {
    var grid = document.getElementById('levelsGrid');
    if (!grid) return;

    var gameData = getGameData();
    gameData = checkWeekReset(gameData);
    updatePointsDisplay(gameData);

    var colorMap = {
        'mint': { bg: 'rgba(168, 216, 200, 0.15)', border: 'rgba(168, 216, 200, 0.4)', icon: 'var(--mint-green-dark)' },
        'pink': { bg: 'rgba(242, 166, 179, 0.15)', border: 'rgba(242, 166, 179, 0.4)', icon: 'var(--primary-pink-dark)' },
        'lavender': { bg: 'rgba(195, 177, 225, 0.15)', border: 'rgba(195, 177, 225, 0.4)', icon: 'var(--lavender-dark)' },
        'blue': { bg: 'rgba(167, 199, 231, 0.15)', border: 'rgba(167, 199, 231, 0.4)', icon: 'var(--sky-blue-dark)' },
        'yellow': { bg: 'rgba(249, 228, 183, 0.2)', border: 'rgba(249, 228, 183, 0.5)', icon: 'var(--cream-yellow-dark)' }
    };

    var difficultyColors = {
        '简单': 'var(--mint-green)',
        '中等': 'var(--cream-yellow)',
        '困难': 'var(--primary-pink)',
        '地狱': 'var(--lavender-dark)'
    };

    grid.innerHTML = '';

    LEVELS.forEach(function(level) {
        var colors = colorMap[level.color] || colorMap['pink'];
        var isUnlocked = gameData.totalPoints >= level.unlockPoints;
        var record = gameData.levelRecords['level_' + level.id];
        var isPassed = record && record.passed;

        var card = document.createElement('div');
        card.className = 'level-card' + (isUnlocked ? '' : ' locked') + (isPassed ? ' passed' : '');
        card.style.background = colors.bg;
        card.style.borderColor = colors.border;

        var statusHtml = '';
        if (isPassed) {
            statusHtml = '<span class="level-status passed"><i class="fas fa-check-circle"></i> 已通关</span>';
        } else if (!isUnlocked) {
            statusHtml = '<span class="level-status locked"><i class="fas fa-lock"></i> ' + level.unlockPoints + ' 积分解锁</span>';
        }

        var bestHtml = '';
        if (record) {
            bestHtml = '<div class="level-best">最佳：' + record.bestAccuracy + '% · ' + record.bestScore + '分</div>';
        }

        card.innerHTML =
            '<div class="level-header">' +
                '<div class="level-icon" style="color:' + colors.icon + '"><i class="fas ' + level.icon + '"></i></div>' +
                '<span class="level-number">第 ' + level.id + ' 关</span>' +
            '</div>' +
            '<h3 class="level-name">' + level.name + '</h3>' +
            '<p class="level-desc">' + level.description + '</p>' +
            '<div class="level-meta">' +
                '<span class="difficulty-badge" style="background:' + difficultyColors[level.difficulty] + '">' + level.difficulty + '</span>' +
                '<span class="level-info">' + level.questionCount + '题 · ' + level.timePerQuestion + 's/题</span>' +
            '</div>' +
            '<div class="level-reward"><i class="fas fa-coins"></i> 最高 ' + (level.questionCount * level.pointsPerCorrect + level.bonusPoints) + ' 积分</div>' +
            statusHtml +
            bestHtml;

        if (isUnlocked) {
            card.addEventListener('click', function() { startLevel(level.id); });
            card.style.cursor = 'pointer';
        }

        grid.appendChild(card);
    });
}

function renderRewards() {
    var grid = document.getElementById('rewardsGrid');
    if (!grid) return;

    var gameData = getGameData();
    gameData = checkWeekReset(gameData);
    updatePointsDisplay(gameData);

    var weekRangeEl = document.getElementById('weekRange');
    if (weekRangeEl) weekRangeEl.textContent = getWeekRange();

    var colorMap = {
        'pink': { bg: 'linear-gradient(135deg, rgba(242,166,179,0.12), rgba(248,196,204,0.2))', border: 'rgba(242,166,179,0.35)', icon: 'var(--primary-pink)' },
        'mint': { bg: 'linear-gradient(135deg, rgba(168,216,200,0.12), rgba(196,232,220,0.2))', border: 'rgba(168,216,200,0.35)', icon: 'var(--mint-green)' },
        'lavender': { bg: 'linear-gradient(135deg, rgba(195,177,225,0.12), rgba(217,204,240,0.2))', border: 'rgba(195,177,225,0.35)', icon: 'var(--lavender)' },
        'blue': { bg: 'linear-gradient(135deg, rgba(167,199,231,0.12), rgba(197,220,240,0.2))', border: 'rgba(167,199,231,0.35)', icon: 'var(--sky-blue)' },
        'yellow': { bg: 'linear-gradient(135deg, rgba(249,228,183,0.15), rgba(253,240,213,0.25))', border: 'rgba(249,228,183,0.4)', icon: 'var(--cream-yellow-dark)' }
    };

    grid.innerHTML = '';

    REWARD_POOLS.forEach(function(reward) {
        var colors = colorMap[reward.color] || colorMap['pink'];
        var stock = getRewardStock(gameData, reward.id);
        var canExchange = gameData.totalPoints >= reward.requiredPoints && stock > 0;
        var isSoldOut = stock <= 0;

        var card = document.createElement('div');
        card.className = 'reward-card' + (isSoldOut ? ' sold-out' : '');
        card.style.background = colors.bg;
        card.style.borderColor = colors.border;

        card.innerHTML =
            '<div class="reward-icon" style="color:' + colors.icon + '"><i class="fas ' + reward.icon + '"></i></div>' +
            '<h3 class="reward-name">' + reward.name + '</h3>' +
            '<p class="reward-desc">' + reward.description + '</p>' +
            '<div class="reward-meta">' +
                '<span class="reward-value"><i class="fas fa-tag"></i> ' + reward.value + '</span>' +
                '<span class="reward-stock">' + (isSoldOut ? '已兑完' : '剩余 ' + stock + ' 个') + '</span>' +
            '</div>' +
            '<div class="reward-cost"><i class="fas fa-coins"></i> ' + reward.requiredPoints + ' 积分</div>' +
            '<button class="btn-exchange' + (canExchange ? '' : ' disabled') + '" ' +
                (canExchange ? '' : 'disabled') +
                ' data-reward-id="' + reward.id + '">' +
                (isSoldOut ? '已兑完' : (canExchange ? '<i class="fas fa-exchange-alt"></i> 立即兑换' : '<i class="fas fa-lock"></i> 积分不足')) +
            '</button>';

        grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-exchange:not(.disabled)').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var rewardId = parseInt(btn.getAttribute('data-reward-id'));
            showExchangeModal(rewardId);
        });
    });

    renderExchangeHistory(gameData);
}

function showExchangeModal(rewardId) {
    var reward = REWARD_POOLS.find(function(r) { return r.id === rewardId; });
    if (!reward) return;

    var modal = document.getElementById('exchangeModal');
    var body = document.getElementById('modalBody');

    if (body) {
        body.innerHTML =
            '<div class="modal-reward-info">' +
                '<div class="modal-reward-icon"><i class="fas ' + reward.icon + '"></i></div>' +
                '<h4>' + reward.name + '</h4>' +
                '<p>' + reward.description + '</p>' +
                '<p class="modal-cost">需要 <strong>' + reward.requiredPoints + '</strong> 积分</p>' +
            '</div>';
    }

    if (modal) modal.style.display = 'flex';

    var confirmBtn = document.getElementById('modalConfirm');
    var cancelBtn = document.getElementById('modalCancel');
    var closeBtn = document.getElementById('modalClose');

    var closeModal = function() {
        if (modal) modal.style.display = 'none';
    };

    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) closeModal();
        };
    }

    if (confirmBtn) {
        confirmBtn.onclick = function() {
            exchangeReward(rewardId);
            closeModal();
        };
    }
}

function exchangeReward(rewardId) {
    var gameData = getGameData();
    var reward = REWARD_POOLS.find(function(r) { return r.id === rewardId; });
    if (!reward) return;

    var stock = getRewardStock(gameData, rewardId);
    if (gameData.totalPoints < reward.requiredPoints) {
        showToast('积分不足！');
        return;
    }
    if (stock <= 0) {
        showToast('该奖品已兑完！');
        return;
    }

    gameData.totalPoints -= reward.requiredPoints;
    var key = 'reward_' + rewardId;
    gameData.weekStock[key] = stock - 1;

    if (!gameData.exchangeHistory) gameData.exchangeHistory = [];
    gameData.exchangeHistory.unshift({
        rewardId: rewardId,
        rewardName: reward.name,
        cost: reward.requiredPoints,
        date: new Date().toLocaleDateString('zh-CN'),
        week: getWeekSeed()
    });

    saveGameData(gameData);
    showToast('兑换成功！' + reward.name);
    renderRewards();
}

function renderExchangeHistory(gameData) {
    var list = document.getElementById('historyList');
    var emptyEl = document.getElementById('emptyHistory');
    if (!list) return;

    var history = gameData.exchangeHistory || [];
    if (history.length === 0) {
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    var html = '';
    history.slice(0, 20).forEach(function(item) {
        html += '<div class="history-item">' +
            '<div class="history-info">' +
                '<span class="history-name">' + item.rewardName + '</span>' +
                '<span class="history-date">' + item.date + '</span>' +
            '</div>' +
            '<span class="history-cost">-' + item.cost + ' 积分</span>' +
        '</div>';
    });

    var existingItems = list.querySelectorAll('.history-item');
    existingItems.forEach(function(el) { el.remove(); });
    list.insertAdjacentHTML('beforeend', html);
}

function updatePointsDisplay(gameData) {
    var pointsEls = document.querySelectorAll('#totalPoints');
    pointsEls.forEach(function(el) {
        el.textContent = gameData.totalPoints;
    });

    var streakEl = document.getElementById('winStreak');
    if (streakEl) streakEl.textContent = gameData.winStreak || 0;

    var exchangedEl = document.getElementById('exchangedCount');
    if (exchangedEl) {
        var count = (gameData.exchangeHistory || []).length;
        exchangedEl.textContent = count;
    }
}

/* ========================================
   Toast 提示
   ======================================== */
function showToast(message) {
    var existing = document.querySelector('.toast-message');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.classList.add('show');
    });

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
}

/* ========================================
   页面初始化
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('levelsGrid')) {
        renderLevels();
    }

    if (document.getElementById('rewardsGrid')) {
        renderRewards();
    }

    var btnNext = document.getElementById('btnNext');
    if (btnNext) {
        btnNext.addEventListener('click', nextQuestion);
    }

    var btnRetry = document.getElementById('btnRetry');
    if (btnRetry) {
        btnRetry.addEventListener('click', retryLevel);
    }

    var btnBackLevels = document.getElementById('btnBackLevels');
    if (btnBackLevels) {
        btnBackLevels.addEventListener('click', backToLevels);
    }

    var btnQuit = document.getElementById('btnQuit');
    if (btnQuit) {
        btnQuit.addEventListener('click', quitGame);
    }

    var gameData = getGameData();
    gameData = checkWeekReset(gameData);
    updatePointsDisplay(gameData);
});
