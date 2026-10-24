export const toolGuideFirstHalfChineseCopy: readonly [string, string][] = [
  ['Choose the brush colour and size.', '选择画笔颜色和粗细。'],
  ['Drag on the canvas to draw freely.', '在画布上拖动即可自由绘制。'],
  ['Save the finished sketch as a PNG image.', '将完成的草图保存为 PNG 图片。'],
  [
    'Drawings are not stored—reloading clears the canvas, so save when needed.',
    '绘图不会保存；重新加载页面会清空画布，需要时请先保存。',
  ],
  [
    'Touch input works, but a mouse or stylus is better for fine detail.',
    '支持触控操作，但绘制细节时使用鼠标或触控笔效果更好。',
  ],
  [
    'Paste a cURL command copied from your terminal into the input.',
    '将从终端复制的 cURL 命令粘贴到输入框中。',
  ],
  [
    'Choose the target language and library (JavaScript, Python, and more).',
    '选择目标语言和库（JavaScript、Python 等）。',
  ],
  [
    'Copy the generated code and drop it straight into your project.',
    '复制生成的代码并直接粘贴到项目中。',
  ],
  [
    'Conversion runs entirely in your browser; the command is never sent anywhere.',
    '转换完全在浏览器中进行，命令不会发送到任何地方。',
  ],
  [
    'Secrets in the cURL (API keys, tokens) are copied verbatim into the output. Remove them before sharing.',
    'cURL 中的密钥（API 密钥、令牌）会原样复制到输出中。分享前请先移除。',
  ],
  [
    'Exotic flags or complex shell expansion may not be interpreted.',
    '特殊参数或复杂的 Shell 展开语法可能无法解析。',
  ],
  ['Paste a JSON array or CSV into the input.', '将 JSON 数组或 CSV 粘贴到输入框中。'],
  ['Toggle the direction (JSON→CSV or CSV→JSON).', '切换转换方向（JSON→CSV 或 CSV→JSON）。'],
  ['Review the result, then copy or download it.', '检查结果，然后复制或下载。'],
  [
    'JSON is expected to be an array of objects; nested values may be stringified.',
    'JSON 应为对象数组；嵌套值可能会被转换为字符串。',
  ],
  [
    'Missing fields or differing key orders can shift columns.',
    '缺少字段或键顺序不一致可能导致列错位。',
  ],
  ['Paste YAML or JSON into the input.', '将 YAML 或 JSON 粘贴到输入框中。'],
  [
    'Pick the direction to convert instantly to the other format.',
    '选择转换方向，即可立即转换为另一种格式。',
  ],
  ['Copy the formatted result.', '复制格式化后的结果。'],
  [
    'YAML comments and anchors are lost when converting to JSON.',
    '转换为 JSON 时，YAML 注释和锚点会丢失。',
  ],
  ['Tab indentation is invalid in YAML—use spaces.', 'YAML 不允许使用 Tab 缩进，请使用空格。'],
  ['Paste JSON or TOML into the input.', '将 JSON 或 TOML 粘贴到输入框中。'],
  ['Switch the direction to obtain the other format.', '切换转换方向以获取另一种格式。'],
  ['Copy the result into your config file.', '复制结果并粘贴到配置文件中。'],
  [
    'TOML has native types (dates, arrays of tables); a round trip may change representation.',
    'TOML 有原生类型（日期、表数组）；往返转换可能会改变表示形式。',
  ],
  ['Deeply nested structures become verbose in TOML.', '在 TOML 中，深层嵌套结构会变得冗长。'],
  ['Paste JSON or XML into the input.', '将 JSON 或 XML 粘贴到输入框中。'],
  ['Select the conversion direction.', '选择转换方向。'],
  ['Copy the generated result.', '复制生成的结果。'],
  [
    'XML attributes, namespaces and text nodes map to a fixed JSON shape, so round trips may alter structure.',
    'XML 属性、命名空间和文本节点会映射为固定的 JSON 结构，因此往返转换可能改变结构。',
  ],
  ['XML declarations and comments may not be preserved.', 'XML 声明和注释可能无法保留。'],
  ['Enter a colour as HEX, RGB or HSL.', '以 HEX、RGB 或 HSL 格式输入颜色。'],
  [
    'Read the value automatically converted to the other notations.',
    '查看自动转换为其他表示法的数值。',
  ],
  [
    'Check the WCAG contrast ratio for the foreground/background pair.',
    '检查前景色与背景色组合的 WCAG 对比度。',
  ],
  [
    'Aim for 4.5:1 for body text and 3:1 for large text (WCAG AA).',
    '普通文本建议达到 4.5:1，大号文本建议达到 3:1（WCAG AA）。',
  ],
  [
    'Colours with alpha have an effective contrast that depends on the backdrop.',
    '带 Alpha 透明度的颜色，其实际对比度取决于背景。',
  ],
  ['Type a value into any base field.', '在任意进制输入框中输入数值。'],
  ['Every base from 2 to 36 updates at once.', '2 到 36 进制的结果会同时更新。'],
  ['Copy the representation you need.', '复制所需进制的表示结果。'],
  ['Integers only—fractional values are not converted.', '仅支持整数，不转换小数。'],
  [
    'Very large values may be rounded at the precision limit.',
    '数值过大时可能会因精度限制而舍入。',
  ],
  [
    'Pick a category (length, weight, data size, and more).',
    '选择类别（长度、重量、数据大小等）。',
  ],
  ['Enter a value in any unit.', '以任意单位输入数值。'],
  ['Read the converted values listed for the other units.', '查看其他单位对应的换算结果。'],
  [
    'Rounding differences can appear for high-precision conversions.',
    '高精度换算可能出现舍入差异。',
  ],
  [
    'Data sizes distinguish 1 KB = 1000 B (decimal) from 1 KiB = 1024 B (binary).',
    '数据单位区分 1 KB = 1000 B（十进制）和 1 KiB = 1024 B（二进制）。',
  ],
  ['Enter a Unix timestamp or a date/time.', '输入 Unix 时间戳或日期/时间。'],
  [
    'It converts at once to ISO 8601, local time and more.',
    '内容会立即转换为 ISO 8601、本地时间等格式。',
  ],
  [
    'Check digit count so you do not confuse seconds with milliseconds.',
    '请检查位数，避免混淆秒和毫秒。',
  ],
  ['Local time depends on your device timezone setting.', '本地时间取决于设备的时区设置。'],
  ['Set a reference city and moment.', '设置参考城市和时间点。'],
  ['Add the cities you want to compare.', '添加要比较的城市。'],
  ['See what that same instant is in each city.', '查看同一时刻在各城市对应的当地时间。'],
  [
    'Around daylight-saving transitions the actual offset changes.',
    '夏令时切换前后，实际时差会发生变化。',
  ],
  [
    'Recent DST rule changes in some regions may not be reflected.',
    '部分地区最近的 DST 规则变更可能尚未反映。',
  ],
  [
    'Edit each field (minute, hour, day, month, weekday) to build the expression.',
    '编辑各字段（分钟、小时、日、月、星期）以构建表达式。',
  ],
  ['Read the plain-language description to confirm it.', '阅读自然语言说明以确认表达式含义。'],
  ['Check the upcoming scheduled run times.', '查看接下来的计划运行时间。'],
  [
    'Weekday numbering and macros (e.g. @yearly) vary by scheduler—verify against your runtime.',
    '星期编号和宏（例如 @yearly）因调度器而异，请以运行环境的规则为准。',
  ],
  ['Next run times are computed in your device timezone.', '下次运行时间按设备时区计算。'],
  ['Type an expression as-is (e.g. (1+2)*3).', '直接输入算式（例如 (1+2)*3）。'],
  ['Press Enter to evaluate.', '按 Enter 键计算。'],
  ['Reuse earlier results from the history.', '从历史记录中重用先前的结果。'],
  [
    'Floating-point arithmetic can introduce tiny rounding errors.',
    '浮点运算可能产生微小的舍入误差。',
  ],
  ['Choose the angle mode (degrees or radians).', '选择角度模式（角度或弧度）。'],
  [
    'Build the expression with trig, log and power functions.',
    '使用三角函数、对数和幂函数构建算式。',
  ],
  [
    'The wrong angle mode changes trigonometric results.',
    '角度模式设置错误会改变三角函数的计算结果。',
  ],
  [
    'Out-of-domain inputs (e.g. square root of a negative) yield NaN.',
    '超出定义域的输入（例如负数开平方）会得到 NaN。',
  ],
  ['Set the countdown in hours, minutes and seconds.', '设置倒计时时长（小时、分钟、秒）。'],
  ['Press start to begin.', '按“开始”启动。'],
  ['A chime sounds when it reaches zero.', '倒计时到零时会响铃提示。'],
  [
    'When the tab is inactive, browser power-saving can drift the count.',
    '标签页处于非活动状态时，浏览器的省电机制可能导致计时偏差。',
  ],
  [
    'For the chime to play, check device/browser volume and silent settings.',
    '如需播放提示音，请检查设备和浏览器音量及静音设置。',
  ],
  ['Press start to begin timing.', '按“开始”启动计时。'],
  ['Tap lap to record splits.', '点击“计圈”记录分段时间。'],
  ['Stop and reset when finished.', '完成后停止并重置。'],
  [
    'Display updates may be throttled while the tab is inactive.',
    '标签页处于非活动状态时，显示刷新可能会被节流。',
  ],
  ['Reloading the page resets the measurement.', '重新加载页面会重置计时。'],
  ['Choose the style (117-style voice or a chime).', '选择提示方式（117 风格语音或报时音）。'],
  ['Press play to announce the current time.', '按“播放”播报当前时间。'],
  [
    'The first playback requires a user gesture (browser autoplay policy).',
    '根据浏览器自动播放策略，首次播放需要用户手动操作。',
  ],
  ['The announced time is based on your device clock.', '播报时间基于设备时钟。'],
  ['Add the cities you want to watch.', '添加要查看的城市。'],
  ['Each city’s current time updates live, side by side.', '各城市的当前时间会并排实时更新。'],
  ['Remove or reorder cities as needed.', '可按需移除或重新排列城市。'],
  ['Times rely on your device clock and timezone data.', '时间显示依赖设备时钟和时区数据。'],
  ['Offsets change around daylight-saving transitions.', '夏令时切换前后，时差会发生变化。'],
  ['Enter the base date.', '输入基准日期。'],
  [
    'For a difference, set two dates; for add/subtract, set the amount.',
    '计算日期差时设置两个日期；加减日期时设置时间量。',
  ],
  ['Read the resulting duration or date.', '查看计算出的时间跨度或日期。'],
  [
    'Mind whether the start date is counted in a duration.',
    '请留意计算时是否将开始日期计入时间跨度。',
  ],
  ['Timezones and leap years can shift date boundaries.', '时区和闰年可能影响日期边界。'],
  [
    'Enter text to encode, or a Base64 string to decode.',
    '输入要编码的文本，或要解码的 Base64 字符串。',
  ],
  ['Toggle the direction (JSON→CSV or CSV→JSON).', '切换转换方向（JSON→CSV 或 CSV→JSON）。'],
  ['Copy the result.', '复制结果。'],
  [
    'Base64 is encoding, not encryption—anyone can decode it.',
    'Base64 是编码方式，不是加密；任何人都可以解码。',
  ],
  [
    'URL-safe Base64 (using -_) uses different symbols than the standard variant.',
    'URL-safe Base64（使用 -_）与标准版本使用的符号不同。',
  ],
  ['Enter the string to encode or decode.', '输入要编码或解码的字符串。'],
  ['Choose the direction.', '选择转换方向。'],
  ['Copy the result for use in a URL.', '复制结果并用于 URL。'],
  [
    'A whole URL vs. a single component needs a different escaping scope.',
    '完整 URL 与单个组件需要采用不同的转义范围。',
  ],
  [
    'Encoding an already-encoded string produces double encoding.',
    '对已经编码的字符串再次编码会造成双重编码。',
  ],
  ['Enter text to escape, or HTML to unescape.', '输入要转义的文本，或要反转义的 HTML。'],
  ['Copy the result into your markup.', '复制结果并粘贴到标记语言中。'],
  [
    'Converts special characters like < > & " ’ to entities.',
    '将 < > & " ’ 等特殊字符转换为实体。',
  ],
  [
    'Escaping is for display; safely rendering untrusted input needs context-aware handling too.',
    '转义用于显示；安全呈现不可信输入还需要根据上下文进行处理。',
  ],
  ['Paste a JWT into the input.', '将 JWT 粘贴到输入框中。'],
  [
    'The header, payload and standard claims (exp/iat, etc.) are decoded.',
    '解码 Header、Payload 和标准声明（如 exp/iat 等）。',
  ],
  ['Enter the secret or public key to verify the signature.', '输入密钥或公钥以验证签名。'],
  [
    'Verification runs in the browser; tokens and keys are never sent anywhere.',
    '验证在浏览器中进行；令牌和密钥不会发送到任何地方。',
  ],
  ['Do not paste production secrets on a shared machine.', '请勿在公用设备上粘贴生产密钥。'],
  [
    'JWT payloads are not encrypted—anyone can read their contents.',
    'JWT Payload 未加密，任何人都可以读取其内容。',
  ],
  ['Enter the message and the shared secret.', '输入消息和共享密钥。'],
  ['Choose the hash algorithm (e.g. SHA-256).', '选择哈希算法（例如 SHA-256）。'],
  ['Copy the generated HMAC.', '复制生成的 HMAC。'],
  [
    'Computed in the browser; the secret is never sent anywhere.',
    '在浏览器中计算，密钥不会发送到任何地方。',
  ],
  [
    'Output casing and encoding (hex / Base64) must match the verifying side.',
    '输出大小写和编码格式（hex / Base64）必须与验证端一致。',
  ],
  ['Enter a username and password to generate the header.', '输入用户名和密码以生成 Header。'],
  [
    'Or paste an existing Authorization header to decode it.',
    '也可以粘贴现有的 Authorization Header 进行解码。',
  ],
  [
    'Basic auth is Base64-encoded, not encrypted—always use it over HTTPS.',
    'Basic Auth 使用 Base64 编码而非加密，请始终通过 HTTPS 使用。',
  ],
  [
    'Keep generated credentials out of logs and shared links.',
    '不要将生成的凭据留在日志或共享链接中。',
  ],
  ['Enter the string to escape.', '输入要转义的字符串。'],
  [
    'Pick the target context (JSON, JavaScript, SQL or regex).',
    '选择目标上下文（JSON、JavaScript、SQL 或正则表达式）。',
  ],
  ['Copy the escaped or unescaped result.', '复制转义或反转义后的结果。'],
  [
    'Escaping rules differ per context—pick the mode that matches your use.',
    '不同上下文的转义规则不同，请选择符合用途的模式。',
  ],
  [
    'SQL escaping is a convenience; use parameterised queries to prevent injection.',
    'SQL 转义仅为便利功能；请使用参数化查询防止注入攻击。',
  ],
  ['Paste the JSON to format.', '粘贴要格式化的 JSON。'],
  ['Adjust options such as indent width.', '调整缩进宽度等选项。'],
  ['Copy the formatted, validated result.', '复制格式化并验证后的结果。'],
  ['Syntax errors are reported with their location.', '语法错误会标出所在位置。'],
  [
    'Comments (JSONC) and trailing commas are invalid in standard JSON.',
    '注释（JSONC）和尾随逗号在标准 JSON 中无效。',
  ],
  ['Paste the SQL query to format.', '粘贴要格式化的 SQL 查询。'],
  ['Keywords and indentation are tidied up.', '关键字大小写和缩进会整理优化。'],
  [
    'Dialect-specific syntax (MySQL, PostgreSQL, etc.) may not format perfectly.',
    '方言专属语法（MySQL、PostgreSQL 等）可能无法完美格式化。',
  ],
  [
    'Formatting is cosmetic and does not change query meaning.',
    '格式化仅改变外观，不会改变查询含义。',
  ],
  ['Paste the XML to format.', '粘贴要格式化的 XML。'],
  ['It is re-indented for readability.', '会重新调整缩进以提高可读性。'],
  [
    'The XML must be well-formed before it can be formatted.',
    'XML 必须是格式良好的文档才能进行格式化。',
  ],
  ['CDATA and namespaces are preserved as-is.', 'CDATA 和命名空间会原样保留。'],
  ['Paste the YAML to format.', '粘贴要格式化的 YAML。'],
  ['Indentation is normalised.', '缩进会规范化。'],
  ['Comments and original quoting style may be lost.', '注释和原始引号风格可能会丢失。'],
  ['Tab indentation is invalid in YAML—use spaces.', 'YAML 不允许使用 Tab 缩进，请使用空格。'],
  ['Paste the CSS to format.', '粘贴要格式化的 CSS。'],
  ['Blocks and properties are tidied for reading.', '代码块和属性会整理为易读格式。'],
  [
    'It only formats—no property optimisation or shorthand rewriting.',
    '此工具仅格式化，不会优化属性或改写简写形式。',
  ],
  [
    'Preprocessor syntax (SCSS/Less) may not be supported.',
    '可能不支持预处理器语法（SCSS/Less）。',
  ],
  ['Paste the HTML to format.', '粘贴要格式化的 HTML。'],
  ['Tags are indented.', '标签会缩进排版。'],
  [
    'Reformatting can change whitespace handling and subtly affect rendering (pre, inline elements).',
    '重新格式化可能改变空白字符处理，并微妙影响渲染（如 pre、行内元素）。',
  ],
  [
    'Contents of script/style blocks may be left untouched.',
    'script/style 代码块内容可能保持不变。',
  ],
  [
    'Choose the ID type (v4, v7, ULID, name-based v3/v5, and more).',
    '选择 ID 类型（v4、v7、ULID、基于名称的 v3/v5 等）。',
  ],
  ['Set the quantity and generate.', '设置数量并生成。'],
  ['Copy the generated IDs at once.', '一次性复制生成的 ID。'],
  ['v4 is random, while v7/ULID are time-sortable.', 'v4 为随机型，v7/ULID 可按时间排序。'],
  [
    'Name-based IDs (v3/v5) always produce the same ID for the same namespace and name.',
    '基于名称的 ID（v3/v5）在相同命名空间和名称下始终生成相同 ID。',
  ],
  [
    'Pick the fields you need (names, addresses, emails, etc.).',
    '选择所需字段（姓名、地址、电子邮件等）。',
  ],
  ['Set the row count and output format (JSON/CSV/SQL).', '设置行数和输出格式（JSON/CSV/SQL）。'],
  ['Copy or download the generated dummy data.', '复制或下载生成的虚拟数据。'],
  [
    'Generated values are fictional and unrelated to real people.',
    '生成的数据均为虚构内容，与真实人物无关。',
  ],
  [
    'They may coincidentally match real values—take care when publishing.',
    '数据可能偶然与真实信息相同，公开发布时请谨慎。',
  ],
  [
    'Set the length and character types (symbols, digits, etc.).',
    '设置长度和字符类型（符号、数字等）。',
  ],
  ['Press generate to create a password.', '按“生成”创建密码。'],
  [
    'Generation runs in the browser; passwords are never sent anywhere.',
    '生成过程在浏览器中进行，密码不会发送到任何地方。',
  ],
  [
    'After use, mind clipboard and history so the value does not linger.',
    '使用后请注意剪贴板和历史记录，避免密码残留。',
  ],
  [
    'Do not reuse across services; store in a password manager.',
    '不要在多个服务间重复使用密码；请使用密码管理器保存。',
  ],
  [
    'Choose the text type (Lorem Ipsum or Japanese filler).',
    '选择文本类型（Lorem Ipsum 或日文占位文本）。',
  ],
  [
    'Set the unit (paragraphs, sentences, words) and amount.',
    '设置单位（段落、句子、单词）和数量。',
  ],
  ['Copy the generated placeholder text.', '复制生成的占位文本。'],
  [
    'Placeholder text is meaningless—use it as filler for design checks.',
    '占位文本没有实际含义，仅用于设计检查时填充内容。',
  ],
  ['Set the badge label, message and colour.', '设置徽章标签、消息和颜色。'],
  ['Pick the provider (Shields.io / Badgen.net).', '选择服务提供方（Shields.io / Badgen.net）。'],
  ['Copy it as Markdown, HTML or a URL.', '将其复制为 Markdown、HTML 或 URL。'],
  [
    'Badge images are served by external services like Shields.io and need a network connection.',
    '徽章图片由 Shields.io 等外部服务提供，需要网络连接才能显示。',
  ],
  [
    'Dynamic badges (build status, etc.) depend on the upstream service.',
    '动态徽章（构建状态等）依赖上游服务。',
  ],
  [
    'Use Browse & search to find emoji by name, keyword, character, Unicode code point, or HTML entity. You can also filter by category.',
    '使用“浏览与搜索”，可按名称、关键词、字符、Unicode 码位或 HTML 实体查找表情符号，也可按类别筛选。',
  ],
  [
    'Select an emoji to inspect and copy its character, Unicode code points, or hexadecimal/decimal HTML entities.',
    '选择表情符号后，可查看并复制其字符、Unicode 码位或十六进制/十进制 HTML 实体。',
  ],
  [
    'Search "ZWJ" to find only sequences that join multiple emoji with the zero-width joiner (U+200D), such as family or profession emoji.',
    '搜索“ZWJ”可仅查找由零宽连接符（U+200D）组合的多表情序列，例如家庭或职业表情符号。',
  ],
  [
    'Copy the current search results as a tab-separated list of emoji, name, Unicode, and HTML in one go.',
    '可一次性将当前搜索结果复制为制表符分隔列表，包含表情符号、名称、Unicode 和 HTML。',
  ],
  [
    'Use Random generate to choose a category and count, then create individual emoji or ZWJ sequences.',
    '使用“随机生成”选择类别和数量，然后生成单个表情符号或 ZWJ 序列。',
  ],
  [
    'The catalog covers every emoji in the current Unicode emoji standard (skin-tone variants excluded); Japanese names come from CLDR short names.',
    '目录收录当前 Unicode 表情符号标准中的所有表情（不含肤色变体）；日文名称取自 CLDR 短名称。',
  ],
  [
    'Emoji appearance varies by operating system, browser, and font.',
    '表情符号的外观因操作系统、浏览器和字体而异。',
  ],
  [
    'Some emoji contain multiple code points, including a variation selector in the Unicode output.',
    '部分表情符号由多个码位组成，Unicode 输出中可能包含变体选择符。',
  ],
  [
    'ZWJ sequences can render differently across platforms. Copy the actual string when preserving U+200D matters.',
    'ZWJ 序列在不同平台上的显示效果可能不同。需要保留 U+200D 时，请复制实际字符串。',
  ],
  [
    'Use Browse & search to find kaomoji by name, keyword, or the characters themselves; hiragana, katakana, and half-width kana all match the same entries.',
    '使用“浏览与搜索”，可按名称、关键词或颜文字本身查找；输入平假名、片假名或半角假名都能匹配相同条目。',
  ],
  [
    'Click a tile to copy that kaomoji straight to the clipboard.',
    '点击卡片即可将颜文字复制到剪贴板。',
  ],
  [
    'The side panel also shows the selected kaomoji as Unicode code points, HTML entities, and a JS/JSON escape.',
    '侧边栏还会显示所选颜文字的 Unicode 码位、HTML 实体和 JS/JSON 转义形式。',
  ],
  [
    'Use the JS / JSON escape output when embedding a kaomoji in source that has to stay ASCII.',
    '需要保持源码为 ASCII 时，请使用 JS / JSON 转义输出嵌入颜文字。',
  ],
  [
    'Switch to Parts builder to assemble your own from eyes, mouth, outline, arms, and decoration, or hit randomise for a starting point.',
    '切换到“部件构建器”，通过眼睛、嘴巴、轮廓、手臂和装饰组合自己的颜文字，也可点击随机生成获取灵感。',
  ],
  [
    'Unlike emoji, kaomoji are ordinary character sequences, so a font with uneven widths can distort them.',
    '与表情符号不同，颜文字由普通字符组成，因此字宽不均的字体可能导致变形。',
  ],
  [
    'Kaomoji containing half-width katakana or rare symbols may not survive legacy encodings such as Shift_JIS.',
    '包含半角片假名或罕见符号的颜文字，可能无法在 Shift_JIS 等旧编码中正确保留。',
  ],
  [
    'Art drawn for a monospace font changes shape when rendered with a proportional one.',
    '针对等宽字体设计的颜文字，在比例字体中显示时形状会改变。',
  ],
  [
    'Type the text to decorate; a sample string is previewed until you do.',
    '输入要装饰的文本；输入前会显示示例字符串预览。',
  ],
  [
    'Every style — bold, italic, script, circled, and more — is rendered in the list.',
    '列表会呈现所有样式，包括粗体、斜体、手写体、带圈字符等。',
  ],
  [
    'Use the copy button on a row to take just that style.',
    '点击对应行的复制按钮，即可仅复制该样式。',
  ],
  [
    'The copy button in the header copies every style at once.',
    '标题栏中的复制按钮可一次性复制所有样式。',
  ],
  [
    'This substitutes different Unicode characters rather than applying a font, so screen readers mis-announce it.',
    '此功能是替换为不同的 Unicode 字符，而非应用字体，因此屏幕阅读器可能无法正确朗读。',
  ],
  [
    'Search and sorting will not match the original letters—avoid it for usernames, headings, and body copy.',
    '搜索和排序无法匹配原始字母；请勿用于用户名、标题或正文。',
  ],
  [
    'Strikethrough and underline use combining marks, doubling the character count and rendering unevenly on some platforms.',
    '删除线和下划线使用组合附加符，会使字符数翻倍，且在某些平台上显示不均匀。',
  ],
  [
    'Only ASCII letters and digits are converted; Japanese and punctuation pass through unchanged.',
    '仅转换 ASCII 字母和数字；日文和标点符号保持不变。',
  ],
  [
    'Choose the direction: full-width to half-width, or the reverse.',
    '选择转换方向：全角转半角，或半角转全角。',
  ],
  [
    'Switch on only the classes you want converted: alphanumerics, symbols, katakana, or spaces.',
    '仅启用需要转换的字符类别：字母数字、符号、片假名或空格。',
  ],
  [
    'Optionally convert between hiragana and katakana; that step runs after the width conversion.',
    '也可选择在平假名与片假名之间转换；此步骤会在宽度转换后执行。',
  ],
  [
    'Paste text into the left pane and copy the result from the right.',
    '将文本粘贴到左侧面板，再从右侧面板复制结果。',
  ],
  [
    'Voiced half-width katakana are two characters; widening them composes one, which changes the length.',
    '带浊音符号的半角片假名由两个字符组成；转换为全角时会合成为一个字符，因此长度会变化。',
  ],
  [
    'Narrowing does the opposite and makes the text longer—check the result against any length limit.',
    '转换为半角时情况相反，文本长度会增加；请检查是否超出长度限制。',
  ],
  [
    'Kanji and hiragana have no width variants, so they pass through untouched.',
    '汉字和平假名没有全角/半角变体，因此不会改变。',
  ],
  [
    'The ideographic space (U+3000) is only converted while the Space class is switched on.',
    '只有启用“空格”类别时，表意空格（U+3000）才会转换。',
  ],
]
