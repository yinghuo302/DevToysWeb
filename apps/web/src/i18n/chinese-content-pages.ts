import type { ContentPageSlug } from '@/features/content/domain/page-slugs'
import type { ContentPageCopy } from './dictionaries'

export const chineseContentPages: Record<ContentPageSlug, ContentPageCopy> = {
  'about-app': {
    eyebrow: '关于 DevToys',
    title: '关于 DevToys',
    description: 'DevToys 是一款免费的 Web 应用，将日常开发所需的小工具汇集到浏览器中。',
    sections: [
      {
        heading: '什么是 DevToys？',
        paragraphs: [
          'DevToys 汇集了转换、格式化、生成和检查等工具，让你在需要时随时使用。无需安装，也无需注册账号。',
          'DevToys 不追求打造一个庞大的应用，而是专注于各自解决一项任务的小工具，帮助你保持开发流程顺畅。',
        ],
      },
      {
        heading: '你可以做什么',
        items: [
          '转换、格式化和解码 JSON、URL、Base64、JWT 等数据',
          '检查正则表达式、Cron 表达式、CIDR 范围和子网等值',
          '生成二维码、占位文本、图像及其他开发素材',
          '在浏览器中尝试各种想法，不中断开发工作流',
        ],
      },
      {
        heading: '我们的原则',
        paragraphs: [
          '界面应当简洁平和，控件应当符合预期，结果应当即时可见。DevToys 致力于成为一套可供你每天使用的小工具箱。',
          '工具集和文档将持续扩充。欢迎通过联系页面分享想法或报告问题。',
        ],
      },
    ],
  },
  'how-to-use': {
    eyebrow: '使用指南',
    title: '如何使用 DevToys',
    description: '选择工具、输入内容、复制结果。下面介绍 DevToys 的基本使用流程。',
    sections: [
      {
        heading: '三个基本步骤',
        items: [
          '从首页或搜索中选择所需工具，也可以按类别缩小工具范围。',
          '在输入区域粘贴或输入内容。提供示例按钮的工具，可以先使用示例进行尝试。',
          '查看结果，然后按需复制或分享。大多数工具会在输入时即时更新结果。',
        ],
      },
      {
        heading: '实用快捷方式',
        items: [
          '通过页眉搜索框或对应的键盘快捷键打开命令面板',
          '在“最近使用”区域快速打开常用工具',
          '分享工具链接给团队，而不会包含输入内容',
          '切换主题和语言，以适应你的工作环境',
        ],
      },
      {
        heading: '数据如何处理',
        paragraphs: [
          '仅在浏览器中运行的工具通常会在你的设备上处理输入。关闭浏览器或离开页面后，输入内容不会保留。',
          'OGP 检查会将输入的 URL 发送给 Microlink，域名注册查询会将域名发送给公共 RDAP 服务。JWT 在浏览器中本地验证；JWKS 模式会由浏览器直接请求指定 URL。使用前请查看工具说明和第三方服务的隐私政策。',
        ],
      },
    ],
  },
  'developer-guide': {
    eyebrow: '开发者指南',
    title: '开发者指南',
    description: '介绍如何选择 DevToys 工具，并将其融入开发工作流。',
    sections: [
      {
        heading: '先从任务出发',
        paragraphs: [
          '需要将值转换为其他格式时，可查找转换和编码工具；需要检查结构或语法时，可查找格式化和检查工具；需要验证某个值时，可尝试测试和诊断工具。',
          '如果不知道工具名称，可以使用页眉中的搜索按关键词查找。首页也按类别展示了完整工具集。',
        ],
      },
      {
        heading: '仅在浏览器中完成的工作流',
        items: [
          '转换和格式化 JSON、XML、YAML、CSV、URL 及 Base64 数据',
          '检查正则表达式、Cron 表达式、JWT 和 CIDR 范围的语法与值',
          '查看文本差异、字符数、字节数和图像元数据',
          '生成或转换二维码、占位文本和图像格式',
        ],
      },
      {
        heading: '需要使用网络的工具',
        paragraphs: [
          'OGP 检查会将页面 URL 发送给 Microlink，域名注册查询会将域名发送给公共 RDAP 服务。请勿提交包含秘密信息或访问凭据的 URL 和域名。',
          'JWT 在浏览器中本地验证；选择 JWKS 模式时，浏览器会直接请求指定的 JWKS URL。',
        ],
      },
      {
        heading: '开放改进',
        paragraphs: [
          'DevToys 会持续改进易用性并扩充工具。提供复现步骤、预期结果和实际结果，有助于我们更轻松地调查问题。',
        ],
      },
    ],
  },
  operator: {
    eyebrow: '运营者信息',
    title: '关于运营者',
    description: 'DevToys project 运营这款以浏览器为先的开发者工具集。',
    sections: [
      { heading: '运营者', paragraphs: ['DevToys project'] },
      {
        heading: '运营原则',
        items: [
          '提供适用于日常开发工作的精简、明确的工具。',
          '避免收集超出必要范围的输入数据，并在设备上处理可由浏览器完成的任务。',
          '审阅问题报告和改进建议，让服务更加安全、易于理解。',
        ],
      },
      {
        heading: '联系',
        paragraphs: ['有关服务的问题，请通过联系页面中的 GitHub Issues 链接提交。'],
      },
    ],
  },
  privacy: {
    eyebrow: '隐私政策',
    title: '隐私政策',
    description: '说明 DevToys 如何处理工具输入、访问信息和第三方服务。',
    sections: [
      {
        heading: '我们的做法',
        paragraphs: [
          'DevToys 仅在提供开发者工具所需的范围内处理信息。我们不会收集或出售超出服务所需范围的输入数据。',
        ],
      },
      {
        heading: '在浏览器中处理的输入',
        paragraphs: [
          '对于完全在浏览器中运行的转换、格式化和生成工具，输入通常在你的设备上处理，不会发送到 DevToys 服务器。',
        ],
      },
      {
        heading: '发送到外部服务的信息',
        paragraphs: [
          'OGP 检查会将输入的 URL 发送给 Microlink，域名注册查询会将域名发送给公共 RDAP 服务。JWT 在浏览器中本地验证；JWKS 模式会由浏览器直接请求指定 URL。请勿提交包含秘密或身份验证信息的 URL、域名。',
          '使用第三方服务时，适用相应服务商的隐私政策和使用限制。',
        ],
      },
      {
        heading: '分析与第三方服务',
        paragraphs: [
          '本网站使用 Google Analytics 了解使用情况。Google Analytics 处理的信息也受 Google 的政策和配置约束。',
          '如果你通过 GitHub Issues 等外部服务联系我们，你在该服务提交的信息将适用该服务的隐私政策。',
        ],
      },
      {
        heading: '政策变更',
        paragraphs: ['随着服务变化或为满足法律要求，本政策可能会更新。重要变更将在本页面公布。'],
      },
    ],
  },
  terms: {
    eyebrow: '使用条款',
    title: '使用条款',
    description: '规定使用 DevToys 的基本条件。',
    sections: [
      {
        heading: '适用范围',
        paragraphs: [
          '本条款适用于 DevToys project 提供的 DevToys 网站及相关工具。使用本服务即表示你同意本条款。',
        ],
      },
      {
        heading: '服务内容',
        paragraphs: [
          'DevToys 提供用于转换、生成、分析及其他开发任务的工具。结果仅供参考，可能因你的环境和输入而异。',
        ],
      },
      {
        heading: '限制与注意事项',
        items: [
          '不得将本服务用于违法目的或违反公共秩序的用途。',
          '不得对服务施加过度负载，也不得尝试未授权访问。',
          '不得故意提交或泄露他人的秘密信息、凭据或个人信息。',
          '不得仅依据工具输出作出关键决策或进行生产环境变更。',
        ],
      },
      {
        heading: '服务变更与可用性',
        paragraphs: [
          '运营者可能因新增功能、维护、故障或其他原因变更或暂停全部或部分服务。在法律允许的范围内，运营者不对这些变更或中断造成的损失负责。',
        ],
      },
      {
        heading: '条款变更',
        paragraphs: ['本条款可能会在必要时更新。更新后的条款自发布在本页面时起生效。'],
      },
    ],
  },
  contact: {
    eyebrow: '联系',
    title: '联系我们',
    description: '如需报告问题、提出建议或咨询服务，请通过 GitHub 联系我们。',
    action: {
      label: '打开 GitHub Issues',
      href: 'https://github.com/s-yoshiki/DevToysWeb/issues/new',
    },
    sections: [
      {
        heading: '如何联系我们',
        paragraphs: [
          '一般问题请在 GitHub Issues 中创建新 Issue。请勿在公开 Issue 中包含私人或敏感信息。',
        ],
      },
      {
        heading: '问题报告建议包含的信息',
        items: [
          '发生问题的页面或工具',
          '复现步骤、预期结果和实际结果',
          '浏览器、操作系统和视口尺寸',
          '可以安全分享的错误消息或截图',
        ],
      },
      {
        heading: '安全问题报告',
        paragraphs: [
          '请勿在公开 Issue 中披露漏洞详情或已泄露的凭据。请使用安全的私密报告渠道，例如 GitHub 的私密安全漏洞报告功能。',
        ],
      },
    ],
  },
}
