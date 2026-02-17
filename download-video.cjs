/**
 * Video Download Helper Script
 * 
 * This script helps you download a mango farm video for the homepage background.
 * 
 * Usage:
 *   node download-video.cjs
 * 
 * Or manually:
 *   1. Visit: https://www.pexels.com/video/mango-farm-8327723/
 *   2. Click "Free Download" and select 1920x1080 or higher
 *   3. Save as: public/videos/mango-farm.mp4
 * 
 * Note: The downloaded video (~167 MB) is gitignored and won't be committed.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Free mango farm video from Pexels
const VIDEO_URL = 'https://videos.pexels.com/video-files/3044127/3044127-hd_1920_1080_30fps.mp4';
const OUTPUT_PATH = path.join(__dirname, 'public', 'videos', 'mango-farm.mp4');

console.log('🥭 Mango Video Downloader');
console.log('========================\n');

console.log('Video URL:', VIDEO_URL);
console.log('Output Path:', OUTPUT_PATH);
console.log('\nDownloading... This may take a few minutes depending on your connection.\n');

const file = fs.createWriteStream(OUTPUT_PATH);
let downloadedBytes = 0;

https.get(VIDEO_URL, (response) => {
  const totalBytes = parseInt(response.headers['content-length'], 10);
  
  response.on('data', (chunk) => {
    downloadedBytes += chunk.length;
    const percentage = ((downloadedBytes / totalBytes) * 100).toFixed(2);
    process.stdout.write(`\rProgress: ${percentage}% (${(downloadedBytes / 1024 / 1024).toFixed(2)} MB / ${(totalBytes / 1024 / 1024).toFixed(2)} MB)`);
  });

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('\n\n✅ Video downloaded successfully!');
    console.log(`📁 Saved to: ${OUTPUT_PATH}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Update Hero.jsx to use: /videos/mango-farm.mp4');
    console.log('   2. Restart your dev server');
    console.log('   3. Refresh your browser\n');
  });
}).on('error', (err) => {
  fs.unlink(OUTPUT_PATH, () => {}); // Delete the file if error
  console.error('\n❌ Error downloading video:', err.message);
  console.log('\n💡 Manual download instructions:');
  console.log('   1. Visit: https://www.pexels.com/video/mango-farm-8327723/');
  console.log('   2. Click "Free Download"');
  console.log('   3. Select 1920x1080 resolution');
  console.log('   4. Save as: public/videos/mango-farm.mp4\n');
});
