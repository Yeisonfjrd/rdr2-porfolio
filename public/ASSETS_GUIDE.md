# Asset Structure Guide

This directory contains all media assets for the RDR2 Portfolio experience.

## Directory Structure

### `/intro`
**Purpose**: Shotgun blast intro sequence
**Expected Files**:
- `shotgun-blast.mp4` - Main intro video (recommended: 2-3 seconds, 1080p)
- Format: MP4 H.264, optimized for web

### `/loading`
**Purpose**: Sepia-toned loading images for cinematic feel
**Expected Files**:
- `loading-01.jpg` - First loading image
- `loading-02.jpg` - Second loading image
- `loading-03.jpg` - Third loading image
- `loading-04.jpg` - Fourth loading image
- Format: JPG, 800x600px recommended, warm sepia tones (#8B7355, #A0826D)

### `/title`
**Purpose**: Title screen video or background
**Expected Files**:
- `title-video.mp4` - Background video for title screen (looping, 1080p recommended)
- OR static images if video not available
- Format: MP4 H.264 or JPG

## Adding Assets

1. **Video Files**: Place MP4 files in their respective directories
   - Use H.264 codec for maximum compatibility
   - Keep file sizes under 5MB for optimal performance
   - Recommended resolution: 1280x720 (720p) minimum

2. **Image Files**: Place JPG files in their respective directories
   - Keep color palette consistent with sepia/western theme
   - Recommended size: 800x600px or larger
   - Optimize with compression tools before uploading

## Loading Assets in Code

Use the `@/lib/assets.ts` utility functions:

```typescript
import { ASSET_PATHS, getAssetUrl } from '@/lib/assets'

// Get pre-defined paths
const videoPath = ASSET_PATHS.INTRO_VIDEO
const loadingImages = ASSET_PATHS.LOADING_IMAGES

// Or construct URLs dynamically
const imageUrl = getAssetUrl('loading', 'loading-01.jpg')
```

## Notes

- All video files should be web-optimized (use HandBrake or similar)
- Keep intro video short (2-3s) for snappy user experience
- Loading images should have consistent styling and aspect ratio
- Test assets in multiple browsers before final deployment
