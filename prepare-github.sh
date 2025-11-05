#!/bin/bash
# GitHub Pages Deployment Preparation Script

echo "=== Colfax Township Website - GitHub Pages Setup ==="
echo ""

echo "📁 Files ready for GitHub upload:"
echo ""

# List all files that should be uploaded
find . -type f -not -path "./.git/*" | sort

echo ""
echo "✅ All files are ready for GitHub Pages!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com"
echo "2. Sign in or create a free account"
echo "3. Click 'New repository'"
echo "4. Name it: colfax-township-website"
echo "5. Make it PUBLIC (required for free GitHub Pages)"
echo "6. Click 'Create repository'"
echo ""
echo "Then upload all the files shown above!"