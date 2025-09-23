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

// Make functions globally available
function makeGlobalFunctions() {
    window.scrollToSection = scrollToSection;
    window.switchMemberTab = switchMemberTab;
    window.resetForm = resetForm;
    window.proceedToPayment = proceedToPayment;
    window.closeUPIModal = closeUPIModal;
    window.selectUPIMethod = selectUPIMethod;
    window.cancelPayment = cancelPayment;
    window.downloadReceipt = downloadReceipt;
    window.toggleFaq = toggleFaq;
    window.calculateFees = calculateFees;
    window.closeSuccessMessage = closeSuccessMessage;

    // Calendar functions
    window.openCalendar = openCalendar;
    window.closeCalendar = closeCalendar;
    window.selectDate = selectDate;
    window.previousMonth = previousMonth;
    window.nextMonth = nextMonth;
    window.changeMonth = changeMonth;
    window.changeYear = changeYear;
}

// ==================== NAVIGATION SYSTEM ====================
function initializeNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }

            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });

    console.log('✅ Navigation initialized');
}

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    try {
        const element = document.getElementById(sectionId);
        if (element) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            const elementPosition = element.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });

            // Update active nav link
            updateActiveNavLink(sectionId);
        }
    } catch (error) {
        console.error('Error scrolling to section:', error);
    }
}

function updateActiveNavLink(sectionId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current nav link
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ==================== CALENDAR SYSTEM ====================
// Initialize calendar
function initializeCalendar() {
    populateYearSelect();
    console.log('✅ Calendar initialized');
}

// Populate year select dropdown
function populateYearSelect() {
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) {
        yearSelect.innerHTML = '';

        // Generate years from current year down to 1900 (NO RESTRICTIONS)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }
}

// Open calendar modal
function openCalendar(inputId) {
    console.log('Opening calendar for:', inputId);
    currentDateInputId = inputId;
    const modal = document.getElementById('calendarModal');

    if (!modal) {
        console.error('Calendar modal not found');
        return;
    }

    // Get current value if exists
    const hiddenInput = document.getElementById(inputId);
    if (hiddenInput && hiddenInput.value) {
        selectedCalendarDate = new Date(hiddenInput.value);
        currentCalendarDate = new Date(selectedCalendarDate);
    } else {
        // Default to a reasonable date (25 years ago)
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() - 25);
        currentCalendarDate = defaultDate;
        selectedCalendarDate = null;
    }

    // Make sure modal is visible first
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Then update calendar
    setTimeout(() => {
        updateCalendarControls();
        generateCalendar();
    }, 10);
}

// Close calendar modal
function closeCalendar() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    currentDateInputId = null;
    selectedCalendarDate = null;
}

// Select date and close calendar
function selectDate() {
    if (selectedCalendarDate && currentDateInputId) {
        const hiddenInput = document.getElementById(currentDateInputId);
        const displayInput = document.getElementById(currentDateInputId + '_display');

        if (hiddenInput && displayInput) {
            // Format date for hidden input (YYYY-MM-DD)
            const dateString = selectedCalendarDate.toISOString().split('T')[0];
            hiddenInput.value = dateString;

            // Format date for display
            const displayDate = selectedCalendarDate.toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            displayInput.value = displayDate;

            // Save member data
            saveMemberData();
            showNotification('Date selected successfully!', 'success');
        }
    } else {
        showNotification('Please select a date first.', 'error');
        return;
    }

    closeCalendar();
}

// Navigate to previous month
function previousMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    updateCalendarControls();
    generateCalendar();
}

// Navigate to next month
function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    updateCalendarControls();
    generateCalendar();
}

// Change month from dropdown
function changeMonth() {
    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
        currentCalendarDate.setMonth(parseInt(monthSelect.value));
        generateCalendar();
    }
}

// Change year from dropdown
function changeYear() {
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) {
        currentCalendarDate.setFullYear(parseInt(yearSelect.value));
        generateCalendar();
    }
}

// Update calendar controls (month/year selects)
function updateCalendarControls() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');

    if (monthSelect) {
        monthSelect.value = currentCalendarDate.getMonth();
    }

    if (yearSelect) {
        yearSelect.value = currentCalendarDate.getFullYear();
    }
}

// Generate calendar grid
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) {
        console.error('Calendar days container not found');
        return;
    }

    console.log('Generating calendar for:', currentCalendarDate);

    // Clear existing calendar days
    calendarDays.innerHTML = '';

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const today = new Date();

    // Get first day of the month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    // Get previous month's last days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    // Add previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
        const dayNumber = daysInPrevMonth - i;
        const dayElement = createCalendarDay(dayNumber, true, new Date(year, month - 1, dayNumber));
        calendarDays.appendChild(dayElement);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const dayElement = createCalendarDay(day, false, dayDate);
        calendarDays.appendChild(dayElement);
    }

    // Add next month's days to fill the grid
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days

    for (let day = 1; day <= remainingCells && day <= 14; day++) {
        const dayElement = createCalendarDay(day, true, new Date(year, month + 1, day));
        calendarDays.appendChild(dayElement);
    }

    console.log('Calendar generated with', calendarDays.children.length, 'day cells');
}

// Create individual calendar day element
function createCalendarDay(dayNumber, isOtherMonth, date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = dayNumber;

    const today = new Date();

    // Add classes based on conditions
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
    }

    // Check if it's selected
    if (selectedCalendarDate && date.toDateString() === selectedCalendarDate.toDateString()) {
        dayElement.classList.add('selected');
    }

    // Add click event
    dayElement.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });

        // Add selection to clicked day
        dayElement.classList.add('selected');
        selectedCalendarDate = new Date(date);
        console.log('Date selected:', selectedCalendarDate);
    });

    return dayElement;
}

// ==================== REGISTRATION SYSTEM ====================
// Registration functionality
function initializeRegistration() {
    console.log('Initializing registration...');
    switchMemberTab(1);

    const allInputs = document.querySelectorAll('.form-input, .form-select');
    allInputs.forEach(input => {
        input.addEventListener('change', function() {
            saveMemberData();
            if (this.id === 'main_event' || this.id === 'additional_event') {
                calculateFees();
            }
        });

        input.addEventListener('input', function() {
            saveMemberData();
        });
    });

    console.log('✅ Registration initialized');
}

// Calculate fees based on event selection
function calculateFees() {
    const additionalEventSelect = document.getElementById('additional_event');
    const additionalEventValue = additionalEventSelect ? additionalEventSelect.value : '';

    let additionalFee = 0;

    // Charge ₹30 for additional events (except "None")
    if (additionalEventValue && additionalEventValue !== '' && additionalEventValue !== 'None') {
        additionalFee = 30;
    }

    const baseFee = 50;
    const totalFee = baseFee + additionalFee;

    // Update registration data
    registrationData.baseFee = baseFee;
    registrationData.additionalEventFee = additionalFee;
    registrationData.totalFee = totalFee;

    // Update UI elements
    updateFeeDisplay(baseFee, additionalFee, totalFee);
    console.log('Fees calculated:', { baseFee, additionalFee, totalFee });
}

// Update fee display in the form
function updateFeeDisplay(baseFee, additionalFee, totalFee) {
    const baseFeeElement = document.getElementById('baseFee');
    const additionalFeeElement = document.getElementById('additionalFee');
    const additionalFeeRow = document.getElementById('additionalFeeRow');
    const totalFeeElement = document.getElementById('totalFee');

    if (baseFeeElement) baseFeeElement.textContent = `₹${baseFee}`;
    if (additionalFeeElement) additionalFeeElement.textContent = `₹${additionalFee}`;
    if (totalFeeElement) totalFeeElement.textContent = `₹${totalFee}`;

    // Show/hide additional fee row
    if (additionalFeeRow) {
        if (additionalFee > 0) {
            additionalFeeRow.style.display = 'flex';
        } else {
            additionalFeeRow.style.display = 'none';
        }
    }

    // Update modal elements if they exist
    updateModalFeeDisplay(baseFee, additionalFee, totalFee);
}

// Update fee display in modal
function updateModalFeeDisplay(baseFee, additionalFee, totalFee) {
    const modalBaseFee = document.getElementById('modalBaseFee');
    const modalAdditionalFee = document.getElementById('modalAdditionalFee');
    const modalAdditionalFeeRow = document.getElementById('modalAdditionalFeeRow');
    const modalTotalFee = document.getElementById('modalTotalFee');
    const processingFee = document.getElementById('processingFee');

    if (modalBaseFee) modalBaseFee.textContent = `₹${baseFee}`;
    if (modalAdditionalFee) modalAdditionalFee.textContent = `₹${additionalFee}`;
    if (modalTotalFee) modalTotalFee.textContent = `₹${totalFee}`;
    if (processingFee) processingFee.textContent = `₹0`;

    if (modalAdditionalFeeRow) {
        if (additionalFee > 0) {
            modalAdditionalFeeRow.style.display = 'flex';
        } else {
            modalAdditionalFeeRow.style.display = 'none';
        }
    }
}

// Switch between member tabs
function switchMemberTab(memberNumber) {
    console.log('Switching to member tab:', memberNumber);

    if (memberNumber < 1 || memberNumber > 4) {
        console.error('Invalid member number:', memberNumber);
        return;
    }

    saveMemberData();
    currentMember = memberNumber;

    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`tab-${memberNumber}`).classList.add('active');

    // Update member forms
    document.querySelectorAll('.member-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`member-${memberNumber}`).classList.add('active');

    // Load member data
    loadMemberData(memberNumber);
}

// Save current member data
function saveMemberData() {
    const memberIndex = currentMember - 1;
    const memberData = {};
    const memberForm = document.getElementById(`member-${currentMember}`);

    if (memberForm) {
        const inputs = memberForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.value.trim() && !input.id.includes('_display')) {
                const key = input.id.replace(`member${currentMember}_`, '');
                memberData[key] = input.value;
            }
        });
    }

    // Save event selections
    const mainEvent = document.getElementById('main_event');
    const additionalEvent = document.getElementById('additional_event');

    if (mainEvent && mainEvent.value) {
        registrationData.mainEvent = mainEvent.value;
    }

    if (additionalEvent && additionalEvent.value) {
        registrationData.additionalEvent = additionalEvent.value;
    }

    registrationData.members[memberIndex] = memberData;
    console.log('Saved member data:', registrationData);
}

// Load member data into form
function loadMemberData(memberNumber) {
    const memberIndex = memberNumber - 1;
    const memberData = registrationData.members[memberIndex];

    if (memberData) {
        Object.keys(memberData).forEach(key => {
            if (key === 'dob') {
                const hiddenInput = document.getElementById(`member${memberNumber}_${key}`);
                const displayInput = document.getElementById(`member${memberNumber}_${key}_display`);

                if (hiddenInput && displayInput && memberData[key]) {
                    hiddenInput.value = memberData[key];
                    const date = new Date(memberData[key]);
                    const displayDate = date.toLocaleDateString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    displayInput.value = displayDate;
                }
            } else {
                const input = document.getElementById(`member${memberNumber}_${key}`);
                if (input) {
                    input.value = memberData[key];
                }
            }
        });
    }

    // Load event selections
    const mainEvent = document.getElementById('main_event');
    const additionalEvent = document.getElementById('additional_event');

    if (mainEvent && registrationData.mainEvent) {
        mainEvent.value = registrationData.mainEvent;
    }

    if (additionalEvent && registrationData.additionalEvent) {
        additionalEvent.value = registrationData.additionalEvent;
    }
}

// Reset form
function resetForm() {
    console.log('Resetting form...');

    registrationData = {
        members: [{}, {}, {}, {}],
        mainEvent: '',
        additionalEvent: '',
        baseFee: 50,
        additionalEventFee: 0,
        totalFee: 50
    };

    const form = document.getElementById('registrationForm');
    if (form) {
        form.querySelectorAll('input, select').forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });

        // Clear all date display inputs
        form.querySelectorAll('.date-display').forEach(input => {
            input.value = '';
        });
    }

    switchMemberTab(1);
    calculateFees();

    const successMessage = document.getElementById('successMessage');
    const upiModal = document.getElementById('upiModal');
    if (successMessage) successMessage.classList.add('hidden');
    if (upiModal) upiModal.classList.add('hidden');

    showNotification('Form reset successfully!', 'info');
}

// Validate required fields for Member 1
function validateMember1() {
    const requiredFields = [
        'member1_name',
        'member1_dob',
        'member1_phone',
        'member1_email',
        'member1_branch',
        'member1_college',
        'main_event'
    ];

    let isValid = true;
    let errorFields = [];

    requiredFields.forEach(fieldId => {
        let field = document.getElementById(fieldId);

        // For DOB, check the hidden field
        if (fieldId === 'member1_dob' && (!field || !field.value)) {
            const displayField = document.getElementById('member1_dob_display');
            if (displayField) {
                displayField.style.borderColor = '#ff4444';
                displayField.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
            }
            isValid = false;
            errorFields.push(fieldId);
        } else if (field && !field.value.trim()) {
            field.style.borderColor = '#ff4444';
            field.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
            isValid = false;
            errorFields.push(fieldId);
        } else if (field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    });

    // Email validation
    const emailField = document.getElementById('member1_email');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            emailField.style.borderColor = '#ff4444';
            emailField.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
            isValid = false;
            showNotification('Please enter a valid email address.', 'error');
        }
    }

    // Phone validation
    const phoneField = document.getElementById('member1_phone');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneField.value.trim().replace(/[^\d]/g, ''))) {
            phoneField.style.borderColor = '#ff4444';
            phoneField.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
            isValid = false;
            showNotification('Please enter a valid 10-digit phone number.', 'error');
        }
    }

    if (!isValid) {
        console.log('Validation failed for fields:', errorFields);
        showNotification('Please fill in all required fields for Member 1 correctly.', 'error');
    }

    return isValid;
}

// Proceed to payment
function proceedToPayment() {
    console.log('Proceeding to payment...');
    saveMemberData();
    calculateFees();

    if (!validateMember1()) {
        return;
    }

    // Update modal with current fees
    updateModalFeeDisplay(registrationData.baseFee, registrationData.additionalEventFee, registrationData.totalFee);

    const upiModal = document.getElementById('upiModal');
    if (upiModal) {
        upiModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close UPI modal
function closeUPIModal() {
    const upiModal = document.getElementById('upiModal');
    if (upiModal) {
        upiModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Select UPI method and process payment
function selectUPIMethod(method) {
    console.log('Selected UPI method:', method);
    showNotification(`Processing payment with ${method}...`, 'info');

    // Simulate payment processing
    setTimeout(() => {
        processPaymentSuccess();
    }, 2000);
}

// Process successful payment
function processPaymentSuccess() {
    const registrationId = generateRegistrationId();
    closeUPIModal();

    const successMessage = document.getElementById('successMessage');
    const registrationIdElement = document.getElementById('registrationId');
    const selectedEventElement = document.getElementById('selectedEvent');
    const paidAmountElement = document.getElementById('paidAmount');

    if (successMessage) successMessage.classList.remove('hidden');
    if (registrationIdElement) registrationIdElement.textContent = registrationId;
    if (selectedEventElement) selectedEventElement.textContent = registrationData.mainEvent || 'Autotron Hackathon 2026';
    if (paidAmountElement) paidAmountElement.textContent = `₹${registrationData.totalFee}`;

    showNotification('Registration completed successfully!', 'success');

    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Cancel payment
function cancelPayment() {
    closeUPIModal();
    showNotification('Payment cancelled', 'info');
}

// Close success message
function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Generate registration ID
function generateRegistrationId() {
    const prefix = 'AT2026';
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${randomNum}`;
}

// Download receipt
function downloadReceipt() {
    showNotification('Receipt download started', 'success');

    let memberCount = 0;
    let memberNames = [];
    let memberDetails = [];

    for (let i = 0; i < 4; i++) {
        const memberData = registrationData.members[i];
        if (memberData && memberData.name && memberData.name.trim()) {
            memberCount++;
            memberNames.push(`Member ${i + 1}: ${memberData.name}`);

            // Format DOB for display
            let dobDisplay = 'N/A';
            if (memberData.dob) {
                const date = new Date(memberData.dob);
                dobDisplay = date.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            memberDetails.push(`
Member ${i + 1}:
Name: ${memberData.name}
DOB: ${dobDisplay}
Phone: ${memberData.phone || 'N/A'}
Email: ${memberData.email || 'N/A'}
Branch: ${memberData.branch || 'N/A'}
College: ${memberData.college || 'N/A'}
`);
        }
    }

    const receipt = `
AUTOTRON 2026 REGISTRATION RECEIPT
==================================
Registration ID: ${document.getElementById('registrationId').textContent}
Event Date: January 15-16, 2026
Venue: Park College of Engineering and Technology, Coimbatore

TEAM INFORMATION
================
Team Size: ${memberCount} member(s)

${memberDetails.join('\n')}

EVENT SELECTION
===============
Main Event: ${registrationData.mainEvent || 'Not selected'}
Additional Event: ${registrationData.additionalEvent || 'None'}

PAYMENT DETAILS
===============
Registration Fee: ₹${registrationData.baseFee}
Additional Event Fee: ₹${registrationData.additionalEventFee}
Total Amount Paid: ₹${registrationData.totalFee}
Payment Status: Confirmed
Payment Date: ${new Date().toLocaleDateString()}
Payment Time: ${new Date().toLocaleTimeString()}

CONTACT INFORMATION
==================
Email: hello@autotron2026.com
Phone: +91 98765 43210

IMPORTANT INSTRUCTIONS
=====================
1. Bring a valid ID proof to the venue
2. Report to registration desk by 9:00 AM on January 15, 2026
3. Keep this receipt for entry to the event
4. Contact us for any queries or support

==================================
Thank you for registering for Autotron 2026!
We look forward to seeing you at the event.
==================================
`;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autotron-2026-receipt-${document.getElementById('registrationId').textContent}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ==================== FAQ SYSTEM ====================
// FAQ functionality
function toggleFaq(button) {
    try {
        const faqItem = button.closest('.faq__item');
        const answer = faqItem.querySelector('.faq__answer');
        const icon = button.querySelector('.faq__icon');
        const isOpen = answer.classList.contains('open');

        // Close all other open answers
        document.querySelectorAll('.faq__answer.open').forEach(openAnswer => {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('open');
                const openButton = openAnswer.closest('.faq__item').querySelector('.faq__question');
                const openIcon = openButton.querySelector('.faq__icon');
                openIcon.textContent = '+';
                openIcon.style.transform = 'rotate(0deg)';
            }
        });

        if (isOpen) {
            answer.classList.remove('open');
            icon.textContent = '+';
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.add('open');
            icon.textContent = '−';
            icon.style.transform = 'rotate(180deg)';
        }
    } catch (error) {
        console.error('Error in toggleFaq:', error);
    }
}

function initializeFAQ() {
    try {
        document.querySelectorAll('.faq__icon').forEach(icon => {
            icon.textContent = '+';
        });

        document.querySelectorAll('.faq__question').forEach(question => {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFaq(this);
            });
        });

        console.log('✅ FAQ initialized');
    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

// ==================== CONTACT FORM ====================
// Contact form functionality
function initializeContactForm() {
    try {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('contactName').value.trim();
                const email = document.getElementById('contactEmail').value.trim();
                const message = document.getElementById('contactMessage').value.trim();

                let isValid = true;

                if (!name) {
                    document.getElementById('contactName').style.borderColor = 'var(--color-error)';
                    isValid = false;
                } else {
                    document.getElementById('contactName').style.borderColor = '';
                }

                if (!email || !validateEmail(email)) {
                    document.getElementById('contactEmail').style.borderColor = 'var(--color-error)';
                    isValid = false;
                } else {
                    document.getElementById('contactEmail').style.borderColor = '';
                }

                if (!message) {
                    document.getElementById('contactMessage').style.borderColor = 'var(--color-error)';
                    isValid = false;
                } else {
                    document.getElementById('contactMessage').style.borderColor = '';
                }

                if (isValid) {
                    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Please fill in all required fields correctly.', 'error');
                }
            });

            ['contactName', 'contactEmail', 'contactMessage'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                }
            });
        }

        console.log('✅ Contact form initialized');
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== UTILITY FUNCTIONS ====================
// Fix form elements functionality
function fixFormElements() {
    console.log('Fixing form elements...');

    const allSelects = document.querySelectorAll('select');
    allSelects.forEach(select => {
        select.disabled = false;
        select.style.pointerEvents = 'auto';
        select.style.cursor = 'pointer';
        select.removeAttribute('disabled');
        select.removeAttribute('readonly');

        select.addEventListener('change', function() {
            console.log('Select changed:', this.id, this.value);
            saveMemberData();
            if (this.id === 'main_event' || this.id === 'additional_event') {
                calculateFees();
            }
        });

        select.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 15px rgba(var(--color-primary-rgb), 0.2)';
        });

        select.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        if (!input.classList.contains('date-display')) {
            input.style.pointerEvents = 'auto';
            input.removeAttribute('disabled');
            input.removeAttribute('readonly');
        }

        input.addEventListener('input', function() {
            saveMemberData();
        });

        input.addEventListener('change', function() {
            saveMemberData();
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 15px rgba(var(--color-primary-rgb), 0.2)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    console.log('✅ Form elements fixed');
}

// Scroll effects
function initializeScrollEffects() {
    try {
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 100) {
                    header.style.backgroundColor = 'rgba(var(--color-slate-900-rgb), 0.98)';
                } else {
                    header.style.backgroundColor = 'rgba(var(--color-slate-900-rgb), 0.95)';
                }
            }
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.about__card, .track__card, .prize__card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        console.log('✅ Scroll effects initialized');
    } catch (error) {
        console.error('Error initializing scroll effects:', error);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    try {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);

        console.log('Notification shown:', message, type);
    } catch (error) {
        console.error('Error showing notification:', error);
        // Fallback to alert
        alert(message);
    }
}

// ==================== EVENT LISTENERS ====================
// Modal click outside to close
document.addEventListener('click', function(e) {
    // Close calendar modal when clicking outside
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal && !calendarModal.classList.contains('hidden')) {
        const modalContent = calendarModal.querySelector('.date-picker-container');
        if (modalContent && !modalContent.contains(e.target)) {
            closeCalendar();
        }
    }

    // Close UPI modal when clicking outside
    const upiModal = document.getElementById('upiModal');
    if (upiModal && !upiModal.classList.contains('hidden')) {
        const modalContent = upiModal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
            closeUPIModal();
        }
    }

    // Close success modal when clicking outside
    const successMessage = document.getElementById('successMessage');
    if (successMessage && !successMessage.classList.contains('hidden')) {
        const modalContent = successMessage.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
            closeSuccessMessage();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCalendar();
        closeUPIModal();
        closeSuccessMessage();
    }
});

console.log('✅ Autotron 2026 - All systems loaded successfully!');