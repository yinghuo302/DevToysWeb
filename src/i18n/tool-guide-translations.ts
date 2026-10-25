export const toolGuideChineseCopy: readonly [string, string][] = [
  [
    'Paste a JSON sample—an API response, for example—into the left pane.',
    '将 JSON 示例（例如 API 响应）粘贴到左侧面板。',
  ],
  [
    'Choose the output language: TypeScript, Go, or Python.',
    '选择输出语言：TypeScript、Go 或 Python。',
  ],
  [
    'Rename the root type if you like; nested objects are named after their key.',
    '可按需重命名根类型；嵌套对象会根据其键名命名。',
  ],
  ['Copy the generated definitions into your project.', '将生成的定义复制到项目中。'],
  [
    'Types are inferred from one sample, so fields and values the sample never shows cannot be represented.',
    '类型根据单个样例推断，因此样例中未出现的字段和值无法表示。',
  ],
  [
    'Array elements are merged, so keys missing from some elements become optional—include several shapes for a better result.',
    '数组元素会合并处理，因此部分元素中缺失的键会变为可选项；提供多种结构的样例可获得更好的结果。',
  ],
  [
    'JSON does not distinguish integers from floats; a value without a decimal point is inferred as an integer type.',
    'JSON 不区分整数和浮点数；不含小数点的值会被推断为整数类型。',
  ],
  [
    'A field that is only ever null carries no type, so it becomes null in TypeScript and any/Any in Go and Python.',
    '始终为 null 的字段无法推断类型，因此在 TypeScript 中会成为 null，在 Go 和 Python 中会成为 any/Any。',
  ],
  [
    'Dates and UUIDs are inferred as strings; swap in a richer type after generating if you need one.',
    '日期和 UUID 会被推断为字符串；如需更具体的类型，请在生成后替换。',
  ],
  [
    'Search by code, reason phrase, description, or RFC number.',
    '可按状态码、原因短语、描述或 RFC 编号搜索。',
  ],
  [
    'Filter by class to narrow the list to a single 1xx–5xx range.',
    '按类别筛选，可将列表缩小到单个 1xx–5xx 范围。',
  ],
  [
    'The copy button yields a status line such as `404 Not Found`.',
    '复制按钮会生成类似 `404 Not Found` 的状态行。',
  ],
  [
    'Only codes in the IANA registry are listed; vendor extensions from CDNs and web servers are not.',
    '列表仅包含 IANA 注册的状态码，不包括 CDN 和 Web 服务器厂商的扩展码。',
  ],
  [
    'Codes marked "No body" must not carry a response body—check that middleware is not adding one.',
    '标记为“无响应体”的状态码不得携带响应体；请检查中间件是否自动添加了响应体。',
  ],
  [
    'The descriptions are summaries; consult the cited RFC section before relying on one in an implementation.',
    '这些描述是摘要；在实现中采用前，请查阅所引用的 RFC 章节。',
  ],
  ['Enter the text to hash.', '输入要计算哈希的文本。'],
  ['Choose the algorithm (SHA-1, SHA-256, etc.).', '选择算法（SHA-1、SHA-256 等）。'],
  ['Copy the computed digest.', '复制计算得到的摘要值。'],
  [
    'Computed in the browser; input is never sent anywhere.',
    '在浏览器中计算；输入内容不会发送到任何地方。',
  ],
  [
    'MD5 and SHA-1 have known collisions—avoid them for security uses.',
    'MD5 和 SHA-1 已知存在碰撞；请勿将它们用于安全场景。',
  ],
  [
    'Enter keywords, accounts, date ranges and other filters.',
    '输入关键词、账号、日期范围和其他筛选条件。',
  ],
  ['Review the assembled search query.', '检查组合生成的搜索查询。'],
  ['Open the results on X from the button.', '点击按钮在 X 上打开搜索结果。'],
  ['Viewing results may require being logged in to X.', '查看结果可能需要登录 X。'],
  [
    'Some operators may stop working if X changes its search behaviour.',
    '如果 X 更改搜索行为，某些运算符可能会失效。',
  ],
  [
    'Fill in operators like site: and filetype: in each field.',
    '在各个字段中填写 site:、filetype: 等运算符。',
  ],
  ['Review the assembled query.', '检查组合生成的查询。'],
  ['Jump to the results with the search button.', '点击搜索按钮前往结果页面。'],
  ['Operator behaviour can change with Google’s updates.', '运算符行为可能随 Google 更新而变化。'],
  ['Enter conditions like sender, recipient and attachments.', '输入发件人、收件人、附件等条件。'],
  ['Review the generated Gmail query.', '检查生成的 Gmail 查询。'],
  ['Paste it into the Gmail search box.', '将其粘贴到 Gmail 搜索框中。'],
  ['You must be signed in to Gmail to run the query.', '必须登录 Gmail 才能运行此查询。'],
  ['Date filters are interpreted in your account timezone.', '日期筛选条件按账号时区解释。'],
  [
    'Pick the scope (repositories/code/issues) and filters.',
    '选择搜索范围（仓库/代码/议题）和筛选条件。',
  ],
  ['Add refinements like language, stars and author.', '添加语言、星标数、作者等细化条件。'],
  ['Search GitHub with the generated query.', '使用生成的查询搜索 GitHub。'],
  [
    'Some scopes (e.g. code search) require being signed in to GitHub.',
    '某些搜索范围（例如代码搜索）需要登录 GitHub。',
  ],
  ['Search syntax may change with GitHub updates.', '搜索语法可能随 GitHub 更新而变化。'],
  [
    'Type JavaScript or TypeScript into the editor.',
    '在编辑器中输入 JavaScript 或 TypeScript 代码。',
  ],
  ['Provide stdin if your code reads input.', '如果代码需要读取输入，请提供 stdin。'],
  ['Run it and inspect the result and stdout.', '运行代码并查看结果和 stdout。'],
  [
    'Code runs in your browser and is not sent to any server.',
    '代码在浏览器中运行，不会发送到任何服务器。',
  ],
  ['Infinite loops or heavy work can freeze the tab.', '无限循环或繁重任务可能导致标签页卡死。'],
  [
    'Node.js-specific APIs and file system access are unavailable.',
    '无法使用 Node.js 专属 API 和文件系统访问功能。',
  ],
  ['Enter the regex pattern and flags (g, i, etc.).', '输入正则表达式模式和标志（g、i 等）。'],
  ['Enter the text to test against.', '输入要进行匹配测试的文本。'],
  ['Matches and capture groups are highlighted.', '匹配项和捕获组会高亮显示。'],
  [
    'Uses the JavaScript regex engine—syntax differs from some other languages.',
    '使用 JavaScript 正则表达式引擎；其语法与某些其他语言不同。',
  ],
  [
    'Complex patterns can become very slow on some inputs (catastrophic backtracking).',
    '复杂模式在某些输入上可能会运行得非常慢（灾难性回溯）。',
  ],
  ['Enter the target JSON.', '输入目标 JSON。'],
  [
    'Extract values with a JSONPath expression, or validate against a JSON Schema.',
    '使用 JSONPath 表达式提取值，或根据 JSON Schema 进行验证。',
  ],
  ['Review the extracted or validation results.', '查看提取结果或验证结果。'],
  [
    'JSONPath implementations vary; some advanced expressions may not work.',
    '不同 JSONPath 实现之间存在差异；某些高级表达式可能无法使用。',
  ],
  ['Large JSON documents can be slow to process.', '处理大型 JSON 文档可能较慢。'],
  ['Enter the target HTML.', '输入目标 HTML。'],
  ['Enter a CSS selector or an XPath expression.', '输入 CSS 选择器或 XPath 表达式。'],
  ['Review the list of matched elements.', '查看匹配元素列表。'],
  [
    'Well-formed HTML the browser can parse is required.',
    '需要提供浏览器能够解析的格式良好的 HTML。',
  ],
  [
    'Elements generated dynamically by JavaScript are not matched.',
    'JavaScript 动态生成的元素不会被匹配。',
  ],
  ['Enter a glob pattern (e.g. src/**/*.ts).', '输入 glob 模式（例如 src/**/*.ts）。'],
  ['Enter paths to test, one per line.', '逐行输入要测试的路径。'],
  ['See which paths match.', '查看哪些路径匹配。'],
  [
    'Glob semantics differ subtly between tools (bash, git, libraries).',
    '不同工具（bash、git、各类库）的 glob 语义略有差异。',
  ],
  [
    'Handling of dotfiles and ** is implementation-dependent.',
    '点文件和 ** 的处理方式取决于具体实现。',
  ],
  ['Paste the garbled text into the input.', '将乱码粘贴到输入框中。'],
  [
    'Review restoration candidates from the guessed encodings.',
    '查看根据推测编码生成的恢复候选结果。',
  ],
  ['Copy the candidate that reads correctly.', '复制显示正确的候选结果。'],
  [
    'If the original bytes are lost, full recovery may be impossible.',
    '如果原始字节已丢失，可能无法完全恢复。',
  ],
  [
    'Text mangled through several bad conversions is harder to restore.',
    '经过多次错误转换而损坏的文本更难恢复。',
  ],
  [
    'Paste text to detect whitespace, zero-width characters, and direction controls.',
    '粘贴文本以检测空白字符、零宽字符和方向控制字符。',
  ],
  [
    'Use the visualized preview, Unicode code points, and JavaScript notation to find each occurrence.',
    '使用可视化预览、Unicode 码点和 JavaScript 表示法定位每处字符。',
  ],
  [
    'Copy or apply the text without detected characters when appropriate. The catalog copies the actual character.',
    '适当时可复制或应用移除检测字符后的文本。字符目录复制的是实际字符。',
  ],
  [
    'Some invisible characters are required for joining, language shaping, emoji, or text direction. Check their purpose before removing them.',
    '某些不可见字符对字符连接、文字塑形、表情符号或文本方向至关重要。删除前请确认其用途。',
  ],
  [
    'U+200D (zero-width joiner) is used in emoji sequences. Do not remove U+200C or direction controls indiscriminately.',
    'U+200D（零宽连接符）用于表情符号序列。请勿不加区分地删除 U+200C 或方向控制字符。',
  ],
  [
    'Input is processed in the browser and is not sent anywhere.',
    '输入内容在浏览器中处理，不会发送到任何地方。',
  ],
  ['Enter the text to analyze.', '输入要分析的文本。'],
  ['Review stats like character, word and line counts.', '查看字符数、单词数、行数等统计信息。'],
  [
    'Apply case conversion (upper, lower, camelCase, etc.) and copy.',
    '应用大小写转换（大写、小写、camelCase 等）并复制。',
  ],
  [
    'Emoji and combining characters may count differently than expected.',
    '表情符号和组合字符的计数结果可能与预期不同。',
  ],
  ['Enter the two texts to compare on each side.', '在两侧分别输入要比较的两段文本。'],
  ['Additions and deletions are highlighted.', '新增和删除的内容会高亮显示。'],
  ['Review the diff to guide your edits.', '查看差异以辅助修改。'],
  [
    'Comparison runs in the browser; text is never sent anywhere.',
    '比较在浏览器中进行；文本不会发送到任何地方。',
  ],
  [
    'Differences in whitespace and line endings are also detected.',
    '空白字符和换行符差异也会被检测出来。',
  ],
  ['Enter the list, one item per line.', '逐行输入列表项。'],
  [
    'Choose operations: sort, deduplicate, wrap each line, and more.',
    '选择操作：排序、去重、为每行添加前后缀等。',
  ],
  ['Copy the transformed list.', '复制转换后的列表。'],
  [
    'Deduplication and sorting are affected by surrounding whitespace and letter case.',
    '去重和排序会受首尾空白字符及字母大小写影响。',
  ],
  ['Type Markdown into the left editor.', '在左侧编辑器中输入 Markdown。'],
  ['A live rendering appears on the right.', '右侧会实时显示渲染结果。'],
  ['Edit while watching the preview.', '查看预览并同步编辑内容。'],
  [
    'The preview sanitises HTML for safety—embedded scripts do not run.',
    '为保证安全，预览会清理 HTML；其中的嵌入脚本不会执行。',
  ],
  [
    'Rendering may differ from platform-specific Markdown flavours (e.g. GitHub).',
    '渲染效果可能与特定平台的 Markdown 方言（例如 GitHub）不同。',
  ],
  ['Write the diagram in Mermaid syntax.', '使用 Mermaid 语法编写图表。'],
  ['Check the preview renders correctly.', '检查预览是否正确渲染。'],
  ['Export the finished diagram as an image.', '将完成的图表导出为图片。'],
  [
    'Syntax errors stop rendering and show an error instead.',
    '出现语法错误时将停止渲染并显示错误。',
  ],
  [
    'Supported diagram types and syntax depend on the Mermaid version.',
    '支持的图表类型和语法取决于 Mermaid 版本。',
  ],
  ['Enter the text or URL to encode.', '输入要编码的文本或 URL。'],
  ['Adjust the size and error-correction level.', '调整尺寸和纠错级别。'],
  ['Save the generated QR code as an image.', '将生成的二维码保存为图片。'],
  [
    'Very long text makes the QR code dense and harder to scan.',
    '文本过长会使二维码更加密集、更难扫描。',
  ],
  [
    'A higher error-correction level tolerates damage but makes the code denser.',
    '较高的纠错级别可以容忍更多损坏，但会使二维码更密集。',
  ],
  ['Pick an image file to convert it to a Data URL.', '选择图片文件，将其转换为 Data URL。'],
  ['Or paste a Data URL to turn it back into an image.', '也可以粘贴 Data URL，将其还原为图片。'],
  ['Copy or save the Data URL or the image.', '复制或保存 Data URL 或图片。'],
  [
    'Conversion runs in the browser; images are never uploaded.',
    '转换在浏览器中进行；图片不会上传。',
  ],
  [
    'A Data URL is ~33% larger than the source—avoid it for big images.',
    'Data URL 比源文件大约大 33%；请避免用于大型图片。',
  ],
  ['Paste SVG code or load a file.', '粘贴 SVG 代码或加载文件。'],
  ['Strip unnecessary metadata to get an optimised SVG.', '移除不必要的元数据，获得优化后的 SVG。'],
  [
    'Copy the optimised SVG or a CSS-ready data URI.',
    '复制优化后的 SVG 或可用于 CSS 的 Data URI。',
  ],
  ['Optimisation drops some editor-specific metadata.', '优化过程会移除部分编辑器专属元数据。'],
  [
    'SVGs with scripts or external references may render or behave differently.',
    '包含脚本或外部引用的 SVG 可能会出现不同的渲染效果或行为。',
  ],
  ['Load an image file.', '加载图片文件。'],
  [
    'Set the output format (WebP/AVIF) plus size and quality.',
    '设置输出格式（WebP/AVIF）、尺寸和质量。',
  ],
  ['Download the converted image.', '下载转换后的图片。'],
  [
    'Processing runs in the browser; images are never uploaded.',
    '处理在浏览器中进行；图片不会上传。',
  ],
  [
    'Lossy formats degrade quality—tune the quality setting.',
    '有损格式会降低画质；请调整质量设置。',
  ],
  ['Large images or AVIF conversion can take a while.', '大型图片或 AVIF 转换可能需要一些时间。'],
  ['Load several image files at once.', '一次加载多个图片文件。'],
  ['Choose the output format (PNG/JPEG/WebP/AVIF).', '选择输出格式（PNG/JPEG/WebP/AVIF）。'],
  ['Download the results individually or together.', '单独下载结果或一次性下载全部结果。'],
  [
    'JPEG has no transparency—transparent areas are filled with a background colour.',
    'JPEG 不支持透明度；透明区域会填充背景色。',
  ],
  ['Load one or more images to compress.', '加载一张或多张图片进行压缩。'],
  ['Adjust the quality or compression strength.', '调整画质或压缩强度。'],
  ['Download the smaller images.', '下载压缩后的较小图片。'],
  [
    'It keeps the format while shrinking—over-compression hurts quality.',
    '压缩时会保留原格式；过度压缩会损害画质。',
  ],
  ['Load an image.', '加载图片。'],
  ['Pick the colour to knock out and a tolerance.', '选择要抠除的颜色和容差。'],
  ['Export the transparent PNG.', '导出透明 PNG。'],
  [
    'Too wide a tolerance eats into the subject’s edges—tune it carefully.',
    '容差过大会侵蚀主体边缘；请谨慎调整。',
  ],
  ['Load a HEIC photo (e.g. from an iPhone).', '加载 HEIC 照片（例如 iPhone 拍摄的照片）。'],
  ['Choose the output format (JPEG or PNG).', '选择输出格式（JPEG 或 PNG）。'],
  [
    'EXIF capture data in the HEIC may be lost on conversion.',
    '转换时可能会丢失 HEIC 中的 EXIF 拍摄信息。',
  ],
  [
    'Some browsers or unusual HEIC files may fail to convert.',
    '某些浏览器或特殊 HEIC 文件可能无法转换。',
  ],
  [
    'Inspect EXIF such as capture time, camera and location.',
    '查看拍摄时间、相机和位置等 EXIF 信息。',
  ],
  ['Optionally export a copy with EXIF removed.', '也可以导出已移除 EXIF 的副本。'],
  [
    'Photos can embed location (e.g. your home)—consider stripping it before sharing.',
    '照片可能嵌入位置信息（例如住址）；分享前请考虑将其移除。',
  ],
  [
    'Enter an IPv4 address and CIDR prefix (e.g. 192.168.1.0/24).',
    '输入 IPv4 地址和 CIDR 前缀（例如 192.168.1.0/24）。',
  ],
  ['Read the network, broadcast and usable host range.', '查看网络地址、广播地址和可用主机范围。'],
  [
    'Special prefixes like /31 and /32 handle usable-host counts differently.',
    '对于 /31、/32 等特殊前缀，可用主机数的计算方式有所不同。',
  ],
  ['Enter an IPv4 or IPv6 CIDR.', '输入 IPv4 或 IPv6 CIDR。'],
  ['Read the address range and count.', '查看地址范围和地址数量。'],
  ['Test containment or split into subnets.', '测试地址是否包含在范围内，或将其划分为子网。'],
  [
    'IPv6 ranges are vast, so totals may be shown approximately.',
    'IPv6 地址范围很大，因此总数可能为近似值。',
  ],
  ['Paste the URL to parse.', '粘贴要解析的 URL。'],
  [
    'Its scheme, host, path and query are broken out.',
    'URL 的协议、主机、路径和查询参数会分别列出。',
  ],
  ['Review the query parameters in a list.', '在列表中查看查询参数。'],
  [
    'Parsing runs in the browser; the URL is never sent anywhere.',
    '解析在浏览器中进行；URL 不会发送到任何地方。',
  ],
  [
    'Encoded parameters are shown decoded—do not confuse them with the raw value.',
    '编码后的参数会以解码形式显示；请勿将其与原始值混淆。',
  ],
  ['Enter the domain name to look up.', '输入要查询的域名。'],
  ['Read the registrar, dates and status.', '查看注册商、日期和状态。'],
  [
    'The lookup queries a free public RDAP service and sends the domain name.',
    '查询会访问免费的公共 RDAP 服务，并发送域名。',
  ],
  ['Registrant details may be hidden by privacy protection.', '注册人信息可能因隐私保护而被隐藏。'],
  ['Some TLDs expose only limited information.', '某些顶级域名（TLD）仅公开有限信息。'],
  ['Enter the page URL to check.', '输入要检查的页面 URL。'],
  [
    'The free Microlink API loads its Open Graph and X Card tags.',
    'Microlink 免费 API 会读取页面的 Open Graph 和 X Card 标签。',
  ],
  ['Preview how it will look when shared.', '预览分享时的显示效果。'],
  [
    'The entered URL is sent to Microlink; its free plan currently allows 25 requests per day.',
    '输入的 URL 会发送给 Microlink；其免费计划目前每天最多允许 25 次请求。',
  ],
  [
    'Actual social previews depend on each platform’s cache and rules and may differ.',
    '实际社交媒体预览取决于各平台的缓存和规则，可能与此处不同。',
  ],
  [
    'Open the page to see the connection info the browser exposes.',
    '打开页面即可查看浏览器公开的连接信息。',
  ],
  ['Read values like connection type and effective speed.', '查看连接类型和有效速度等信息。'],
  [
    'Values are browser estimates and may not reflect real link speed.',
    '这些数值是浏览器估算值，可能无法反映实际网速。',
  ],
  ['Some browsers do not expose this information.', '某些浏览器不会公开此信息。'],
  ['Grant permission to access your location.', '授予位置访问权限。'],
  ['Latitude, longitude and accuracy are shown.', '将显示纬度、经度和精度。'],
  ['Confirm your position on the map.', '在地图上确认你的位置。'],
  [
    'Location access requires browser permission; coordinates stay on your device.',
    '访问位置需要浏览器授权；坐标仅保留在你的设备上。',
  ],
  ['Accuracy can drop indoors or on some hardware.', '在室内或某些设备上，定位精度可能降低。'],
  ['Grant permission to use the camera.', '授予相机使用权限。'],
  ['Frame the shot using the live preview.', '通过实时预览调整取景。'],
  ['Capture and save the photo as a PNG.', '拍摄照片并将其保存为 PNG。'],
  [
    'Camera access requires browser permission; captured images stay on your device.',
    '使用相机需要浏览器授权；拍摄的图像仅保留在你的设备上。',
  ],
  [
    'If you have multiple cameras, you can switch between them.',
    '如果有多个相机，可以在它们之间切换。',
  ],
  ['Hold a QR code or barcode up to the camera.', '将二维码或条形码对准相机。'],
  ['The decoded content is displayed.', '解码内容将显示出来。'],
  [
    'Camera access requires browser permission; scanning happens on your device.',
    '使用相机需要浏览器授权；扫描在你的设备上进行。',
  ],
  [
    'Before opening a scanned URL, confirm it is a link you trust.',
    '打开扫描得到的 URL 前，请确认这是可信链接。',
  ],
  [
    'Open the page to list the device details the browser exposes.',
    '打开页面即可查看浏览器公开的设备信息。',
  ],
  ['Review screen, battery, CPU and network entries.', '查看屏幕、电池、CPU 和网络信息。'],
  [
    'Only what the browser exposes is shown, and nothing is sent anywhere.',
    '仅显示浏览器公开的信息，且不会发送到任何地方。',
  ],
  [
    'Some entries (e.g. battery) are unsupported in certain browsers.',
    '某些浏览器不支持部分信息项（例如电池信息）。',
  ],
  ['Toggle the direction.', '切换转换方向。'],
  ['Copy the generated value.', '复制生成的值。'],
  ['Tab indentation is invalid—use spaces.', '制表符缩进无效，请使用空格。'],
] as const
