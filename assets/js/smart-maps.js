// Smart Maps Handler for Colfax Township
// Uses Bing Maps on desktop, prompts for app choice on mobile

class SmartMaps {
    constructor() {
        this.townshipAddress = "5594 N 192nd Ave, Walkerville MI 49459";
        this.coordinates = { lat: 43.6847, lng: -86.1289 }; // Township Hall coordinates
        this.init();
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    }

    init() {
        // Find all map links and enhance them
        document.addEventListener('DOMContentLoaded', () => {
            const mapLinks = document.querySelectorAll('.map-link');
            mapLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleMapClick();
                });
            });
        });
    }

    handleMapClick() {
        if (this.isMobileDevice()) {
            this.showMobileOptions();
        } else {
            this.openDesktopMap();
        }
    }

    showMobileOptions() {
        // Create a simple mobile-friendly selection
        const options = [
            { name: 'Apple Maps', url: `http://maps.apple.com/?q=${encodeURIComponent(this.townshipAddress)}` },
            { name: 'Google Maps', url: `https://maps.google.com/?q=${encodeURIComponent(this.townshipAddress)}` },
            { name: 'Waze', url: `https://waze.com/ul?q=${encodeURIComponent(this.townshipAddress)}` },
            { name: 'Default Maps', url: `geo:${this.coordinates.lat},${this.coordinates.lng}?q=${encodeURIComponent(this.townshipAddress)}` }
        ];

        // Try the neutral geo: approach first (works on most modern mobile browsers)
        const geoUrl = `geo:${this.coordinates.lat},${this.coordinates.lng}?q=${encodeURIComponent(this.townshipAddress)}`;
        
        // Create a temporary link and click it
        const tempLink = document.createElement('a');
        tempLink.href = geoUrl;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        
        try {
            tempLink.click();
            // If geo: fails, some browsers will ignore it silently
            setTimeout(() => {
                document.body.removeChild(tempLink);
                // Fallback to Google Maps if geo: didn't work
                window.open(`https://maps.google.com/?q=${encodeURIComponent(this.townshipAddress)}`, '_blank');
            }, 500);
        } catch (error) {
            document.body.removeChild(tempLink);
            // If geo: fails completely, open Google Maps
            window.open(`https://maps.google.com/?q=${encodeURIComponent(this.townshipAddress)}`, '_blank');
        }
    }

    openDesktopMap() {
        // Use Bing Maps for desktop as originally intended
        const bingUrl = `https://www.bing.com/maps?q=${encodeURIComponent(this.townshipAddress)}`;
        window.open(bingUrl, '_blank');
    }
}

// Initialize smart maps when the script loads
new SmartMaps();