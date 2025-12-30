# Colfax Township Website Content Management Guide

This guide explains how to add, update, and manage content on the Colfax Township website.

## 📅 Adding New Events

### Steps:
1. **Edit file:** `community/events.html`
2. **Find the events list section** (look for `<div class="events-list-section">`)
3. **Add new event using this template:**

```html
<div class="event-item">
    <div class="event-date">
        <span class="month">Jan</span>
        <span class="day">15</span>
        <span class="year">2026</span>
    </div>
    <div class="event-details">
        <h4>Event Name Here</h4>
        <p><strong>Time:</strong> 7:00 PM</p>
        <p><strong>Location:</strong> Township Hall</p>
        <p>Brief description of the event and any important details.</p>
        <div class="event-contact">
            <p><strong>Contact:</strong> <a href="mailto:contact@email.com">Contact Name</a></p>
        </div>
    </div>
</div>
```

4. **Update events.json** for calendar integration:
```json
{
    "date": "2026-01-15",
    "title": "Event Name Here",
    "type": "event",
    "description": "Brief description"
}
```

## 🏗️ Adding New Ongoing Projects

### Steps:
1. **Edit file:** `community/projects.html`
2. **Find the projects grid** (look for `<div class="projects-grid">`)
3. **Add new project using this template:**

```html
<div class="project-item">
    <div class="project-item-header">
        <h3>Project Name</h3>
        <span class="project-status status-planning">Planning</span>
    </div>
    <div class="project-item-content">
        <img src="../assets/images/community/project-image.jpg" alt="Project Name" class="project-image">
        <p class="project-image-caption">Caption for the image.</p>
        <div class="project-description">
            <p>Description of what the project involves and current status.</p>
            <a href="mailto:contact@email.com?subject=Project%20Name%20-%20Get%20Involved" class="btn project-btn">Get Involved</a>
        </div>
        <div class="project-gallery">
            <h5>Photo Gallery</h5>
            <div class="gallery-grid">
                <img src="../assets/images/community/project-image.jpg" alt="Description" class="gallery-thumbnail" onclick="openGalleryModal(this)">
                <!-- Add more thumbnails here -->
            </div>
        </div>
    </div>
</div>
```

### Project Status Options:
- `status-planning` (yellow) - Project in planning phase
- `status-active` (green) - Project actively underway  
- `status-completed` (gray) - Project finished (ready to move to archives)

## 📂 Moving Projects/Events to Archives

### When to Move:
- Events: After the event has completed
- Projects: When project is finished and you want to showcase the results

### Steps:
1. **Copy the content** from events.html or projects.html
2. **Edit file:** `community/archive.html`
3. **Find the archive grid** (look for `<div class="archive-grid">`)
4. **Convert to archive format:**

```html
<div class="archive-item">
    <div class="archive-item-header">
        <h3>2026 Project/Event Name</h3>
    </div>
    <div class="archive-item-content">
        <img src="../assets/images/community/image.jpg" alt="Archive Item" class="archive-image">
        <p class="archive-image-caption">Caption describing the main image.</p>
        <div class="archive-description">
            <p>Summary of what was accomplished or what happened during the event/project.</p>
            <p><strong>Results/Highlights:</strong> Key metrics or outcomes</p>
        </div>
        <div class="archive-gallery">
            <h5>Photo Gallery</h5>
            <div class="gallery-grid">
                <img src="../assets/images/community/image1.jpg" alt="Description" class="gallery-thumbnail" onclick="openGalleryModal(this)">
                <img src="../assets/images/community/image2.jpg" alt="Description" class="gallery-thumbnail" onclick="openGalleryModal(this)">
                <!-- Add more photos here -->
            </div>
        </div>
    </div>
</div>
```

5. **Remove the original** from events.html or projects.html
6. **Update any calendar entries** in events.json if needed

## 📸 Adding Photos to Galleries

### File Organization:
- **Main folder:** `assets/images/community/`
- **Event/Project subfolders:** `assets/images/community/event-name-2026/`
- **File naming:** Use hyphens, no spaces (e.g., `summer-festival-2026.jpg`)

### Photo Preparation:
1. **Resize images** to reasonable web sizes (1200px wide max)
2. **Compress for dial-up users** - aim for 50-500KB per image
3. **Use the compression script:**

```bash
cd /path/to/colfax-township
python3 -c "
from PIL import Image, ImageOps
import os

def compress_and_orient_image(input_path, output_path, quality=85, max_width=1200):
    with Image.open(input_path) as img:
        # Fix orientation first
        img = ImageOps.exif_transpose(img)
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            if 'transparency' in img.info:
                rgb_img.paste(img, mask=img.split()[-1])
            else:
                rgb_img.paste(img)
            img = rgb_img
        
        # Resize if too wide
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)

# Example usage:
compress_and_orient_image('original-photo.jpg', 'assets/images/community/event-name/photo.jpg')
"
```

### Adding Photos to Gallery HTML:
```html
<div class="gallery-grid">
    <img src="../assets/images/community/folder-name/photo1.jpg" alt="Descriptive text" class="gallery-thumbnail" onclick="openGalleryModal(this)">
    <img src="../assets/images/community/folder-name/photo2.jpg" alt="Descriptive text" class="gallery-thumbnail" onclick="openGalleryModal(this)">
    <!-- Add more photos here -->
</div>
```

## 👥 Contact Information Updates

### Board Member Contacts:
- **File:** `board.html` 
- **Update:** Email, phone, and bio sections as needed

### Project Contacts:
- **Get Involved buttons:** Update mailto links in projects.html
- **Format:** `mailto:email@domain.com?subject=Project%20Name%20-%20Get%20Involved`

## 📅 Calendar Integration

### Updating events.json:
```json
[
    {
        "date": "2026-01-15", 
        "title": "Event Name",
        "type": "event",
        "description": "Brief description"
    },
    {
        "date": "2026-02-10",
        "title": "Board Meeting", 
        "type": "meeting",
        "description": "Monthly board meeting"
    }
]
```

### Event Types:
- `"event"` - Community events (brown dot)
- `"meeting"` - Board meetings (green dot)
- `"holiday"` - Holidays/special dates (orange dot)

## 🚀 Publishing Changes

### Git Workflow:
```bash
cd /path/to/colfax-township
git add -A
git commit -m "Description of changes made"
git push
```

### GitHub Pages:
- Changes go live automatically after pushing to GitHub
- Allow 5-10 minutes for updates to appear
- Check the live site at your GitHub Pages URL

## 🔧 Troubleshooting

### Common Issues:
1. **Images not loading:** Check file paths and ensure no spaces in filenames
2. **Gallery not working:** Ensure JavaScript modal code is present at bottom of page
3. **Layout broken:** Validate HTML structure and ensure closing tags
4. **Photos rotated:** Run the image orientation fix script above

### File Validation:
- **HTML validation:** Use W3C HTML validator online
- **Image optimization:** Check file sizes - aim for under 500KB each
- **Link testing:** Test all mailto links and internal navigation

## 📋 Content Guidelines

### Writing Style:
- **Professional but friendly** tone for township communications
- **Clear, concise** descriptions
- **Include contact information** for community engagement
- **Use specific details** (dates, numbers, outcomes) when possible

### Image Guidelines:
- **High quality** but web-optimized
- **Descriptive alt text** for accessibility
- **Appropriate captions** that add context
- **Community-focused** content that showcases township activities

### Accessibility:
- **Alt text** on all images
- **Descriptive link text** instead of "click here"
- **Proper heading hierarchy** (h2, h3, h4 in order)
- **Sufficient color contrast** for readability

---

## Quick Reference

| Task | File to Edit | Section to Find |
|------|--------------|-----------------|
| Add event | `community/events.html` | `<div class="events-list-section">` |
| Add project | `community/projects.html` | `<div class="projects-grid">` | 
| Add archive | `community/archive.html` | `<div class="archive-grid">` |
| Update calendar | `events.json` | Add JSON object |
| Add board member | `board.html` | `<div class="board-grid">` |

For questions or technical issues, contact the webmaster or refer to the GitHub repository documentation.