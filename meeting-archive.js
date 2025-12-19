// Meeting Minutes Archive System
// Dynamically loads and displays meeting minutes by year
// Only shows months that have actual documents

class MeetingArchive {
    constructor() {
        this.archiveData = {};
    }

    async loadArchive() {
        try {
            const response = await fetch('meeting-archive.json');
            this.archiveData = await response.json();
            
            // Render regular archive if container exists
            if (document.getElementById('meeting-archive')) {
                this.renderArchive();
            }
            
            // Render quarterly archive if container exists
            if (document.getElementById('meeting-archive-quarterly')) {
                this.renderQuarterlyArchive();
            }
        } catch (error) {
            console.error('Error loading meeting archive:', error);
            // Fallback to static display if JSON fails
            this.renderFallback();
        }
    }

    renderArchive() {
        const archiveContainer = document.getElementById('meeting-archive');
        if (!archiveContainer) return;

        archiveContainer.innerHTML = '';

        // Sort years in descending order (newest first)
        const years = Object.keys(this.archiveData).sort((a, b) => parseInt(b) - parseInt(a));
        
        years.forEach(year => {
            const meetings = this.archiveData[year];
            
            // Only show years that have meetings with documents
            const meetingsWithDocs = meetings.filter(meeting => meeting.hasMinutes || meeting.hasAgenda);
            if (meetingsWithDocs.length === 0) return;

            const yearSection = this.createYearSection(year, meetingsWithDocs, year === new Date().getFullYear().toString());
            archiveContainer.appendChild(yearSection);
        });
    }

    createYearSection(year, meetings, isCurrentYear = false) {
        const section = document.createElement('div');
        section.className = 'archive-year';

        // Year header (clickable to expand/collapse)
        const header = document.createElement('div');
        header.className = 'archive-year-header';
        header.innerHTML = `
            <h4>${year} Meeting Minutes <span class="expand-icon">${isCurrentYear ? '−' : '+'}</span></h4>
            <span class="meeting-count">(${meetings.length} meetings)</span>
        `;
        
        // Year content (collapsible)
        const content = document.createElement('div');
        content.className = `archive-year-content ${isCurrentYear ? 'expanded' : 'collapsed'}`;
        
        // Group meetings by month for better organization
        const monthGroups = this.groupMeetingsByMonth(meetings);
        
        // Get all months that actually have meetings and sort them chronologically
        const availableMonths = Object.keys(monthGroups);
        const monthOrder = ['December', 'November', 'October', 'September', 'August', 'July', 
                          'June', 'May', 'April', 'March', 'February', 'January'];
        const sortedMonths = monthOrder.filter(month => availableMonths.includes(month));
        
        sortedMonths.forEach(month => {
            const monthMeetings = monthGroups[month];
            const monthSection = document.createElement('div');
            monthSection.className = 'archive-month';
            
            const monthHeader = document.createElement('h5');
            monthHeader.textContent = month;
            monthHeader.className = 'archive-month-header';
            monthSection.appendChild(monthHeader);
            
            const meetingsList = document.createElement('ul');
            meetingsList.className = 'archive-meetings-list';
            
            monthMeetings.forEach(meeting => {
                const listItem = document.createElement('li');
                const meetingDate = new Date(meeting.date);
                const formattedDate = meetingDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                let links = [];
                if (meeting.hasMinutes) {
                    const minutesFile = this.formatFileName(meeting.date, 'minutes', meeting.filename);
                    links.push(`<a href="documents/meeting-minutes/board/${minutesFile}">Minutes</a>`);
                }
                if (meeting.hasAgenda) {
                    const agendaFile = this.formatFileName(meeting.date, 'agenda');
                    links.push(`<a href="documents/meeting-minutes/board/${agendaFile}">Agenda</a>`);
                }
                
                listItem.innerHTML = `
                    <strong>${formattedDate}</strong> - ${meeting.title}
                    <span class="document-links">${links.join(' | ')}</span>
                `;
                
                meetingsList.appendChild(listItem);
            });
            
            monthSection.appendChild(meetingsList);
            content.appendChild(monthSection);
        });

        // Add click handler for expand/collapse
        header.addEventListener('click', () => {
            const isExpanded = content.classList.contains('expanded');
            content.classList.toggle('expanded');
            content.classList.toggle('collapsed');
            
            const icon = header.querySelector('.expand-icon');
            icon.textContent = isExpanded ? '+' : '−';
        });

        section.appendChild(header);
        section.appendChild(content);
        
        return section;
    }

    groupMeetingsByMonth(meetings) {
        const groups = {};
        meetings.forEach(meeting => {
            const month = meeting.month;
            if (!groups[month]) {
                groups[month] = [];
            }
            groups[month].push(meeting);
        });
        
        // Sort meetings within each month by date
        Object.keys(groups).forEach(month => {
            groups[month].sort((a, b) => new Date(b.date) - new Date(a.date));
        });
        
        return groups;
    }

    formatFileName(dateString, type, customFilename = null) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        
        // If a custom filename is provided, prepend the year subdirectory
        if (customFilename) {
            return `${year}/${customFilename}`;
        }
        
        const month = date.getMonth() + 1; // No padding for your format
        const day = date.getDate(); // No padding for your format
        
        return `${year}/${month}-${day}-${year}-board-${type}.pdf`;
    }

    renderFallback() {
        const archiveContainer = document.getElementById('meeting-archive');
        if (!archiveContainer) return;
        
        archiveContainer.innerHTML = `
            <div class="archive-fallback">
                <p>Recent meeting minutes:</p>
                <ul>
                    <li><a href="documents/meeting-minutes/board/12-18-2025-board-minutes.pdf">December 18, 2025 - Regular Meeting Minutes</a></li>
                    <li><a href="documents/meeting-minutes/board/11-20-2025-board-minutes.pdf">November 20, 2025 - Regular Meeting Minutes</a></li>
                    <li><a href="documents/meeting-minutes/board/10-16-2025-board-minutes.pdf">October 16, 2025 - Regular Meeting Minutes</a></li>
                </ul>
                <p><a href="services.html#foia">Request additional meeting minutes via FOIA</a></p>
            </div>
        `;
    }

    renderQuarterlyArchive() {
        const quarterlyContainer = document.getElementById('meeting-archive-quarterly');
        if (!quarterlyContainer) return;
        
        let html = '';
        const sortedYears = Object.keys(this.archiveData).sort((a, b) => b - a);
        
        for (const year of sortedYears) {
            const yearData = this.archiveData[year];
            const monthGroups = this.groupByMonth(yearData);
            
            html += `
                <div class="quarterly-year">
                    <div class="quarterly-year-header">${year}</div>
                    <div class="quarterly-grid">
                        ${this.createQuarter('Q1', ['January', 'February', 'March'], monthGroups)}
                        ${this.createQuarter('Q2', ['April', 'May', 'June'], monthGroups)}
                        ${this.createQuarter('Q3', ['July', 'August', 'September'], monthGroups)}
                        ${this.createQuarter('Q4', ['October', 'November', 'December'], monthGroups)}
                    </div>
                </div>
            `;
        }
        
        quarterlyContainer.innerHTML = html;
    }

    createQuarter(quarterName, months, monthGroups) {
        let html = `
            <div class="quarter-section">
                <div class="quarter-header">${quarterName}</div>
        `;
        
        for (const month of months) {
            html += `<div class="month-entry">`;
            html += `<span class="month-name">${month}</span>`;
            
            if (monthGroups[month] && monthGroups[month].length > 0) {
                const meetings = monthGroups[month];
                for (const meeting of meetings) {
                    html += `<div class="meeting-date">${this.formatDate(meeting.date)} - ${meeting.title}</div>`;
                    if (meeting.hasMinutes) {
                        const minutesFile = meeting.filename || `${meeting.date.replace(/-/g, '-')}-board-minutes.pdf`;
                        html += `<a href="documents/meeting-minutes/board/${minutesFile}" class="meeting-link">View Minutes</a>`;
                    } else {
                        html += `<span class="no-minutes">No minutes available</span>`;
                    }
                }
            } else {
                html += `<span class="no-minutes">No meetings scheduled</span>`;
            }
            
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    groupByMonth(yearData) {
        const monthGroups = {};
        yearData.forEach(meeting => {
            if (!monthGroups[meeting.month]) {
                monthGroups[meeting.month] = [];
            }
            monthGroups[meeting.month].push(meeting);
        });
        return monthGroups;
    }
}

// Initialize the archive when page loads
document.addEventListener('DOMContentLoaded', function() {
    const archive = new MeetingArchive();
    archive.loadArchive();
});