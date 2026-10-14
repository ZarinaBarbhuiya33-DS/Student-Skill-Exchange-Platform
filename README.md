# Student-Skill-Exchange-Platform

# Student's Skill Exchange Platform 🎓

A decentralized, zero-cost peer-to-peer learning platform built exclusively for Woxsen University students. This project facilitates an academic barter economy where students can trade their specific technical proficiencies (e.g., Java OOP) for guidance in subjects they are struggling with (e.g., Data Science).

## 🚀 Key Features
* **Domain-Restricted Security:** Strict client-side and server-side validation ensuring only `@woxsen.edu.in` email addresses can register and access the platform.
* **Dynamic Matchmaking Dashboard:** A database-driven interface that actively filters and displays compatible peer requests based on offered and requested skills.
* **Real-Time WebRTC Video Room:** Embedded 1-on-1 video and audio communication directly in the browser using PeerJS. Students can seamlessly transition from the request board to a live tutoring session without external software like Zoom.
* **Secure Session Management:** Utilizes `bcrypt` cryptographic hashing for passwords and secure PHP session tokens to maintain user identity across the application.

## 🛠️ Technology Stack
* **Frontend:** HTML5, CSS3 (Grid/Flexbox), JavaScript (ES6)
* **Backend:** PHP (Authentication & Sessions), Java Servlets, JSP (Dynamic View Generation)
* **Database:** MySQL (Relational Schema in 3NF), JDBC API
* **Communication:** WebRTC, PeerJS (UDP Peer-to-Peer Multimedia Pipeline)
* **Data Structuring:** XML (Academic Skill Taxonomy)

## 👥 Development Team
This Web Technologies (25TU03MJCO) B.Tech project was collaboratively developed by:
* Zarina Yesmin Barbhuiya
* Masira Khalil
* Diya Bhattacharya
* Baseerah Mansoor

**Under the guidance of:** Dr. Steven Raj, Assistant Professor, School of Technology, Woxsen University.

## ⚙️ Local Setup & Execution
1. Import the `skill_exchange_db.sql` file into your local MySQL environment (via phpMyAdmin / XAMPP).
2. Deploy the application folder within the XAMPP `htdocs` directory to process PHP registration scripts.
3. Start the Apache Tomcat server to compile the Java Servlets and JSP pages.
4. Open a modern browser and navigate to the local host address. **Note:** Camera and microphone permissions must be granted to the browser to enable the WebRTC video exchange feature.
