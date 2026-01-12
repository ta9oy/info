// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefer color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme on load
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Dynamic Calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    
    if (!calendarGrid) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const today = now.getDate();
    
    // Set month and year display
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get last month's last dates
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
    
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Add previous month dates
    for (let i = firstDay - 1; i >= 0; i--) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date other-month';
        dateElement.textContent = prevMonthLastDate - i;
        calendarGrid.appendChild(dateElement);
    }
    
    // Add current month dates
    for (let i = 1; i <= lastDate; i++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = i;
        
        // Highlight today's date
        if (i === today) {
            dateElement.classList.add('today');
        }
        
        calendarGrid.appendChild(dateElement);
    }
    
    // Add next month dates to complete grid
    const totalCells = 42; // 6 rows * 7 days
    const remainingCells = totalCells - (firstDay + lastDate);
    
    for (let i = 1; i <= remainingCells; i++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date other-month';
        dateElement.textContent = i;
        calendarGrid.appendChild(dateElement);
    }
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // For GitHub Pages static hosting, we show success message
            // In production, connect to Formspree/Getform
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 5 seconds (optional)
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    initMobileNav();
    initContactForm();
    setCurrentYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Update calendar on month change (optional - for demo purposes)
setInterval(() => {
    const now = new Date();
    if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
        generateCalendar();
    }
}, 60000); // Check every minute