const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'img');
const files = ['bread_.png', 'bread_1.png', 'bread_min.png', 'bread_micro.png', 'bread2.png', 'l_wheat.png', 'r_wheat.png'];

async function optimizeImages() {
  console.log('Starting image optimization...\n');
  
  for (const file of files) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, file.replace('.png', '.avif'));
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${file} not found, skipping`);
      continue;
    }
    
    try {
      const stats = fs.statSync(inputPath);
      const inputSize = (stats.size / 1024).toFixed(2);
      
      await sharp(inputPath)
        .avif({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const outputSize = (outputStats.size / 1024).toFixed(2);
      const savings = ((1 - outputStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`✅ ${file}`);
      console.log(`   ${inputSize}KB → ${outputSize}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('Image optimization complete!');
}

optimizeImages();
