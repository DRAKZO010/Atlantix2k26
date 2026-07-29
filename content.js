// Robotron 2027 - Content Manager
// Handles loading/saving site content from Firestore

const SITE_CONTENT_DOC = "siteContent/main";

window.DEFAULT_CONTENT = {
    global: {
        title: "Robotron 2027",
        description: "Join Robotron 2027 - 24 hours of coding, innovation, and competition at Park College of Engineering and Technology, Coimbatore. Win prizes worth ₹50,000!",
        keywords: "hackathon, coding, programming, innovation, competition, Coimbatore, technology, Park College",
        brandName: "Robotron",
        brandYear: "2027"
    },
    hero: {
        title: "Robotron 2027",
        tagline: "Code. Create. Compete. Drive Innovation Forward",
        date: "January 15-16, 2026",
        location: "Park College of Engineering and Technology, Kaniyur, Coimbatore",
        duration: "24 Hours",
        primaryCta: "Register Now",
        secondaryCta: "Learn More"
    },
    about: {
        title: "About Robotron",
        cards: [
            { icon: "🚀", heading: "Innovation Hub", description: "Join the most exciting hackathon in South India where brilliant minds come together to solve real-world problems through technology and creativity." },
            { icon: "🏆", heading: "Compete & Win", description: "Compete for amazing prizes worth ₹50,000 while showcasing your technical skills in various categories from AI/ML to cybersecurity." },
            { icon: "🤝", heading: "Network & Learn", description: "Connect with industry experts, mentors, and like-minded developers. Participate in workshops, tech talks, and gain valuable insights." }
        ]
    },
    schedule: {
        title: "Event Schedule",
        days: [
            {
                heading: "Day 1 - January 15, 2026",
                events: [
                    { time: "09:00 AM", name: "Registration & Check-in", description: "Get your badges and welcome kit" },
                    { time: "10:00 AM", name: "Opening Ceremony", description: "Welcome address and event overview" },
                    { time: "11:00 AM", name: "Team Formation & Networking", description: "Find your perfect team members" },
                    { time: "12:00 PM", name: "Hacking Begins!", description: "Start building your innovative solutions" },
                    { time: "01:00 PM", name: "Lunch Break", description: "Fuel up for the coding marathon" },
                    { time: "03:00 PM", name: "Mentor Sessions", description: "Get guidance from industry experts" },
                    { time: "06:00 PM", name: "Dinner", description: "Evening refreshments and networking" },
                    { time: "08:00 PM", name: "Tech Talks", description: "Inspiring talks from tech leaders" },
                    { time: "10:00 PM", name: "Late Night Coding", description: "Midnight fuel and continuous coding" }
                ]
            },
            {
                heading: "Day 2 - January 16, 2026",
                events: [
                    { time: "08:00 AM", name: "Breakfast", description: "Morning refreshments" },
                    { time: "09:00 AM", name: "Final Sprint", description: "Last hours to polish your project" },
                    { time: "12:00 PM", name: "Submission Deadline", description: "Final project submission" },
                    { time: "01:00 PM", name: "Lunch & Demo Setup", description: "Prepare for presentations" },
                    { time: "02:00 PM", name: "Project Presentations", description: "Showcase your innovations" },
                    { time: "04:00 PM", name: "Judging & Deliberation", description: "Panel evaluation and scoring" },
                    { time: "05:00 PM", name: "Awards Ceremony", description: "Announcing winners and prizes" },
                    { time: "06:00 PM", name: "Closing & Networking", description: "Final networking and farewell" }
                ]
            }
        ]
    },
    events: {
        technical: [
            { key: "paper-presentation", title: "Paper Presentation", icon: "📊", shortDesc: "Present your innovative research ideas and technical solutions", formValue: "Paper Presentation", fee: 30, description: "Present your innovative research ideas and technical solutions to a panel of expert judges.", details: ["Team Size: 1-3 members", "Duration: 10 minutes presentation + 5 minutes Q&A", "Topics: Any technical domain", "Registration Fee: ₹30", "Judging Criteria: Innovation, Technical depth, Presentation skills"], poster: "" },
            { key: "line-follower", title: "Line Follower Robot", icon: "🤖", shortDesc: "Build autonomous robots that can navigate predefined paths", formValue: "Line Follower Robot", fee: 50, description: "Build autonomous robots that can navigate predefined paths using sensors and programming.", details: ["Team Size: 2-4 members", "Robot Specifications: Max 25cm x 25cm x 25cm", "Registration Fee: ₹50", "Track: Black line on white surface", "Time Limit: 3 minutes per run"], poster: "" },
            { key: "cad-designing", title: "CAD Designing", icon: "🎨", shortDesc: "Create innovative 3D models and engineering designs", formValue: "CAD Designing", fee: 40, description: "Create innovative 3D models and engineering designs using professional CAD software.", details: ["Team Size: 1-2 members", "Software: AutoCAD, SolidWorks, Fusion 360", "Duration: 3 hours", "Registration Fee: ₹40"], poster: "" },
            { key: "drag-race", title: "Drag Race", icon: "🏁", shortDesc: "Design and race high-speed remote-controlled vehicles", formValue: "Drag Race", fee: 60, description: "Design and race high-speed remote-controlled vehicles in this adrenaline-pumping competition.", details: ["Team Size: 2-4 members", "Track Length: 50 meters", "Registration Fee: ₹60", "Weight Limit: Maximum 2kg"], poster: "" },
            { key: "robo-soccer", title: "Robo Soccer", icon: "⚽", shortDesc: "Program robots to compete in an exciting soccer tournament", formValue: "Robo Soccer", fee: 70, description: "Program robots to compete in an exciting soccer tournament.", details: ["Team Size: 3-5 members", "Robot Count: 2 robots per team", "Registration Fee: ₹70", "Match Duration: 2 halves of 10 minutes"], poster: "" },
            { key: "technical-quiz", title: "Technical Quiz", icon: "🧠", shortDesc: "Test your knowledge in various technical domains", formValue: "Technical Quiz", fee: 25, description: "Test your knowledge in various technical domains.", details: ["Team Size: 1-3 members", "Rounds: 3 rounds", "Registration Fee: ₹25", "Duration: 2 hours total"], poster: "" },
            { key: "ctf", title: "Capture The Flag (CTF)", icon: "🚩", shortDesc: "Cybersecurity challenges and puzzles", formValue: "CTF", fee: 45, description: "Cybersecurity challenges and puzzles designed to test your hacking skills.", details: ["Team Size: 1-3 members", "Categories: Web, Crypto, Forensics", "Duration: 6 hours", "Registration Fee: ₹45"], poster: "" },
            { key: "pit-stop-challenge", title: "Pit Stop Challenge", icon: "⛳", shortDesc: "Fast-paced engineering challenges under time pressure", formValue: "Pit Stop Challenge", fee: 55, description: "Fast-paced engineering challenges under time pressure.", details: ["Team Size: 3-4 members", "Challenges: 5 different problems", "Time Limit: 15 minutes per challenge", "Registration Fee: ₹55"], poster: "" }
        ],
        nonTechnical: [
            { key: "free-fire", title: "Free Fire Tournament", icon: "🔥", shortDesc: "Battle royale gaming tournament with exciting prizes", formValue: "Free Fire", fee: 30, description: "Battle royale gaming tournament with exciting prizes.", details: ["Team Size: 4 members", "Platform: Mobile", "Registration Fee: ₹30"], poster: "" },
            { key: "meme-quiz", title: "Meme Quiz", icon: "❓", shortDesc: "Test your pop culture and meme knowledge", formValue: "Meme Quiz", fee: 0, description: "Test your pop culture and meme knowledge.", details: ["Team Size: 1-2 members", "Registration Fee: Free", "Duration: 1.5 hours"], poster: "" },
            { key: "just-a-min", title: "Just a Min", icon: "⏱️", shortDesc: "Quick thinking and rapid-fire question rounds", formValue: "Just a Min", fee: 0, description: "Quick thinking and rapid-fire question rounds.", details: ["Team Size: 1-2 members", "Registration Fee: Free"], poster: "" },
            { key: "7th-sense", title: "7th Sense", icon: "🎯", shortDesc: "Intuition and logic-based challenging puzzles", formValue: "7th Sense", fee: 0, description: "Intuition and logic-based challenging puzzles.", details: ["Team Size: 1-3 members", "Registration Fee: Free"], poster: "" },
            { key: "paper-pyramid", title: "Paper Pyramid", icon: "📄", shortDesc: "Creative paper folding and construction challenge", formValue: "Paper Pyramid", fee: 0, description: "Creative paper folding and construction challenge.", details: ["Team Size: 2-4 members", "Registration Fee: Free"], poster: "" },
            { key: "anime-quiz", title: "Anime Quiz", icon: "🎌", shortDesc: "Ultimate test for anime enthusiasts", formValue: "Anime Quiz", fee: 0, description: "Ultimate test for anime enthusiasts.", details: ["Team Size: 1-2 members", "Registration Fee: Free"], poster: "" },
            { key: "silent-music", title: "Silent Music", icon: "🎵", shortDesc: "Music recognition and rhythm activities", formValue: "Silent Music", fee: 0, description: "Music recognition and rhythm activities.", details: ["Team Size: 1-2 members", "Registration Fee: Free"], poster: "" },
            { key: "five-legs", title: "Five Legs", icon: "🔍", shortDesc: "Team coordination challenges", formValue: "Five Legs", fee: 0, description: "Team coordination challenges.", details: ["Team Size: Exactly 5 members", "Registration Fee: Free"], poster: "" }
        ]
    },
    prizes: {
        title: "Prizes & Awards",
        main: [
            { place: "1st Place", icon: "🥇", amount: "₹25,000", description: "Plus mentorship opportunities and startup incubation support" },
            { place: "2nd Place", icon: "🥈", amount: "₹15,000", description: "Plus access to exclusive tech workshops and networking events" },
            { place: "3rd Place", icon: "🥉", amount: "₹10,000", description: "Plus certificates and goodies from our sponsors" }
        ],
        special: [
            { icon: "💡", title: "Most Innovative Solution", prize: "₹5,000 + Trophy" },
            { icon: "👥", title: "Best Team Collaboration", prize: "₹3,000 + Certificates" },
            { icon: "🎨", title: "Best UI/UX Design", prize: "₹2,000 + Design Tools" }
        ]
    },
    contact: {
        title: "Contact Us",
        emails: ["hello@Robotron2027.com", "support@Robotron2027.com"],
        phones: ["+91 98765 43210", "+91 87654 32109"],
        address: "Park College of Engineering and Technology, Kaniyur, Coimbatore - 641659, Tamil Nadu, India",
        hours: ["January 15: 9:00 AM - 12:00 AM", "January 16: 8:00 AM - 6:00 PM"]
    },
    faq: [
        { question: "How many team members can participate?", answer: "Teams can have 1-4 members. You can register individually and find teammates during the team formation session, or come with a pre-formed team." },
        { question: "What should I bring to the hackathon?", answer: "Bring your laptop, charger, valid ID proof, and your creativity! We'll provide meals, snacks, and a great venue with WiFi and power outlets." },
        { question: "Is accommodation provided?", answer: "The event is 24 hours long, and you'll be coding through the night at the venue. We don't provide separate accommodation, but rest areas will be available." },
        { question: "Can I participate in multiple events?", answer: "Yes! You can participate in one main technical event and one additional non-technical event for an extra fee of ₹30." },
        { question: "What is the refund policy?", answer: "Registration fees are non-refundable. However, you can transfer your registration to another person by contacting us at least 48 hours before the event." }
    ],
    footer: {
        brand: "Robotron 2027",
        tagline: "Drive Innovation Forward",
        copyright: "© 2027 Robotron. All rights reserved. Organized by Park College of Engineering and Technology."
    },
    fees: {
        base: 50,
        technical: { "Paper Presentation": 30, "Line Follower Robot": 50, "CAD Designing": 40, "Drag Race": 60, "Robo Soccer": 70, "Technical Quiz": 25, "CTF": 45, "Pit Stop Challenge": 55 },
        nonTechnical: { "Free Fire": 30 }
    }
};

async function loadSiteContent() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js");
        const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js");

        const firebaseConfig = {
            apiKey: "AIzaSyCQKLM92UMnSb_ZLd7BZGgH6TNP9ugXffg",
            authDomain: "atlantix2k26.firebaseapp.com",
            projectId: "atlantix2k26",
            storageBucket: "atlantix2k26.firebasestorage.app",
            messagingSenderId: "988770007742",
            appId: "1:988770007742:web:742114c6f386a0422fbcef"
        };

        const app = initializeApp(firebaseConfig, "contentLoader");
        const db = getFirestore(app);
        const docRef = doc(db, SITE_CONTENT_DOC);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("✅ Site content loaded from Firestore");
            return { ...window.DEFAULT_CONTENT, ...docSnap.data() };
        } else {
            console.log("ℹ️ No custom content found, using defaults");
            return window.DEFAULT_CONTENT;
        }
    } catch (err) {
        console.warn("⚠️ Could not load content from Firestore, using defaults:", err);
        return window.DEFAULT_CONTENT;
    }
}

window.loadSiteContent = loadSiteContent;
