# Colfax Township File Organization

This document outlines the organizational structure for website assets and documents.

## Directory Structure

### `/assets/`
Core website assets and media files

#### `/assets/images/`
All website images organized by category

- **`/assets/images/branding/`** - Township logos, official seals, icons
  - `logo-main.png` - Primary township logo
  - `logo-header.png` - Header version of logo (horizontal)
  - `seal-official.png` - Official township seal
  - `favicon.ico` - Website favicon
  - `social-media-logo.png` - For social media sharing

- **`/assets/images/events/`** - Community event photography
  - Organized by year and event name
  - Example: `2026-winter-festival/`, `2026-board-meeting-jan/`
  - Use descriptive filenames: `winter-festival-activities-01.jpg`

### `/documents/`
Official township documents and forms

#### `/documents/meeting-minutes/`
Meeting minutes and related documents

- **`/documents/meeting-minutes/board/`** - Board of Supervisors minutes
  - Named by date: `01-15-2026-board-minutes.pdf`
  - Include agendas: `01-15-2026-board-agenda.pdf`

#### `/documents/forms/`
Downloadable forms and applications
- `foia-request-form.pdf`
- `building-permit-application.pdf`
- `tax-appeal-form.pdf`
- `cemetery-plot-application.pdf`

#### `/documents/ordinances/`
Township ordinances and regulations
- `noise-ordinance.pdf`
- `zoning-map.pdf`
- `building-codes.pdf`
- `township-ordinances-complete.pdf`

## File Naming Conventions

### Meeting Minutes
Format: `MM-DD-YYYY-[meeting-type]-[document-type].pdf`
- Examples:
  - `01-15-2026-board-minutes.pdf`
  - `01-15-2026-board-agenda.pdf`
  - `02-19-2026-board-minutes.pdf`

### Event Images
Format: `[event-name]-[description]-[number].jpg`
- Examples:
  - `winter-festival-activities-01.jpg`
  - `summer-picnic-group-photo-01.jpg`
  - `board-meeting-presentation-01.jpg`

### Official Documents
Use descriptive names with hyphens
- `foia-request-form.pdf`
- `property-tax-information.pdf`
- `cemetery-regulations.pdf`

## Best Practices

1. **Consistent Naming**: Always use lowercase with hyphens
2. **Date Format**: Use MM-DD-YYYY for meeting minutes (familiar US format)
3. **Version Control**: Add version numbers when updating forms (v1, v2, etc.)
4. **Image Optimization**: Compress images for web while maintaining quality
5. **Accessibility**: Include alt text descriptions for all images
6. **Regular Cleanup**: Archive old documents annually

## Event Data Structure

When adding events to `events.json`, you can include these fields:

**Required Fields:**
- `id` - Unique number for each event
- `title` - Event name
- `date` - Format: "YYYY-MM-DD"
- `type` - "event", "meeting", or "holiday"

**Optional Fields:**
- `time` - "7:00 PM" or "9:00 AM - 3:00 PM"
- `location` - Where the event takes place
- `description` - Brief description of the event
- `link` - Internal website link (like "meetings.html")
- `url` - External website link (opens in new tab)
- `contact` - Contact information object:
  - `name` - Contact person or department name
  - `email` - Email address (becomes clickable mailto link)
  - `phone` - Phone number (becomes clickable tel link)

**Example Event:**
```json
{
  "id": 1,
  "title": "Community Cleanup Day",
  "date": "2026-04-15",
  "time": "9:00 AM - 3:00 PM",
  "type": "event",
  "location": "Township Park",
  "description": "Annual spring cleanup and beautification.",
  "url": "https://facebook.com/colfaxtownshipevents",
  "contact": {
    "name": "Parks Committee",
    "email": "parks@colfaxtownship.org",
    "phone": "(xxx) xxx-xxxx"
  }
}
```

## Expanding the Structure

As the website grows, you can add:
- `/assets/images/departments/` - Photos of township facilities/staff
- `/assets/images/historical/` - Historical township photos
- `/documents/meeting-minutes/committees/` - If you add committee meetings
- `/documents/budgets/` - Annual budgets and financial reports
- `/documents/newsletters/` - Township newsletters or communications