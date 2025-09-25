// Autotron Hackathon 2026 - Complete JavaScript with All Functionality

// Calendar-related global variables
let currentCalendarDate = new Date();
let selectedCalendarDate = null;
let currentDateInputId = null;

// Global variables
let currentMember = 1;
let registrationData = {
    members: [{}, {}, {}, {}],
    mainEvent: '',
    additionalEvent: '',
    baseFee: 50,
    additionalEventFee: 0,
    totalFee: 50
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Autotron 2026 - Application starting...');
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeRegistration();
    initializeContactForm();
    initializeFAQ();
    initializeScrollEffects();
    initializeCalendar();

    // Ensure all functions are available globally
    makeGlobalFunctions();

    // Fix form elements after initialization
    setTimeout(fixFormElements, 100);

    // Initialize fee calculation
    calculateFees();

    console.log('✅ Application initialized successfully');
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Add click event to toggle
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Close menu when clicking on menu links
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Close mobile menu if open
        closeMobileMenu();

        // Smooth scroll to section
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active link
        updateActiveNavLink(sectionId);
    }
}

function updateActiveNavLink(sectionId) {
    // Remove active class from all links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to current link
    const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ==================== REGISTRATION SYSTEM ====================
function initializeRegistration() {
    // Initialize member tabs
    initializeMemberTabs();

    // Initialize form validation
    initializeFormValidation();

    console.log('✅ Registration system initialized');
}

function initializeMemberTabs() {
    // Member tab switching functionality
    window.switchMemberTab = function(memberNumber) {
        // Hide all forms
        const forms = document.querySelectorAll('.member-form');
        forms.forEach(form => form.classList.remove('active'));

        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.remove('active'));

        // Show selected form and activate tab
        const targetForm = document.getElementById(`member-${memberNumber}`);
        const targetTab = document.getElementById(`tab-${memberNumber}`);

        if (targetForm && targetTab) {
            targetForm.classList.add('active');
            targetTab.classList.add('active');
            currentMember = memberNumber;
        }
    };
}

function initializeFormValidation() {
    // Form validation will be added here
    console.log('✅ Form validation initialized');
}

// ==================== CALENDAR SYSTEM ====================
function initializeCalendar() {
    // Calendar initialization
    console.log('✅ Calendar system initialized');

    // Make calendar functions global
    window.openCalendar = function(inputId) {
        currentDateInputId = inputId;
        const modal = document.getElementById('calendarModal');
        if (modal) {
            modal.classList.remove('hidden');
            generateCalendar();
        }
    };

    window.closeCalendar = function() {
        const modal = document.getElementById('calendarModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };
}

function generateCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Create calendar HTML
    let calendarHTML = `
        <div class="calendar">
            <div class="calendar-header">
                <button onclick="previousMonth()">&lt;</button>
                <h4>${getMonthName(currentMonth)} ${currentYear}</h4>
                <button onclick="nextMonth()">&gt;</button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-header">Sun</div>
                <div class="calendar-day-header">Mon</div>
                <div class="calendar-day-header">Tue</div>
                <div class="calendar-day-header">Wed</div>
                <div class="calendar-day-header">Thu</div>
                <div class="calendar-day-header">Fri</div>
                <div class="calendar-day-header">Sat</div>
    `;

    // Generate calendar days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && 
                       currentMonth === today.getMonth() && 
                       currentYear === today.getFullYear();

        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''}" 
                 onclick="selectDate(${day}, ${currentMonth}, ${currentYear})">
                ${day}
            </div>
        `;
    }

    calendarHTML += '</div></div>';
    container.innerHTML = calendarHTML;
}

function getMonthName(monthIndex) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
}

function selectDate(day, month, year) {
    if (currentDateInputId) {
        const selectedDate = new Date(year, month, day);
        const formattedDate = selectedDate.toLocaleDateString('en-GB');

        const input = document.getElementById(currentDateInputId);
        if (input) {
            input.value = formattedDate;
        }
    }

    closeCalendar();
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// ==================== FAQ SYSTEM ====================
function initializeFAQ() {
    window.toggleFaq = function(button) {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq__icon');

        if (answer && icon) {
            answer.classList.toggle('open');

            if (answer.classList.contains('open')) {
                icon.textContent = '−';
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            }
        }
    };
}

// ==================== SCROLL EFFECTS ====================
function initializeScrollEffects() {
    // Add scroll-based navigation highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            updateActiveNavLink(current);
        }
    }

    window.addEventListener('scroll', highlightNavigation);
}

// ==================== FEE CALCULATION ====================
function calculateFees() {
    const baseFee = 50;
    let additionalEventFee = 0;

    const additionalEvent = document.getElementById('additional_event');
    if (additionalEvent && additionalEvent.value) {
        additionalEventFee = 30; // Additional event fee
    }

    const totalFee = baseFee + additionalEventFee;

    // Update fee display
    const baseFeeElement = document.getElementById('baseFee');
    const additionalFeeElement = document.getElementById('additionalFee');
    const additionalFeeRow = document.getElementById('additionalFeeRow');
    const totalFeeElement = document.getElementById('totalFee');

    if (baseFeeElement) baseFeeElement.textContent = `₹${baseFee}`;
    if (additionalFeeElement) additionalFeeElement.textContent = `₹${additionalEventFee}`;
    if (totalFeeElement) totalFeeElement.textContent = `₹${totalFee}`;

    if (additionalFeeRow) {
        if (additionalEventFee > 0) {
            additionalFeeRow.style.display = 'flex';
        } else {
            additionalFeeRow.style.display = 'none';
        }
    }

    // Update registration data
    registrationData.baseFee = baseFee;
    registrationData.additionalEventFee = additionalEventFee;
    registrationData.totalFee = totalFee;
}

// ==================== PAYMENT SYSTEM ====================
function proceedToPayment() {
    // Validate form first
    if (validateRegistrationForm()) {
        // Show payment modal
        const paymentModal = document.getElementById('upiModal');
        if (paymentModal) {
            paymentModal.classList.remove('hidden');
            updatePaymentModal();
        }
    }
}

function validateRegistrationForm() {
    // Basic validation
    const member1Name = document.getElementById('member1_name');
    const member1Email = document.getElementById('member1_email');
    const member1Phone = document.getElementById('member1_phone');
    const mainEvent = document.getElementById('main_event');

    if (!member1Name || !member1Name.value.trim()) {
        alert('Please enter team leader name');
        return false;
    }

    if (!member1Email || !member1Email.value.trim()) {
        alert('Please enter team leader email');
        return false;
    }

    if (!member1Phone || !member1Phone.value.trim()) {
        alert('Please enter team leader phone number');
        return false;
    }

    if (!mainEvent || !mainEvent.value) {
        alert('Please select a main event');
        return false;
    }

    return true;
}

function updatePaymentModal() {
    // Update payment modal with current fees
    const modalBaseFee = document.getElementById('modalBaseFee');
    const modalAdditionalFee = document.getElementById('modalAdditionalFee');
    const modalAdditionalFeeRow = document.getElementById('modalAdditionalFeeRow');
    const modalTotalFee = document.getElementById('modalTotalFee');

    if (modalBaseFee) modalBaseFee.textContent = `₹${registrationData.baseFee}`;
    if (modalAdditionalFee) modalAdditionalFee.textContent = `₹${registrationData.additionalEventFee}`;
    if (modalTotalFee) modalTotalFee.textContent = `₹${registrationData.totalFee}`;

    if (modalAdditionalFeeRow) {
        if (registrationData.additionalEventFee > 0) {
            modalAdditionalFeeRow.style.display = 'flex';
        } else {
            modalAdditionalFeeRow.style.display = 'none';
        }
    }
}

function selectUPIMethod(method) {
    // Simulate payment processing
    console.log(`Processing payment via ${method}...`);

    // Close payment modal
    closeUPIModal();

    // Show success message
    setTimeout(() => {
        showRegistrationSuccess();
    }, 1000);
}

function closeUPIModal() {
    const paymentModal = document.getElementById('upiModal');
    if (paymentModal) {
        paymentModal.classList.add('hidden');
    }
}

function showRegistrationSuccess() {
    const successModal = document.getElementById('successMessage');
    const registrationId = 'AUTO' + Math.random().toString(36).substr(2, 9).toUpperCase();

    if (successModal) {
        // Update success message details
        const regIdElement = document.getElementById('registrationId');
        const selectedEventElement = document.getElementById('selectedEvent');
        const paidAmountElement = document.getElementById('paidAmount');

        if (regIdElement) regIdElement.textContent = registrationId;
        if (selectedEventElement) {
            const mainEvent = document.getElementById('main_event');
            selectedEventElement.textContent = mainEvent ? mainEvent.value : 'Selected Event';
        }
        if (paidAmountElement) paidAmountElement.textContent = `₹${registrationData.totalFee}`;

        successModal.classList.remove('hidden');
    }
}

function closeSuccessMessage() {
    const successModal = document.getElementById('successMessage');
    if (successModal) {
        successModal.classList.add('hidden');
    }
}

function resetForm() {
    // Reset the registration form
    const form = document.getElementById('registrationForm');
    if (form) {
        form.reset();

        // Reset to first member tab
        switchMemberTab(1);

        // Recalculate fees
        calculateFees();
    }
}

function downloadReceipt() {
    // Simulate receipt download
    console.log('Downloading receipt...');
    alert('Receipt downloaded successfully!');
}

// ==================== UTILITY FUNCTIONS ====================
function makeGlobalFunctions() {
    // Ensure all functions are available globally
    window.scrollToSection = scrollToSection;
    window.switchMemberTab = switchMemberTab;
    window.calculateFees = calculateFees;
    window.proceedToPayment = proceedToPayment;
    window.selectUPIMethod = selectUPIMethod;
    window.closeUPIModal = closeUPIModal;
    window.closeSuccessMessage = closeSuccessMessage;
    window.resetForm = resetForm;
    window.downloadReceipt = downloadReceipt;
    window.toggleFaq = toggleFaq;
    window.openCalendar = openCalendar;
    window.closeCalendar = closeCalendar;
    window.selectDate = selectDate;
}

function fixFormElements() {
    // Fix any form element issues after initialization
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.id === 'main_event' || this.id === 'additional_event') {
                calculateFees();
            }
        });
    });
}

// Initialize the application
console.log('🚀 Autotron 2026 - JavaScript loaded');
