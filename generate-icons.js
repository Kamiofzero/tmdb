const fs = require('fs');
const path = require('path');

// 创建public目录
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 简单的SVG图标模板
const svgTemplate = (size, text) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size/8}" fill="#667eea"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/4}" 
        fill="white" text-anchor="middle" dy=".3em" font-weight="bold">TMDB</text>
</svg>`;

// 创建图标文件
const icons = [
  { name: 'favicon.ico', size: 32 },
  { name: 'pwa-64x64.png', size: 64 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'maskable-icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'masked-icon.svg', size: 512 }
];

console.log('Generating PWA icons...');

// 对于PNG文件，我们创建占位符SVG文件，实际项目中应该使用真实的PNG图标
icons.forEach(icon => {
  const filePath = path.join(publicDir, icon.name);
  
  if (icon.name.endsWith('.svg')) {
    fs.writeFileSync(filePath, svgTemplate(icon.size, 'TMDB'));
    console.log(`Created: ${icon.name} (${icon.size}x${icon.size})`);
  } else if (icon.name.endsWith('.ico')) {
    // 对于ICO文件，创建一个简单的文本文件作为占位符
    fs.writeFileSync(filePath, 'Favicon placeholder - replace with real .ico file');
    console.log(`Created placeholder: ${icon.name}`);
  } else {
    // 对于PNG文件，创建SVG占位符（实际项目中应该使用真实的PNG）
    const svgPath = filePath.replace('.png', '.svg');
    fs.writeFileSync(svgPath, svgTemplate(icon.size, 'TMDB'));
    console.log(`Created SVG placeholder for: ${icon.name} (${icon.size}x${icon.size})`);
  }
});

// 创建manifest文件
const manifest = {
  name: "TMDB PWA",
  short_name: "TMDB",
  description: "TMDB Movie PWA Application",
  theme_color: "#667eea",
  background_color: "#ffffff",
  display: "standalone",
  scope: "/",
  start_url: "/",
  orientation: "portrait",
  icons: [
    {
      src: "pwa-64x64.png",
      sizes: "64x64",
      type: "image/png"
    },
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "maskable-icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable"
    }
  ]
};

fs.writeFileSync(
  path.join(publicDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Created: manifest.json');
console.log('\nNote: For production, replace SVG placeholders with actual PNG icons.');
console.log('You can use tools like: https://realfavicongenerator.net/');