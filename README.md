# 🚀 Robotron 2027 - Event Management System

Robotron 2027 is a full-stack event registration and management platform. It features a modern user interface, automated email ticketing with unique QR codes, and a real-time mobile-ready scanner for gate check-ins.



## ✨ Key Features

* **Multi-Member Registration:** Dynamic form handling for teams of up to 4 members with real-time fee calculation.
* **Real-time Database:** Integrated with **Firebase Firestore** for instant data synchronization and attendance tracking.
* **Automated Ticketing:** Uses **EmailJS** to send professional HTML receipts and digital passes immediately after registration.
* **Digital Pass System:** Generates a unique digital pass for every user containing a dynamic QR code for entry.
* **Gatekeeper Scanner:** A specialized web-based tool for volunteers to scan QR codes and mark attendance in real-time.
* **Secure Config:** Protected API credentials using a `config.js` environment wrapper and `.gitignore` to prevent credential leaks.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Properties/Variables), JavaScript (ES6+)
* **Backend as a Service:** Firebase (Firestore)
* **Communication:** EmailJS API
* **Tools:** QR Server API, Html5-Qrcode (Scanner), Render (Deployment)

## 📁 Project Structure

```text
├── index.html          # Main landing page & registration form
├── app.js              # Core logic, fee calculation & EmailJS integration
├── style.css           # Professional Teal & Dark themed styling
├── pass.html           # Digital pass generator page (QR Code display)
├── scanner.html        # Admin/Volunteer QR scanning tool
├── config.js           # (Local only) Private API keys - NOT tracked by Git
└── .gitignore          # Prevents config.js from being uploaded to GitHub
🚀 Setup & Deployment
1. Local Setup
Clone the repository: git clone https://github.com/yourusername/robotron-2027.git

Create a config.js file in the root directory.

Add your window.env object with your Firebase and EmailJS credentials.

Open index.html using a local server (like VS Code Live Server).

2. Firebase Rules
Ensure your Firestore rules permit reading and writing to the registrations collection for the scanner to function:

JavaScript

service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{registrationId} {
      allow read, write: if true;
    }
  }
}
3. Deployment (Render/Netlify)
This project is optimized for deployment as a Static Site.

Security: Since config.js is ignored by Git, you must add your keys (e.g., FIREBASE_API_KEY) as Environment Variables in your hosting provider's dashboard.

📱 Using the Scanner
The scanning tool is located at /scanner.html.

Open the URL on a mobile device at the event gate.

Grant camera permissions.

Scan a participant's QR code.

The system will verify the ID and instantly update the "Checked-In" status in Firebase.

🎨 Design System
Typography: Orbitron (Headings) & Rajdhani (Body).

Colors: Primary Teal (#218085) with professional Dark/Cream variants.

Responsive: Mobile-first approach, fully functional on all screen sizes.

📞 Support
Event Email: hello@Robotron2027.com

Support Email: support@Robotron2027.com

Lead Developer: [Your Name]

Built with ❤️ for the Robotron 2027 Event | Organized by Park College of Engineering and Technology.
