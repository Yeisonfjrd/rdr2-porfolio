# 🚀 Deployment Guide - Red Dead Redemption 2 Portfolio

Deploy your interactive portfolio to the world in minutes! This guide covers multiple deployment options.

## ⚡ Vercel (Recommended - 1 Click)

Vercel is the **official Next.js hosting platform** and best choice for this project.

### Option A: Vercel Web Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: RDR2 themed portfolio"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub account (or create one)

3. **Click "New Project"**

4. **Select Your GitHub Repository**
   - Search for your portfolio repo
   - Click "Import"

5. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (auto-detected)
   - Build Command: `pnpm build` or `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Environment Variables: None required!

6. **Click "Deploy"**
   - Wait 1-2 minutes
   - Your site is **LIVE** 🎉

7. **Get Your URL**
   - Vercel assigns a free domain like `yeison-portfolio.vercel.app`
   - Or connect your custom domain

### Option B: Vercel CLI (Pro Users)

1. **Install Vercel CLI** (one-time)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Select project settings
   - Confirm deployment
   - **Done!** 🎉

4. **Redeploy on Code Changes**
   ```bash
   vercel --prod
   ```

### Vercel Benefits
✅ Free tier available  
✅ Instant auto-deployment on git push  
✅ Free SSL certificate  
✅ Edge caching & CDN  
✅ Zero configuration  
✅ Analytics & monitoring  
✅ Environment variables support  
✅ Automatic preview deployments for PRs  

---

## 🌐 Custom Domain on Vercel

1. **In Vercel Dashboard**
   - Go to your project
   - Settings → Domains
   - Add custom domain

2. **Update DNS Records**
   - Go to your domain registrar
   - Add DNS records as shown by Vercel
   - Wait 24-48 hours for propagation

3. **Example**: `yeisonfajardo.dev` → points to your Vercel deployment

---

## 🔧 Other Deployment Options

### Netlify (Simple)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   pnpm build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=.next
   ```

### AWS Amplify

1. **Push to GitHub**
2. **Connect Amplify to repo**
3. **Auto-deploys on push** 🎉

### Docker (Self-Hosted)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## 📋 Pre-Deployment Checklist

Before deploying, verify:

- [ ] All your info is updated (name, email, links)
- [ ] Projects are accurate and links work
- [ ] Contact email is correct
- [ ] Social media links are valid
- [ ] No console errors: `pnpm dev` then check browser console
- [ ] Responsive design looks good on mobile
- [ ] All animations play smoothly
- [ ] Developer console works (Ctrl+K)
- [ ] Build succeeds: `pnpm build`

## 🔍 Testing Before Deployment

```bash
# 1. Development testing
pnpm dev
# Open http://localhost:3000
# Test all sections, animations, forms

# 2. Production build test
pnpm build
pnpm start
# Open http://localhost:3000
# Test again to catch production-only issues

# 3. Performance check
pnpm build
# Check terminal output for bundle size
```

## 📊 Monitoring After Deployment

### Vercel Dashboard
- **Deployments**: View all past & current deployments
- **Analytics**: Page views, error rates, performance
- **Function Logs**: Debug API calls (if added)
- **Edge Middleware**: Monitor request handling

### Google Analytics (Optional)

1. Get Google Analytics ID
2. Add to environment variables
3. Install `next-google-analytics`
4. Track portfolio visits

### Performance Monitoring

Vercel provides free Core Web Vitals monitoring:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

View in Vercel Dashboard → Analytics

## 🔐 Security & Best Practices

✅ **Already Configured**
- Next.js security headers
- CSRF protection
- XSS prevention
- Secure by default

✅ **Recommended**
- Keep dependencies updated
- Use strong GitHub password
- Enable 2FA on GitHub
- Review Vercel audit logs

---

## 🌍 SEO & Social Media

### Meta Tags (Already Configured)
- Updated in `app/layout.tsx`
- Title: "Yeison Fajardo - Full Stack Developer"
- Description: "Interactive portfolio with RDR2 aesthetic"

### Custom Meta (Optional)

Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Name - Full Stack Developer',
  description: 'Your portfolio description',
  openGraph: {
    title: 'Your Name - Full Stack Developer',
    description: 'Your portfolio description',
    images: [{ url: '/og-image.png' }],
  },
}
```

### Share on Social Media

Once live, share:
- LinkedIn: "Check out my interactive portfolio!"
- Twitter: Share with #webdeveloper #portfolio
- GitHub: Link in bio
- Dev Community: Share on dev.to

---

## 🆘 Troubleshooting Deployment

### Build Fails

**Error: "pnpm not found"**
```bash
# Vercel uses npm by default, but we use pnpm
# Add vercel.json:
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install"
}
```

**Error: "Module not found"**
- Run locally: `pnpm install && pnpm build`
- Check for any import errors
- Ensure all files are committed to git

### Site is Slow

- Check Vercel Analytics
- Optimize images
- Check third-party scripts
- Enable Vercel's Edge Caching

### Custom Domain Not Working

1. **DNS Propagation Delay**
   - Wait 24-48 hours
   - Use [dnschecker.org](https://dnschecker.org) to check

2. **Verify DNS Records**
   - Check registrar settings
   - Match Vercel's DNS instructions exactly

3. **Clear Browser Cache**
   - Hard refresh (Ctrl+Shift+R)

---

## 📱 Test on Different Browsers

Before sharing publicly, test on:
- Chrome (Desktop)
- Firefox (Desktop)
- Safari (Desktop & iOS)
- Chrome Mobile (Android)
- Safari Mobile (iOS)

Check:
- Responsive design
- Animations play smoothly
- Form works
- Console has no errors

---

## 🎉 Post-Deployment

### Celebrate! 🎊

You've deployed your interactive portfolio!

### Next Steps

1. **Share with the world**
   - Add link to GitHub bio
   - Share on LinkedIn
   - Post on Twitter/X
   - Add to your resume

2. **Keep it updated**
   - Add new projects regularly
   - Update skills section
   - Keep contact info current
   - Push updates to GitHub (auto-deploys!)

3. **Monitor analytics**
   - Check how many visitors
   - Which sections are popular
   - Adjust based on engagement

4. **Iterate & improve**
   - Gather feedback
   - Enhance animations
   - Add new features
   - Polish user experience

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify vs Vercel](https://www.netlify.com/partners/compare/netlify-vs-vercel/)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)

---

## 🚀 Quick Command Reference

```bash
# Local development
pnpm dev

# Build for production
pnpm build

# Test production build
pnpm start

# Deploy to Vercel
vercel --prod

# Check for errors
pnpm lint

# Format code
pnpm format
```

---

**Your portfolio is now live! 🤠✨**

Questions? Check the full [README.md](./README.md) or [Vercel Docs](https://vercel.com/docs)
