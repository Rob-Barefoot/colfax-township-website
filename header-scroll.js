// Dynamic Header Script
// Handles header shrinking on scroll

class DynamicHeader {
    constructor() {
        this.header = document.querySelector('header');
        this.scrollThreshold = 100; // Start hiding at 100px
        this.hideLogoThreshold = 150; // Hide logo at 150px
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > this.scrollThreshold) {
            this.header.classList.add('header-scrolled');
        } else {
            this.header.classList.remove('header-scrolled');
        }
        
        if (scrollY > this.hideLogoThreshold) {
            this.header.classList.add('header-compact');
        } else {
            this.header.classList.remove('header-compact');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DynamicHeader();
});