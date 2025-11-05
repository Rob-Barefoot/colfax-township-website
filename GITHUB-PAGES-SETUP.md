# GitHub Pages Deployment Guide

## Deploy Colfax Township Website to GitHub Pages (FREE)

### Why GitHub Pages is Perfect for This Project
- ✅ **100% FREE** hosting
- ✅ **Custom domains** supported (colfaxtownship.org)
- ✅ **Automatic HTTPS** included
- ✅ **Global CDN** for fast loading
- ✅ **Easy updates** via git push
- ✅ **Professional** - used by many government sites
- ✅ **Reliable** - backed by Microsoft/GitHub infrastructure

## Quick Setup (5 minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com and sign in (or create free account)
2. Click "New repository"
3. Name it: `colfax-township-website`
4. Make it **Public** (required for free GitHub Pages)
5. Check "Add a README file"
6. Click "Create repository"

### Step 2: Upload Your Website Files
**Option A: Web Interface (Easiest)**
1. In your new repo, click "uploading an existing file"
2. Drag and drop ALL files from `c:\ColfaxTwnship\`
3. Write commit message: "Initial website upload"
4. Click "Commit changes"

**Option B: Git Commands**
```bash
# In your ColfaxTwnship folder
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/colfax-township-website.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo → Settings tab
2. Scroll to "Pages" section
3. Source: Deploy from a branch
4. Branch: `main` / `/ (root)`
5. Click Save

### Step 4: Access Your Website
- Your site will be live at: `https://YOURUSERNAME.github.io/colfax-township-website/`
- Takes 5-10 minutes to build first time

## Custom Domain Setup (Optional)

### If you own colfaxtownship.org or similar:

1. **In GitHub Pages Settings:**
   - Custom domain: `www.colfaxtownship.org`
   - Check "Enforce HTTPS"

2. **In Your Domain DNS:**
   - Add CNAME: `www` → `YOURUSERNAME.github.io`
   - Or A records to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

## File Structure to Upload
```
Upload everything from c:\ColfaxTwnship\:
├── index.html          ← This becomes your homepage
├── about.html
├── board.html
├── building.html
├── events.html
├── meetings.html
├── projects.html
├── styles.css
├── script.js
├── assets/
│   ├── colfax-logo.png
│   └── noise-ordinance.txt
├── README.md
├── AZURE-DEPLOYMENT.md
└── (any other files)
```

## Updating the Website

### Method 1: GitHub Web Interface
1. Navigate to the file you want to edit
2. Click the pencil icon (Edit)
3. Make changes
4. Scroll down, add commit message
5. Click "Commit changes"
6. Site updates automatically in ~5 minutes

### Method 2: Git Commands
```bash
# Make your changes locally
# Then:
git add .
git commit -m "Update board member information"
git push
```

## Advantages of GitHub Pages

### ✅ **Cost**
- Completely FREE
- No monthly fees ever
- No bandwidth limits for reasonable use

### ✅ **Reliability** 
- 99.9% uptime
- Backed by Microsoft infrastructure
- Global CDN (Content Delivery Network)

### ✅ **Security**
- Automatic HTTPS certificates
- DDoS protection included
- Regular security updates

### ✅ **Easy Management**
- Update files through web browser
- Version control (see all changes over time)
- Multiple people can contribute
- Rollback to previous versions easily

### ✅ **Professional**
- Many government sites use GitHub Pages
- Clean URLs (no ads or branding)
- Fast loading worldwide

## Making Updates

### Common Updates You'll Make:
1. **Meeting dates** - Edit `meetings.html`
2. **Board changes** - Edit `board.html`
3. **New announcements** - Edit `index.html`
4. **Project updates** - Edit `projects.html`

### Easy Process:
1. Go to your GitHub repo
2. Click on the file (e.g., `meetings.html`)
3. Click edit button (pencil icon)
4. Make changes
5. Save with a description
6. Site updates automatically!

## Backup Strategy
- GitHub automatically backs up everything
- Download ZIP anytime: Code → Download ZIP
- Clone to multiple computers for local backups

## Performance Tips
- Images are optimized ✅
- CSS/JS is minified and efficient ✅
- Site loads fast globally ✅
- Mobile-friendly design ✅

## SEO & Discoverability
- Add to Google Search Console
- Submit sitemap: `https://yoursite.com/sitemap.xml`
- Clean URLs help search engines
- Fast loading improves rankings

## Example URLs After Deployment
```
Homepage: https://yourusername.github.io/colfax-township-website/
Board:    https://yourusername.github.io/colfax-township-website/board.html
About:    https://yourusername.github.io/colfax-township-website/about.html
```

## Need Help?
- GitHub Pages documentation: https://pages.github.com/
- GitHub support is excellent and free
- Community forums for questions