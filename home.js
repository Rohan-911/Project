document.addEventListener('DOMContentLoaded', function() {
    // Initialize statistics with animation
    initializeStats();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }

    // Handle quick search
    const quickSearch = document.getElementById('quickSearch');
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleQuickSearch);
    }

    // Add scroll animations
    window.addEventListener('scroll', handleScrollAnimations);

    // Login Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Open modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { username, password, remember });

        // For demo purposes, show a success message
        alert('Login functionality will be implemented with backend integration');
        
        // Close the modal
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Initialize statistics with counting animation
function initializeStats() {
    const stats = {
        totalRecovered: 150,
        totalClaimed: 95,
        underInvestigation: 25,
        availableClaim: 30
    };

    Object.keys(stats).forEach(key => {
        animateNumber(key, stats[key]);
    });
}

// Animate number counting up
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = target / 50; // Will take 50 steps to reach target
    const interval = 40; // 40ms between each increment

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, interval);
}

// Handle contact form submission
function handleContactSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // In a real application, this would be an API call
    console.log('Sending message:', data);

    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Handle quick search
function handleQuickSearch() {
    const searchInput = document.getElementById('quickSearch');
    if (!searchInput) return;

    const query = searchInput.value.trim();
    if (query.length < 3) {
        showNotification('Please enter at least 3 characters to search', 'error');
        return;
    }

    // In a real application, this would search the database
    console.log('Searching for:', query);
    
    // Redirect to inventory page with search query
    window.location.href = `inventory.html?search=${encodeURIComponent(query)}`;
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.stat-card, .step, .contact-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.stat-card, .step, .contact-container');
    
    elements.forEach(element => {
        Object.assign(element.style, {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease'
        });
    });
}); 