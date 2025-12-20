// Lightweight Calendar for Colfax Township
// Optimized for rural internet - minimal bandwidth usage

class TownshipCalendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.events = [];
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }

    async loadEvents() {
        try {
            const response = await fetch('events.json');
            this.events = await response.json();
            this.renderCalendar();
            this.renderEventsList();
        } catch (error) {
            console.error('Error loading events:', error);
            // Fallback to empty array if JSON fails to load
            this.events = [];
            this.renderCalendar();
        }
    }

    getEventsForDate(dateString) {
        return this.events.filter(event => event.date === dateString);
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthYear = document.getElementById('month-year');
        
        monthYear.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Clear previous calendar
        calendar.innerHTML = '';
        
        // Create header row
        const headerRow = document.createElement('tr');
        this.dayNames.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        calendar.appendChild(headerRow);
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        let date = 1;
        
        // Create calendar rows
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < firstDay) {
                    // Empty cells before first day
                    cell.classList.add('empty');
                } else if (date > daysInMonth) {
                    // Empty cells after last day
                    cell.classList.add('empty');
                } else {
                    // Regular date cell
                    cell.textContent = date;
                    cell.classList.add('date');
                    
                    const dateString = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    const dayEvents = this.getEventsForDate(dateString);
                    
                    if (dayEvents.length > 0) {
                        cell.classList.add('has-events');
                        cell.style.cursor = 'pointer';
                        
                        // Add click handler for events popup
                        cell.addEventListener('click', () => {
                            this.showEventModal(dateString, dayEvents);
                        });
                        
                        // Create event indicators
                        const eventContainer = document.createElement('div');
                        eventContainer.classList.add('event-indicators');
                        
                        dayEvents.forEach(event => {
                            const indicator = document.createElement('span');
                            indicator.classList.add('event-dot', event.type);
                            indicator.title = event.title;
                            eventContainer.appendChild(indicator);
                        });
                        
                        cell.appendChild(eventContainer);
                    }
                    
                    // Highlight today
                    const today = new Date();
                    if (this.currentYear === today.getFullYear() && 
                        this.currentMonth === today.getMonth() && 
                        date === today.getDate()) {
                        cell.classList.add('today');
                    }
                    
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            calendar.appendChild(row);
            
            // Break if we've filled all dates
            if (date > daysInMonth) break;
        }
    }

    renderEventsList() {
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '';
        
        // Check if this is the test page and adjust day range accordingly
        const isTestPage = window.location.pathname.includes('events-test.html');
        const dayRange = isTestPage ? 45 : 60;
        
        // Get upcoming events using string comparison (ISO dates sort correctly)
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        
        // Calculate future date string
        const futureDate = new Date(today.getTime() + (dayRange * 24 * 60 * 60 * 1000));
        const futureDateString = futureDate.toISOString().split('T')[0];
        
        const upcomingEvents = this.events
            .filter(event => {
                return event.date >= todayString && event.date <= futureDateString;
            })
            .sort((a, b) => a.date.localeCompare(b.date));
        
        if (upcomingEvents.length === 0) {
            eventsList.innerHTML = '<p>No upcoming events scheduled.</p>';
            return;
        }
        
        upcomingEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event-item', event.type);
            
            // Parse date string directly
            const [year, month, day] = event.date.split('-').map(num => parseInt(num, 10));
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            
            // Calculate day of week (basic algorithm)
            const date = new Date(year, month - 1, day);
            const dayOfWeek = date.getDay();
            const formattedDate = `${dayNames[dayOfWeek]}, ${monthNames[month - 1]} ${day}, ${year}`;
            
            let eventHTML = `
                <div class="event-date">${formattedDate}</div>
                <div class="event-details">
                    <h4>${event.title}</h4>
            `;
            
            if (event.time) {
                eventHTML += `<p><strong>Time:</strong> ${event.time}</p>`;
            }
            
            if (event.location) {
                eventHTML += `<p><strong>Location:</strong> ${event.location}</p>`;
            }
            
            if (event.description) {
                eventHTML += `<p>${event.description}</p>`;
            }
            
            // Add links section
            const links = [];
            if (event.link) {
                links.push(`<a href="${event.link}">More Information</a>`);
            }
            if (event.url) {
                links.push(`<a href="${event.url}" target="_blank" rel="noopener">Event Website</a>`);
            }
            
            if (links.length > 0) {
                eventHTML += `<p>${links.join(' | ')}</p>`;
            }
            
            // Add contact information
            if (event.contact) {
                eventHTML += '<div class="event-contact">';
                eventHTML += `<strong>Contact:</strong> `;
                
                const contactParts = [];
                if (event.contact.name) {
                    contactParts.push(event.contact.name);
                }
                
                if (event.contact.email) {
                    contactParts.push(`<a href="mailto:${event.contact.email}">${event.contact.email}</a>`);
                }
                
                if (event.contact.phone) {
                    contactParts.push(`<a href="tel:${event.contact.phone.replace(/\D/g, '')}">${event.contact.phone}</a>`);
                }
                
                eventHTML += contactParts.join(' - ');
                eventHTML += '</div>';
            }
            
            eventHTML += '</div>';
            eventDiv.innerHTML = eventHTML;
            eventsList.appendChild(eventDiv);
        });
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    goToToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.renderCalendar();
    }

    showEventModal(dateString, events) {
        // Parse date string directly
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        
        // Calculate day of week (basic algorithm)
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        const formattedDate = `${dayNames[dayOfWeek]}, ${monthNames[month - 1]} ${day}, ${year}`;

        let modalContent = `
            <div class="event-modal-header">
                <h3>Events for ${formattedDate}</h3>
                <button class="modal-close" onclick="this.closest('.event-modal').style.display='none'">&times;</button>
            </div>
            <div class="event-modal-body">
        `;

        events.forEach(event => {
            modalContent += `
                <div class="modal-event-item ${event.type}">
                    <h4>${event.title}</h4>
                    ${event.time ? `<p><strong>Time:</strong> ${event.time}</p>` : ''}
                    ${event.location ? `<p><strong>Location:</strong> ${event.location}</p>` : ''}
                    ${event.description ? `<p>${event.description}</p>` : ''}
                    ${event.contact && event.contact.email ? `<p><strong>Contact:</strong> <a href="mailto:${event.contact.email}">${event.contact.name || event.contact.email}</a></p>` : ''}
                </div>
            `;
        });

        modalContent += `</div>`;

        // Create or update modal
        let modal = document.getElementById('event-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'event-modal';
            modal.className = 'event-modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = modalContent;
        modal.style.display = 'flex';

        // Close modal when clicking outside
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', function() {
    const calendar = new TownshipCalendar();
    calendar.loadEvents();
    
    // Set up navigation buttons
    document.getElementById('prev-month').addEventListener('click', () => calendar.previousMonth());
    document.getElementById('next-month').addEventListener('click', () => calendar.nextMonth());
    document.getElementById('today-btn').addEventListener('click', () => calendar.goToToday());
});