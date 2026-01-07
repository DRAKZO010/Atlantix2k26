// Atlantix Hackathon 2026 - Complete JavaScript
// Atlantix Hackathon 2026 - Complete JavaScript
(function() {
    // Wait for the window to fully load everything (including snippets)
    window.addEventListener('load', function() {
        if (window.env && window.env.EMAILJS_PUBLIC_KEY) {
            emailjs.init(window.env.EMAILJS_PUBLIC_KEY);
            console.log("✅ EmailJS Initialized Successfully!");
        } else {
            console.error("❌ EmailJS failed: window.env is still missing after page load.");
        }
    });
})();


let registrationData = {
    members: [{}, {}, {}, {}],
    mainEvent: '',
    additionalEvent: '',
    baseFee: 50,
    additionalEventFee: 0,
    totalFee: 50
};

// Calendar-related global variables
let currentCalendarDate = new Date();
let selectedCalendarDate = null;
let currentDateInputId = null;

// Global variables
let currentMember = 1;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Atlantix 2026 - Application starting...');
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
    let technicalEventFee = 0;
    let nonTechnicalEventFee = 0;

    // Technical event fees
    const technicalEvent = document.getElementById('main_event');
    if (technicalEvent && technicalEvent.value) {
        // Different fees for different technical events
        const technicalFees = {
            'Paper Presentation': 30,
            'Line Follower Robot': 50,
            'CAD Designing': 40,
            'Drag Race': 60,
            'Robo Soccer': 70,
            'Technical Quiz': 25,
            'CTF': 45,
            'Pit Stop Challenge': 55
        };
        technicalEventFee = technicalFees[technicalEvent.value] || 30;
    }

    // Non-technical event fee (only Free Fire has additional cost)
    const nonTechnicalEvent = document.getElementById('additional_event');
    if (nonTechnicalEvent && nonTechnicalEvent.value === 'Free Fire') {
        nonTechnicalEventFee = 30;
    }
    // Other non-technical events are free (no additional cost)

    const totalFee = baseFee + technicalEventFee + nonTechnicalEventFee;

    // Update fee display
    const baseFeeElement = document.getElementById('baseFee');
    const technicalFeeElement = document.getElementById('technicalFee');
    const technicalFeeRow = document.getElementById('technicalFeeRow');
    const additionalFeeElement = document.getElementById('additionalFee');
    const additionalFeeRow = document.getElementById('additionalFeeRow');
    const totalFeeElement = document.getElementById('totalFee');

    if (baseFeeElement) baseFeeElement.textContent = `₹${baseFee}`;
    
    // Technical event fee display
    if (technicalFeeElement) technicalFeeElement.textContent = `₹${technicalEventFee}`;
    if (technicalFeeRow) {
        if (technicalEventFee > 0) {
            technicalFeeRow.style.display = 'flex';
        } else {
            technicalFeeRow.style.display = 'none';
        }
    }

    // Non-technical event fee display (Free Fire only)
    if (additionalFeeElement) additionalFeeElement.textContent = `₹${nonTechnicalEventFee}`;
    if (additionalFeeRow) {
        if (nonTechnicalEventFee > 0) {
            additionalFeeRow.style.display = 'flex';
        } else {
            additionalFeeRow.style.display = 'none';
        }
    }

    if (totalFeeElement) totalFeeElement.textContent = `₹${totalFee}`;

    // Update registration data
    registrationData.technicalEventFee = technicalEventFee;
    registrationData.additionalEventFee = nonTechnicalEventFee;
    registrationData.totalFee = totalFee;
}

// Updated form validation (no mandatory events)
function validateRegistrationForm() {
    // Basic validation for member 1 details
    const member1Name = document.getElementById('member1_name');
    const member1Email = document.getElementById('member1_email');
    const member1Phone = document.getElementById('member1_phone');

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

    // Check if at least one event is selected
    const technicalEvent = document.getElementById('main_event');
    const nonTechnicalEvent = document.getElementById('additional_event');
    
    if ((!technicalEvent || !technicalEvent.value) && 
        (!nonTechnicalEvent || !nonTechnicalEvent.value)) {
        alert('Please select at least one event to participate in');
        return false;
    }

    return true;
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



function updatePaymentModal() {
    // Update payment modal with current fees
    const modalBaseFee = document.getElementById('modalBaseFee');
    const modalTechnicalFee = document.getElementById('modalTechnicalFee');
    const modalTechnicalFeeRow = document.getElementById('modalTechnicalFeeRow');
    const modalAdditionalFee = document.getElementById('modalAdditionalFee');
    const modalAdditionalFeeRow = document.getElementById('modalAdditionalFeeRow');
    const modalTotalFee = document.getElementById('modalTotalFee');

    if (modalBaseFee) modalBaseFee.textContent = `₹${registrationData.baseFee}`;
    
    // Show technical event fee if it exists
    if (modalTechnicalFee) modalTechnicalFee.textContent = `₹${registrationData.technicalEventFee}`;
    if (modalTechnicalFeeRow) {
        if (registrationData.technicalEventFee > 0) {
            modalTechnicalFeeRow.style.display = 'flex';
        } else {
            modalTechnicalFeeRow.style.display = 'none';
        }
    }
    
    // Show non-technical event fee if it exists
    if (modalAdditionalFee) modalAdditionalFee.textContent = `₹${registrationData.additionalEventFee}`;
    if (modalAdditionalFeeRow) {
        if (registrationData.additionalEventFee > 0) {
            modalAdditionalFeeRow.style.display = 'flex';
        } else {
            modalAdditionalFeeRow.style.display = 'none';
        }
    }

    if (modalTotalFee) modalTotalFee.textContent = `₹${registrationData.totalFee}`;
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
    // 1. COLLECT DATA FROM THE FORM (Crucial fix)
    const m1Name = document.getElementById('member1_name')?.value || "Participant";
    const m1Email = document.getElementById('member1_email')?.value || "";
    const techEvent = document.getElementById('main_event')?.value || "None";
    const addEvent = document.getElementById('additional_event')?.value || "None";

    // 2. Update the registration object so Firebase sees it
    registrationData.members[0] = { name: m1Name, email: m1Email };
    registrationData.mainEvent = techEvent;
    registrationData.additionalEvent = addEvent;

    // 3. Generate the ID
    const generatedId = "AUTO" + Math.floor(100000 + Math.random() * 900000);

    // 4. SAVE TO FIREBASE
    if (window.saveRegistrationToFirebase) {
        window.saveRegistrationToFirebase(generatedId, registrationData);
    }

    // 5. Update UI and Send Mail
    document.getElementById('registrationId').textContent = generatedId;
    sendAutomaticReceipt(generatedId);
    document.getElementById('successMessage').style.display = 'flex';
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
    window.openEventDetails = openEventDetails;
    window.closeEventDetails = closeEventDetails;
    window.registerForEvent = registerForEvent;
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
// ==================== EVENT DETAILS MODAL ====================
// Event data structure with form mapping
const eventData = {
    'paper-presentation': {
        title: 'Paper Presentation',
        formValue: 'Paper Presentation',
        eventType: 'technical',
        description: 'Present your innovative research ideas and technical solutions to a panel of expert judges. This event encourages participants to showcase their research work, innovative ideas, and technical knowledge through comprehensive presentations.',
        details: [
            'Team Size: 1-3 members',
            'Duration: 10 minutes presentation + 5 minutes Q&A',
            'Topics: Any technical domain (AI, IoT, Robotics, etc.)',
            'Registration Fee: ₹30',
            'Requirements: PowerPoint presentation, Research paper (optional)',
            'Judging Criteria: Innovation, Technical depth, Presentation skills',
            'Prizes: Winner gets ₹5000, Runner-up gets ₹3000'
        ],
        poster: 'event poster'
    },
    'line-follower': {
        title: 'Line Follower Robot',
        formValue: 'Line Follower Robot',
        eventType: 'technical',
        description: 'Build autonomous robots that can navigate predefined paths using sensors and programming. This challenging robotics event tests your engineering skills, programming knowledge, and robot design capabilities.',
        details: [
            'Team Size: 2-4 members',
            'Robot Specifications: Max dimensions 25cm x 25cm x 25cm',
            'Sensors: Any type (IR, Camera, Ultrasonic)',
            'Registration Fee: ₹50',
            'Track: Black line on white surface with turns and obstacles',
            'Time Limit: 3 minutes per run',
            'Scoring: Based on time taken and checkpoints crossed'
        ],
        poster: 'event poster'
    },
    'cad-designing': {
        title: 'CAD Designing',
        formValue: 'CAD Designing',
        eventType: 'technical',
        description: 'Create innovative 3D models and engineering designs using professional CAD software. Showcase your creativity, technical skills, and design thinking in this comprehensive design challenge.',
        details: [
            'Team Size: 1-2 members',
            'Software: AutoCAD, SolidWorks, Fusion 360, or similar',
            'Duration: 3 hours',
            'Registration Fee: ₹40',
            'Theme: Will be announced on the event day',
            'Deliverables: 3D model, 2D drawings, Presentation',
            'Judging: Innovation, Feasibility, Design aesthetics'
        ],
        poster: 'event poster'
    },
    'drag-race': {
        title: 'Drag Race',
        formValue: 'Drag Race',
        eventType: 'technical',
        description: 'Design and race high-speed remote-controlled vehicles in this adrenaline-pumping competition. Test your engineering skills and vehicle design capabilities.',
        details: [
            'Team Size: 2-4 members',
            'Vehicle Type: Remote-controlled cars',
            'Track Length: 50 meters straight track',
            'Registration Fee: ₹60',
            'Power Source: Battery-powered only',
            'Weight Limit: Maximum 2kg',
            'Judging: Based on speed and design innovation'
        ],
        poster: 'event poster'
    },
    'robo-soccer': {
        title: 'Robo Soccer',
        formValue: 'Robo Soccer',
        eventType: 'technical',
        description: 'Program robots to compete in an exciting soccer tournament. Design, build, and program autonomous robots that can play soccer, demonstrating advanced robotics, AI, and team coordination.',
        details: [
            'Team Size: 3-5 members',
            'Robot Count: 2 robots per team',
            'Field Size: 4m x 6m with FIFA-proportioned markings',
            'Registration Fee: ₹70',
            'Robot Specs: Max 30cm x 30cm x 30cm, Wireless control',
            'Match Duration: 2 halves of 10 minutes each',
            'Rules: Modified FIFA rules for robot soccer'
        ],
        poster: 'event poster'
    },
    'technical-quiz': {
        title: 'Technical Quiz',
        formValue: 'Technical Quiz',
        eventType: 'technical',
        description: 'Test your knowledge in various technical domains including programming, electronics, mathematics, and general engineering concepts.',
        details: [
            'Team Size: 1-3 members',
            'Rounds: 3 rounds (Preliminary, Semi-final, Final)',
            'Topics: Programming, Electronics, Mathematics, General Tech',
            'Registration Fee: ₹25',
            'Duration: 2 hours total',
            'Format: Multiple choice and descriptive questions',
            'Prizes: Winner gets ₹2000, Runner-up gets ₹1000'
        ],
        poster: 'event poster'
    },
    'ctf': {
        title: 'Capture The Flag (CTF)',
        formValue: 'CTF',
        eventType: 'technical',
        description: 'Cybersecurity challenges and puzzles designed to test your hacking skills, cryptography knowledge, and problem-solving abilities. Compete in various security domains including web security, forensics, and reverse engineering.',
        details: [
            'Team Size: 1-3 members',
            'Categories: Web, Crypto, Forensics, Reverse Engineering',
            'Duration: 6 hours',
            'Registration Fee: ₹45',
            'Platform: Online CTF platform',
            'Requirements: Laptop with Kali Linux (recommended)',
            'Scoring: Points for each solved challenge'
        ],
        poster: 'event poster'
    },
    'pit-stop-challenge': {
        title: 'Pit Stop Challenge',
        formValue: 'Pit Stop Challenge',
        eventType: 'technical',
        description: 'Fast-paced engineering challenges under time pressure. Teams will face multiple technical problems that need quick thinking and rapid execution.',
        details: [
            'Team Size: 3-4 members',
            'Challenges: 5 different engineering problems',
            'Time Limit: 15 minutes per challenge',
            'Registration Fee: ₹55',
            'Tools: Basic tools and materials provided',
            'Skills Tested: Problem-solving, Teamwork, Speed',
            'Scoring: Based on completion time and accuracy'
        ],
        poster: 'event poster'
    },
    'free-fire': {
        title: 'Free Fire Tournament',
        formValue: 'Free Fire',
        eventType: 'non-technical',
        description: 'Battle royale gaming tournament with exciting prizes. Team up with friends or compete solo in this high-energy esports competition featuring multiple rounds and elimination stages.',
        details: [
            'Team Size: 4 members (Squad mode)',
            'Platform: Mobile (Android/iOS)',
            'Tournament Format: Multiple rounds, Battle Royale',
            'Registration Fee: ₹30',
            'Requirements: Own mobile device, Stable internet',
            'Rules: No hacks, mods, or external assistance allowed',
            'Prizes: Winner gets ₹3000, Runner-up gets ₹2000'
        ],
        poster: 'event poster'
    },
    'meme-quiz': {
        title: 'Meme Quiz',
        formValue: 'Meme Quiz',
        eventType: 'non-technical',
        description: 'Test your pop culture and meme knowledge in this fun and entertaining quiz competition.',
        details: [
            'Team Size: 1-2 members',
            'Rounds: 3 rounds with increasing difficulty',
            'Topics: Internet memes, Pop culture, Viral trends',
            'Registration Fee: Free',
            'Duration: 1.5 hours',
            'Format: Visual quiz with meme identification',
            'Prizes: Winner gets ₹1000 + meme merchandise'
        ],
        poster: 'event poster'
    },
'just-a-min': {
    title: 'Just a Min',
    formValue: 'Just a Min',
    eventType: 'non-technical',
    description: 'Quick thinking and rapid-fire question rounds.',
    details: [
        'Team Size: 1-2 members',
        'Duration: 1 minute per round',
        'Registration Fee: Free',
        'Format: Rapid-fire questions'
    ],
    poster: 'event poster'
},
'7th-sense': {
    title: '7th Sense',
    formValue: '7th Sense',
    eventType: 'non-technical',
    description: 'Intuition and logic-based challenging puzzles.',
    details: [
        'Team Size: 1-3 members',
        'Duration: 2 hours',
        'Registration Fee: Free',
        'Skills: Logical thinking, Intuition'
    ],
    poster: 'event poster'
},
'paper-pyramid': {
    title: 'Paper Pyramid',
    formValue: 'Paper Pyramid',
    eventType: 'non-technical',
    description: 'Creative paper folding and construction challenge.',
    details: [
        'Team Size: 2-4 members',
        'Materials: Newspaper and tape only',
        'Registration Fee: Free',
        'Time Limit: 30 minutes'
    ],
    poster: 'event poster'
},
'anime-quiz': {
    title: 'Anime Quiz',
    formValue: 'Anime Quiz',
    eventType: 'non-technical',
    description: 'Ultimate test for anime enthusiasts.',
    details: [
        'Team Size: 1-2 members',
        'Registration Fee: Free',
        'Topics: Popular anime series'
    ],
    poster: 'event poster'
},
'silent-music': {
    title: 'Silent Music',
    formValue: 'Silent Music',
    eventType: 'non-technical',
    description: 'Music recognition and rhythm activities.',
    details: [
        'Team Size: 1-2 members',
        'Registration Fee: Free',
        'Format: Audio clips, Rhythm games'
    ],
    poster: 'event poster'
},
'five-legs': {
    title: 'Five Legs',
    formValue: 'Five Legs',
    eventType: 'non-technical',
    description: 'Team coordination challenges.',
    details: [
        'Team Size: Exactly 5 members',
        'Registration Fee: Free',
        'Skills: Teamwork, Communication'
    ],
    poster: 'event poster'
}
    // Add more events as needed...
};

let selectedEventForRegistration = null;


async function sendAutomaticReceipt(regId, data) {
    const templateParams = {
        to_name: data.members[0].name,
        to_email: data.members[0].email,
        reg_id: regId,
        // ADD THESE TWO LINES:
        main_event: data.mainEvent || "N/A",
        additional_event: data.additionalEvent || "None",
        total_fee: data.totalFee,
        // This generates the link to the digital pass
        pass_link: `https://atlantix2k26.netlify.app/pass.html?id=${regId}&name=${encodeURIComponent(data.members[0].name)}&event=${encodeURIComponent(data.mainEvent)}`
    };

    try {
        await emailjs.send(
            window.env.EMAILJS_SERVICE_ID,
            window.env.EMAILJS_TEMPLATE_ID,
            templateParams
        );
        console.log("✅ Email sent successfully with event details!");
    } catch (error) {
        console.error("❌ Email failed:", error);
    }
}

// Function to open event details modal
function openEventDetails(eventKey) {
    const modal = document.getElementById('eventDetailsModal');
    const event = eventData[eventKey];
    
    if (!event) return;
    
    // Store selected event for registration
    selectedEventForRegistration = eventKey;
    
    // Update modal content
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    
    // Update event details list
    const detailsList = document.getElementById('eventDetailsList');
    detailsList.innerHTML = '';
    
    event.details.forEach(detail => {
        const li = document.createElement('li');
        li.className = 'event-detail-item';
        
        // Split detail by first colon to separate label and value
        const colonIndex = detail.indexOf(':');
        if (colonIndex !== -1) {
            const label = detail.substring(0, colonIndex);
            const value = detail.substring(colonIndex + 1);
            li.innerHTML = `<span class="event-detail-label">${label}:</span>${value}`;
        } else {
            li.textContent = `• ${detail}`;
        }
        
        detailsList.appendChild(li);
    });
    
    // Update poster (you can replace this with actual image logic)
    const posterElement = document.getElementById('eventPoster');
    posterElement.textContent = event.poster;
    
    // Show modal
    modal.classList.remove('hidden');
}

// Function to close event details modal
function closeEventDetails() {
    const modal = document.getElementById('eventDetailsModal');
    modal.classList.add('hidden');
}

// Function to register for the selected event
function registerForEvent() {
    if (!selectedEventForRegistration) return;
    
    const event = eventData[selectedEventForRegistration];
    
    // Close the event details modal
    closeEventDetails();
    
    // Scroll to registration section
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Wait for scroll to complete, then pre-select the event
    setTimeout(() => {
        if (event.eventType === 'technical') {
            const technicalSelect = document.getElementById('main_event');
            if (technicalSelect) {
                technicalSelect.value = event.formValue;
                // Trigger change event to update fees
                const changeEvent = new Event('change');
                technicalSelect.dispatchEvent(changeEvent);
            }
        } else if (event.eventType === 'non-technical') {
            const nonTechnicalSelect = document.getElementById('additional_event');
            if (nonTechnicalSelect) {
                nonTechnicalSelect.value = event.formValue;
                // Trigger change event to update fees
                const changeEvent = new Event('change');
                nonTechnicalSelect.dispatchEvent(changeEvent);
            }
        }
        
        // Recalculate fees if the function exists
        if (typeof calculateFees === 'function') {
            calculateFees();
        }
    }, 500);
}


// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const eventModal = document.getElementById('eventDetailsModal');
    if (eventModal) {
        eventModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEventDetails();
            }
        });
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEventDetails();
    }
});

// Initialize the application
console.log('🚀 Atlantix 2026 - JavaScript loaded');
