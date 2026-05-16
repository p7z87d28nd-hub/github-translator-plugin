# GitHub 中文翻译器

🌐 一个强大的 Chrome 浏览器插件，可以自动将 GitHub 网站的英文内容翻译成中文。

## ✨ 功能特性

- ✅ **自动翻译** - 访问 GitHub 时自动翻译页面内容
- ✅ **无需 API 密钥** - 使用免费的 LibreTranslate 翻译服务
- ✅ **快速切换** - 一键启用/禁用翻译
- ✅ **智能翻译** - 避免重复翻译已翻译的内容
- ✅ **批量处理** - 分批翻译避免请求过载

## 📦 安装方法

### 方法一：手动安装（开发者模式）

1. **克隆或下载此项目**
   ```bash
   git clone https://github.com/p7z87d28nd-hub/github-translator-plugin.git
   ```

2. **打开 Chrome 浏览器**

3. **进入扩展程序页面**
   - 地址栏输入：`chrome://extensions/`
   - 或者：菜单 → 更多工具 → 扩展程序

4. **启用开发者模式**
   - 点击右上角的"开发者模式"开关

5. **加载未打包的扩展**
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

6. **完成！** 现在你可以在 GitHub 上使用翻译器了

## 🎯 使用方法

1. **访问 GitHub** - 打开任何 GitHub 页面
2. **点击插件图标** - 在浏览器工具栏找到翻译器图标
3. **启用/禁用** - 使用弹出窗口中的开关控制翻译
4. **享受体验** - 页面内容会自动翻译为中文

## 🔧 配置说明

### 翻译服务
- **服务提供商**: LibreTranslate（免费开源）
- **API 地址**: https://libretranslate.de/translate
- **支持语言**: 100+ 种语言

### 文件结构
```
github-translator-plugin/
├── manifest.json      # 插件配置文件
├── content.js         # 页面脚本
├── background.js      # 后台脚本
├── popup.html         # 弹窗 HTML
├── popup.js           # 弹窗脚本
├── styles.css         # 样式表
├── icons/             # 插件图标
└── README.md          # 说明文档
```

## ⚙️ 常见问题

### Q: 翻译速度很慢？
A: 由于使用免费翻译服务，翻译速度取决于网络和服务器状态。可以尝试：
- 刷新页面重试
- 稍后再试
- 检查网络连接

### Q: 为什么某些内容没有翻译？
A: 插件会跳过：
- 代码块和代码注释
- 已翻译的内容
- 过短的文本（<3个字符）

### Q: 可以翻译成其他语言吗？
A: 可以！修改 `content.js` 中的 `targetLang` 参数：
- 中文: `zh`
- 日文: `ja`
- 韩文: `ko`
- 西班牙语: `es`
- 等等...

### Q: 如何卸载插件？
A: 
1. 打开 `chrome://extensions/`
2. 找到"GitHub 中文翻译器"
3. 点击"移除"按钮

## 🚀 开发指南

### 修改翻译语言

编辑 `content.js` 第 45 行：
```javascript
targetLang: 'zh'  // 改为想要的语言代码
```

### 调试模式

1. 打开 Chrome DevTools（F12）
2. 查看 Console 标签了解翻译过程

## 📝 许可证

MIT License - 自由使用和修改

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

有问题或建议？欢迎在 GitHub Issues 中提出。

---

**祝你使用愉快！** 🎉
