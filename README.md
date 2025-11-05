# Colfax Township Website Clone

This is a clone/copy of the Colfax Township, Oceana County website (https://www.colfaxtownshipoceana.org/).

## Project Structure

```
ColfaxTwnship/
├── index.html          # Homepage
├── about.html          # About page
├── board.html          # Township Board page
├── building.html       # Building Department page
├── events.html         # Upcoming Events page
├── meetings.html       # Meetings page
├── projects.html       # Projects page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── assets/             # Images and documents
│   ├── colfax-logo.png # Township logo
│   └── noise-ordinance.txt # Placeholder for ordinance document
└── README.md           # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern HTML5**: Semantic markup with proper accessibility
- **Interactive Navigation**: Mobile-friendly hamburger menu
- **Clean Styling**: Professional appearance matching government standards
- **Accessible**: Keyboard navigation and screen reader friendly
- **Fast Loading**: Optimized images and efficient CSS/JavaScript

## Pages Included

1. **Homepage** - Welcome message, important notices, quick links
2. **About** - Township information, services, contact details
3. **Township Board** - Board member information and contact details
4. **Meetings** - Meeting schedules, agendas, and minutes
5. **Projects** - Current and upcoming township projects
6. **Building** - Building permits, inspections, and regulations
7. **Events** - Upcoming community events and activities

## Key Content

- Proposed Noise Ordinance information and feedback links
- Trustee and Deputy Clerk position openings
- Board member contact information (including Joni Gerard as Township Clerk)
- Meeting schedules and public participation information
- Building department services and permit processes

## How to Use

### Option 1: Simple File Opening
1. Open `index.html` in any modern web browser
2. Navigate through the pages using the menu

### Option 2: Local Server (Recommended)
If you have Python installed:
```bash
cd ColfaxTwnship
python -m http.server 8000
```

If you have Node.js installed:
```bash
cd ColfaxTwnship
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

### Option 3: Live Server Extension
If using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Customization

### Update Contact Information
- Edit the email addresses in the HTML files
- Update phone numbers and addresses as needed
- Modify the footer contact information

### Add Real Content
- Replace placeholder text with actual information
- Add real meeting dates and agendas
- Upload actual documents (replace noise-ordinance.txt with real PDF)

### Styling Changes
- Modify `styles.css` to change colors, fonts, or layout
- Update the logo in the `assets/` folder
- Adjust responsive breakpoints if needed

### Add Functionality
- Modify `script.js` to add new interactive features
- Add contact forms or other interactive elements
- Integrate with content management systems if needed

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (basic functionality)

## Technical Notes

- Uses CSS Grid and Flexbox for layouts
- Implements mobile-first responsive design
- Includes modern JavaScript ES6+ features
- Optimized for performance and accessibility
- SEO-friendly with proper meta tags

## Original Website

This clone is based on: https://www.colfaxtownshipoceana.org/

## License

This project is intended for educational/reference purposes. Please ensure proper permissions before using for official township business.

## Maintenance

To keep the website current:
1. Update meeting schedules and agendas regularly
2. Post new announcements and events
3. Keep board member information current
4. Update project statuses
5. Maintain links to current documents and forms

## Support

For technical issues with this website clone, check:
1. Browser developer console for JavaScript errors
2. Ensure all files are in the correct directory structure
3. Verify image paths and links are working
4. Test responsive design on different screen sizes