/**
 * Asset loading utilities for RDR2 Portfolio
 * Handles videos, images, and media files for intro sequences and loading screens
 */

export const ASSETS = {
  // Intro video - Shotgun Blast sequence
  INTRO_VIDEO: '/videos/intro.mp4', // Shotgun blast video (mp4 format)
  intro: {
    shotgun: '/videos/intro.mp4', // Shotgun blast video (mp4 format)
  },
  
  // Loading screen images - sepia-toned Western-style photos
  loading: {
    scene1: '/loading/scene1.jpg', // Landscape/Western scene
    scene2: '/loading/scene2.jpg', // Character/portrait scene
    scene3: '/loading/scene3.jpg', // Optional third scene
  },
  
  // Title screen background/video elements (optional)
  title: {
    background: '/title/background.jpg',
    videoIntro: '/title/intro.mp4', // Optional intro video for title screen
  },
} as const

/**
 * Preload assets to avoid delays during playback
 * Useful for critical videos and images
 */
export function preloadAssets(assetPaths: string[]): Promise<void> {
  return Promise.all(
    assetPaths.map(path => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load asset: ${path}`))
        img.src = path
      })
    })
  ).then(() => {})
}

/**
 * Preload video for smooth playback
 */
export function preloadVideo(videoPath: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.oncanplaythrough = () => resolve(video)
    video.onerror = () => reject(new Error(`Failed to load video: ${videoPath}`))
    video.src = videoPath
    video.load()
  })
}

/**
 * Check if intro has been shown this session
 * Uses sessionStorage to track intro display
 */
export const introSessionStorage = {
  key: 'rdr2_intro_shown',
  
  hasShown: (): boolean => {
    try {
      return sessionStorage.getItem(introSessionStorage.key) === 'true'
    } catch {
      return false
    }
  },
  
  setShown: (): void => {
    try {
      sessionStorage.setItem(introSessionStorage.key, 'true')
    } catch {
      // SessionStorage not available
    }
  },
  
  reset: (): void => {
    try {
      sessionStorage.removeItem(introSessionStorage.key)
    } catch {
      // SessionStorage not available
    }
  },
}
