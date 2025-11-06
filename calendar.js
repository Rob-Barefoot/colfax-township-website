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
                date: '2025-12-02', 
                title: 'Township Board Meeting',
                time: '7:00 PM',
                type: 'government',
                description: 'Monthly township board meeting open to the public with opportunity for citizen comment.',
                location: 'Colfax Township Hall, 5594 N 192nd Ave, Walkerville MI',
                link: 'meetings.html'
            },
            {
                date: '2026-01-06',
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
            // Community Events and Holidays
            {
                date: '2025-11-11',
                title: 'Veterans Day',
                time: 'All Day',
                type: 'holiday',
                description: 'Honor and remember our veterans who served our country.',
                location: 'Community-wide observance',
                link: null
            },
            {
                date: '2025-11-15',
                title: 'Opening Day of Rifle Season',
                time: 'All Day',
                type: 'community',
                description: 'Hunt Safe! Opening day of rifle hunting season.',
                location: 'Michigan hunting areas',
                link: null
            },
            {
                date: '2025-11-27',
                title: 'Thanksgiving Day',
                time: 'All Day',
                type: 'holiday',
                description: 'Happy Thanksgiving! Give thanks and enjoy time with family.',
                location: 'Community celebration',
                link: null
            },
            {
                date: '2025-11-30',
                title: 'Board Position Application Deadline',
                time: '11:59 PM Deadline',
                type: 'deadline',
                description: 'Last day to apply for Trustee and Deputy Clerk positions.',
                location: 'Contact: Township Clerk',
                link: 'mailto:jonimgerard80@yahoo.com'
            },
            {
                date: '2025-12-14',
                title: 'Hanukkah Begins',
                time: 'Sundown',
                type: 'holiday',
                description: 'Hanukkah, the Festival of Lights, begins at sundown.',
                location: 'Community observance',
                link: null
            },
            {
                date: '2025-12-25',
                title: 'Christmas Day',
                time: 'All Day',
                type: 'holiday',
                description: 'Merry Christmas! Celebrate with family and friends.',
                location: 'Community celebration',
                link: null
            },
            {
                date: '2025-12-26',
                title: 'Kwanzaa Begins',
                time: 'All Day',
                type: 'holiday',
                description: 'Kwanzaa, celebrating African-American culture, begins.',
                location: 'Community observance',
                link: null
            },
            {
                date: '2025-12-31',
                title: "New Year's Eve",
                time: 'All Day',
                type: 'holiday',
                description: 'Have a Safe New Year\'s Eve! Celebrate responsibly.',
                location: 'Community celebration',
                link: null
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

            // Store the date string as a data attribute for debugging
            dayElement.setAttribute('data-date', dateString);

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
        // Parse date components to avoid timezone issues
        const [year, month, day] = dateString.split('-').map(num => parseInt(num));
        const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
        
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