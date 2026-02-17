# Homepage Background Video - Setup Complete! 🥭

## What's Been Done

✅ Updated the **Hero component** to use a background video  
✅ Video plays automatically with **mute/unmute controls**  
✅ Integrated with existing **VideoBackground component**  
✅ Added **fallback image** for unsupported browsers  
✅ Configured to use a **free mango farm video** from Pexels (online stream)

## ⚠️ Important Note About Video File

The video file is **NOT included in the repository** because:
- It's 167 MB, which exceeds GitHub's 100 MB file size limit
- The app uses an online video URL by default
- You can optionally download it for local use (see below)

## How It Works

### Current Setup (Online Video - Default)
- The homepage displays a beautiful mango farm video streamed from Pexels
- Video autoplays on page load (muted by default due to browser policies)
- Users can click the **🔊 sound button** in the bottom-right to enable audio
- The video loops continuously
- **Requires internet connection** to load the video

### Files Modified
1. **[src/components/home/Hero.jsx](src/components/home/Hero.jsx)**
   - Now uses VideoBackground component
   - Configured with mango farm video URL
   
2. **[src/components/home/VideoBackground.jsx](src/components/home/VideoBackground.jsx)**
   - Enhanced mute/unmute controls
   - Better state management for audio

## Using a Local Video (Optional - For Better Performance)

**Why download locally?**
- Faster loading (no internet streaming)
- Works offline
- Better performance

### Quick Setup
```bash
# Run the download script (this will download ~167 MB)
node download-video.cjs
```

**Note:** The downloaded video is gitignored and won't be committed to the repository.

### Manual Setup
1. Download a mango farm video from [Pexels](https://www.pexels.com/video/mango-farm-8327723/)
2. Save it as: `public/videos/mango-farm.mp4`
3. Update Hero.jsx line 33:
   ```jsx
   const mangoVideoUrl = '/videos/mango-farm.mp4';
   ```
4. The video file is automatically ignored by git (.gitignore)

## Video Controls

Users will see two buttons in the bottom-right corner:
- **Play/Pause button** - Control video playback
- **Mute/Unmute button** - Toggle audio on/off

## Browser Autoplay Policy

Modern browsers block videos with sound from autoplaying automatically. That's why:
- Video starts **muted** to allow autoplay
- Users must **click the unmute button** to hear audio
- This is a browser security feature, not a bug!

## Testing

1. Start your dev server: `npm run dev`
2. Open the homepage
3. You should see the mango farm video playing
4. Click the sound button to enable audio
5. Video should loop continuously

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Video doesn't play | Check browser console for errors, ensure URL is accessible |
| No sound | Click the unmute button (top-right), check browser volume |
| Video loads slowly | Consider downloading to local (see above) |
| Fallback image shows | Video failed to load, check network connection |

## Customization

Want to use a different video? Update in **Hero.jsx**:

```jsx
const mangoVideoUrl = 'YOUR_VIDEO_URL_HERE';
```

Or change the fallback image:
```jsx
fallbackImage={backgroundImage || '/your-fallback-image.jpg'}
```

---

**Note:** 
- The app uses an **online video URL by default** (no download needed)
- Video file is **gitignored** (not committed to repository)
- Download locally only if you need offline support or better performance
- The video file is 167 MB, so download may take a few minutes
