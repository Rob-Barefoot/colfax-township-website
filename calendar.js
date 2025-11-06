// Calendar functionality for Colfax Township Events

class TownshipCalendar {
    constructor() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.events = this.loadEvents();
        this.init();
    }

    loadEvents() {
        // Define township events with dates
        return [
            {
                date: '2025-12-01',
                title: 'Board Position Applications Due',
                time: '11:59 PM Deadline',
                type: 'deadline',
                description: 'Final deadline to submit letters of interest for Trustee and Deputy Clerk positions.',
                location: 'Contact: Township Clerk',
                link: 'mailto:jonimgerard80@yahoo.com'
            },
            {
                date: '2025-12-03', 
                title: 'Township Board Meeting',
                time: '7:00 PM',
                type: 'government',
                description: 'Monthly township board meeting open to the public with opportunity for citizen comment.',
                location: 'Colfax Township Hall, 5594 N 192nd Ave, Walkerville MI',
                link: 'meetings.html'
            },
            {
                date: '2026-01-07',
                title: 'Township Board Meeting', 
                time: '7:00 PM',
                type: 'government',
                description: 'First meeting of 2026. Agenda will be posted prior to meeting.',
                location: 'Colfax Township Hall, 5594 N 192nd Ave, Walkerville MI',
                link: 'meetings.html'
            },
            {
                date: '2026-02-04',
                title: 'Township Board Meeting',
                time: '7:00 PM', 
                type: 'government',
                description: 'Regular monthly board meeting.',
                location: 'Colfax Township Hall, 5594 N 192nd Ave, Walkerville MI',
                link: 'meetings.html'
            },
            {
                date: '2026-03-04',
                title: 'Township Board Meeting',
                time: '7:00 PM',
                type: 'government', 
                description: 'Regular monthly board meeting.',
                location: 'Colfax Township Hall, 5594 N 192nd Ave, Walkerville MI',
                link: 'meetings.html'
            }
        ];
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const title = document.getElementById('calendar-title');
        title.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        const grid = document.querySelector('.calendar-grid');
        
        // Clear existing days (keep headers)
        const existingDays = grid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const dateString = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = this.getEventsForDate(dateString);

            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                
                // Add event indicators
                const eventIndicators = document.createElement('div');
                eventIndicators.className = 'event-indicators';
                
                dayEvents.forEach(event => {
                    const indicator = document.createElement('div');
                    indicator.className = `event-indicator ${event.type}`;
                    indicator.title = event.title;
                    eventIndicators.appendChild(indicator);
                });
                
                dayElement.appendChild(eventIndicators);

                // Add click handler
                dayElement.addEventListener('click', () => {
                    this.showEventDetails(dayEvents, dateString);
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    dayElement.classList.add('selected');
                });
            }

            // Highlight today
            const today = new Date();
            if (this.currentYear === today.getFullYear() && 
                this.currentMonth === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('today');
            }

            grid.appendChild(dayElement);
        }
    }

    getEventsForDate(dateString) {
        return this.events.filter(event => event.date === dateString);
    }

    showEventDetails(events, dateString) {
        const detailsContainer = document.getElementById('selected-event-details');
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let html = `<h3>Events for ${formattedDate}</h3>`;
        
        events.forEach(event => {
            const typeClass = event.type;
            html += `
                <div class="event-detail ${typeClass}">
                    <h4>${event.title}</h4>
                    <p class="event-time"><strong>Time:</strong> ${event.time}</p>
                    <p class="event-description">${event.description}</p>
                    <p class="event-location"><strong>Location:</strong> ${event.location}</p>
                    ${event.link ? `<a href="${event.link}" class="btn btn-primary">More Info</a>` : ''}
                </div>
            `;
        });

        detailsContainer.innerHTML = html;
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.calendar-container')) {
        new TownshipCalendar();
    }
});