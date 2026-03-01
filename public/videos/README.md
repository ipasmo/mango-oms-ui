# Background Video Setup

## ⚠️ Important: Video Files Not Included

Video files are **NOT included in this repository** because they exceed GitHub's file size limits (100 MB).

## Current Setup (Default)
The app uses an **online video URL** by default, streaming from Pexels (free stock video service). This requires an internet connection to load.

## Using a Local Video (Optional)

To use a local video file for better performance and offline support:

1. **Download a mango farm video:**
   - Visit [Pexels](https://www.pexels.com/search/videos/mango%20farm/)
   - Or visit [Pixabay](https://pixabay.com/videos/search/mango/)
   - Search for "mango farm" or "mango tree" videos
   - Download a high-quality video (1920x1080 recommended)

2. **Rename and place the video:**
   - Rename the downloaded video to `mango-farm.mp4`
   - Place it in this folder: `public/videos/mango-farm.mp4`
   - **Note:** This file is gitignored and won't be committed to the repository

3. **Update the Hero component** (optional):
   - If you want to use the local file instead of streaming
   - Edit `src/components/home/Hero.jsx` line 33
   - Change the videoUrl to: `/videos/mango-farm.mp4`

4. **Video recommendations:**
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 or higher
   - Duration: 10-30 seconds (will loop)
   - File size: Keep under 10MB for faster loading

4. **Alternative videos:**
   - You can use any video by updating the `videoUrl` prop in `src/components/home/Hero.jsx`

## Video Format Requirements
- **Supported formats:** MP4 (recommended), WebM
- **Codec:** H.264 for MP4, VP8/VP9 for WebM
- **Audio:** AAC for MP4, Vorbis/Opus for WebM

## Troubleshooting
- If the video doesn't play, check browser console for errors
- Ensure the video file path is correct
- Check that the video format is supported by modern browsers
- If audio doesn't play, user interaction may be required first (browser autoplay policies)
