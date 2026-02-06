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
    
    // Add screen reader text to external links for accessibility
    enhanceExternalLinks();
    
    // Hide decorative emojis from screen readers
    hideDecorativeEmojis();
});

/**
 * Adds screen reader accessible text to links that open in new windows
 * This helps screen reader users understand the link behavior
 */
function enhanceExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Check if already enhanced
        if (link.querySelector('.sr-only')) return;
        
        // Add rel="noopener noreferrer" if not present
        if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Create screen reader text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = ' (opens in new window)';
        link.appendChild(srText);
    });
}

/**
 * Hides decorative emojis from screen readers by wrapping them in aria-hidden spans
 * This prevents screen readers from reading out emoji descriptions
 */
function hideDecorativeEmojis() {
    // Common emoji unicode ranges and specific emojis used on the site
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
    
    // Get all text nodes in the document
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    while (walker.nextNode()) {
        if (emojiRegex.test(walker.currentNode.textContent)) {
            textNodes.push(walker.currentNode);
        }
    }
    
    textNodes.forEach(node => {
        // Skip if parent is already aria-hidden or is a script/style
        const parent = node.parentNode;
        if (parent.getAttribute && parent.getAttribute('aria-hidden') === 'true') return;
        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;
        
        // Replace emojis with aria-hidden spans
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        // Reset regex
        emojiRegex.lastIndex = 0;
        
        while ((match = emojiRegex.exec(text)) !== null) {
            // Add text before emoji
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            
            // Add emoji in aria-hidden span
            const span = document.createElement('span');
            span.setAttribute('aria-hidden', 'true');
            span.textContent = match[0];
            fragment.appendChild(span);
            
            lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        
        // Only replace if changes were made
        if (fragment.childNodes.length > 1) {
            parent.replaceChild(fragment, node);
        }
    });
}