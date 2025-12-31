// Shared Footer Loader
// Loads the shared footer component on page load

document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        // Determine the correct path to footer.html based on current page location
        const isSubdirectory = window.location.pathname.includes('/services/') || window.location.pathname.includes('/community/');
        const footerPath = isSubdirectory ? '../assets/footer.html' : 'assets/footer.html';
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback: basic footer if loading fails
                footerPlaceholder.innerHTML = '<footer><div class="container"><p>Colfax Township • Phone: (xxx) xxx-xxxx • Email: info@colfaxtownship.org</p></div></footer>';
            });
    }
});