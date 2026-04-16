# 🚀 Quick Start Guide

## 30-Second Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open http://localhost:3000
# Done! 🎉
```

## 5-Minute Customization

### Step 1: Update Your Name
**File**: `app/page.tsx` (search for "YEISON FAJARDO")

Edit the hero section to display your name instead.

### Step 2: Customize Main Information
**File**: `components/sections/about.tsx`

Update the `journalEntries` array with your experience:
```typescript
{
  date: '19 years old',
  title: 'Your Experience Title',
  content: 'Your description here',
  icon: '🎯',
}
```

### Step 3: Add Your Projects
**File**: `components/sections/projects.tsx`

Update the `projects` array:
```typescript
{
  id: 1,
  name: 'Your Project Name',
  description: 'Brief description',
  longDescription: 'Detailed description',
  tech: ['Tech1', 'Tech2', 'Tech3'],
  reward: 'HIGH PRIORITY',
  status: 'WANTED',
  image: '🚀',
}
```

### Step 4: Update Skills
**File**: `components/sections/skills.tsx`

Modify the `skills` array:
```typescript
{ name: 'React', icon: '⚛️', level: 95, category: 'Frontend' },
```

### Step 5: Add Your Contact Info
**File**: `components/sections/contact.tsx`

Update:
```typescript
// Email
href="mailto:YOUR_EMAIL@example.com"

// Social Links
{
  name: 'GitHub',
  icon: '💻',
  url: 'https://github.com/YOUR_USERNAME',
  color: 'hover:text-gray-400',
}
```

## 🎨 Styling Tips

### Change Colors
Edit `app/globals.css` to modify the RDR2 palette:
```css
--rdr-red: #bd081a;      /* Primary red */
--rdr-gold: #feac01;     /* Accent gold */
--rdr-black: #020002;    /* Dark background */
```

### Adjust Animations
Find animation configs in component files:
```typescript
transition={{ duration: 0.8 }} // ← Change this
```

Smaller = faster, larger = slower

## 🎮 Special Features

### Developer Console
Press `Ctrl+K` to open the secret console showing:
- Portfolio statistics
- System status
- Available commands

### Navigation
Click any nav item to smoothly scroll to that section.

## 📦 Deploy to Vercel (1 Click)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repo
5. Click "Deploy"
6. **Done!** 🎉 Your site is live

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Toggle Developer Console |
| Click nav items | Smooth scroll to section |

## 📱 Responsive Breakpoints

The portfolio is optimized for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🐛 Common Issues

### Port 3000 already in use?
```bash
pnpm dev -- -p 3001
```

### Tailwind not applying?
```bash
# Rebuild Tailwind
rm -rf .next
pnpm dev
```

### Fonts not loading?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm dev
```

## 📚 File Overview

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main portfolio page |
| `app/layout.tsx` | Root layout & fonts |
| `components/navigation.tsx` | Top navigation bar |
| `components/sections/` | Page sections |
| `components/developer-console.tsx` | Secret console (Ctrl+K) |
| `app/globals.css` | Global styles & colors |
| `tailwind.config.ts` | Tailwind theme |

## 🎯 Next Steps

1. ✅ Run `pnpm install && pnpm dev`
2. ✅ Update your info (5 files)
3. ✅ Test locally at `http://localhost:3000`
4. ✅ Deploy to Vercel
5. ✅ Share your portfolio! 🚀

## 🆘 Need Help?

- **General**: Read the full [README.md](./README.md)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Framer**: [framer.com/motion](https://www.framer.com/motion/)

---

**Happy building, cowboy!** 🤠
