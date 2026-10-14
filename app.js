// --- 1. MOCK DATA: SKILL REQUESTS ---
// In the final PBL project, this array will be generated dynamically by your PHP/MySQL backend.
const activeRequests = [

    {
        name: "Zarina Yesmin",
        department: "Data Science",
        offering: "Java OOP & Database Design",
        seeking: "Advanced PHP & JavaScript",
        peerId: "mock-id-zarina",
        avatar: "ZY"
    },
    {
        name: "Masira Khalil",
        department: "Computer Science",
        offering: "Advanced CSS & UI Design",
        seeking: "Java OOP Concepts",
        peerId: "mock-id-masira", 
        avatar: "MK"
    },
    {
        name: "Diya Bhattacharya",
        department: "Computer Science",
        offering: "PHP & MySQL Integration",
        seeking: "Data Structures",
        peerId: "mock-id-diya",
        avatar: "DB"
    },
    {
        name: "Baseerah Mansoor",
        department: "Computer Science",
        offering: "XML Data Exchange",
        seeking: "Machine Learning Basics",
        peerId: "mock-id-baseerah",
        avatar: "BM"
    }
];

// --- 2. RENDER THE MARKETPLACE UI ---
function renderRequests() {
    const grid = document.getElementById('request-grid');
    grid.innerHTML = '';

    activeRequests.forEach(req => {
        const card = document.createElement('div');
        card.className = 'request-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="user-info">
                    <h3>${req.name}</h3>
                    <p>${req.department}</p>
                </div>
                <div style="background: #e2e8f0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #64748b;">
                    ${req.avatar}
                </div>
            </div>
            <div class="skills-row">
                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Offering to teach:</div>
                <span class="skill-badge offering"><i class="fas fa-check-circle"></i> ${req.offering}</span>
                
                <div style="font-size: 12px; color: #64748b; margin-top: 10px; margin-bottom: 4px;">Seeking help with:</div>
                <span class="skill-badge seeking"><i class="fas fa-search"></i> ${req.seeking}</span>
            </div>
            <button class="connect-btn" onclick="prepareCall('${req.name}', '${req.peerId}')">
                <i class="fas fa-video"></i> Connect & Trade Skills
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- 3. UI NAVIGATION LOGIC ---
function switchView(viewId, navElement = null) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    if (navElement) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navElement.classList.add('active');
    } else {
        // Automatically highlight correct nav if switched programmatically
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-item')[1].classList.add('active'); 
    }
}

function prepareCall(name, peerId) {
    switchView('video-view');
    document.getElementById('video-title').textContent = `Connecting with ${name}...`;
    document.getElementById('manual-peer-id').value = peerId;
    
    // Auto-initiate if it's a real ID. (Mock IDs will fail gracefully).
    initiateCall(peerId);
}

// --- 4. WEBRTC VIDEO LOGIC ---
const peer = new Peer();
let localStream;
let currentCall;

// Initialize camera automatically on load
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        document.getElementById('local-video').srcObject = stream;
    })
    .catch(err => alert('Please allow camera access for the platform to work.'));

// Get and display our unique ID
peer.on('open', id => {
    document.getElementById('my-peer-id').textContent = id;
});

// Handle incoming calls
peer.on('call', call => {
    const accept = confirm("Incoming skill exchange request! Accept?");
    if (accept) {
        switchView('video-view');
        call.answer(localStream);
        setupRemoteVideo(call);
    }
});

// Outgoing call function
function initiateCall(targetPeerId) {
    if (!targetPeerId) return alert("Please enter a valid Peer ID.");
    if (targetPeerId.includes("mock-id")) {
        alert("This is a mock profile for UI demonstration. To test live video, open an Incognito window, copy its generated ID, and paste it here.");
        return;
    }
    
    const call = peer.call(targetPeerId, localStream);
    setupRemoteVideo(call);
}

// Handle the remote video stream
function setupRemoteVideo(call) {
    currentCall = call;
    document.getElementById('remote-label').innerHTML = `<i class="fas fa-link"></i> Connected successfully`;
    
    call.on('stream', remoteStream => {
        document.getElementById('remote-video').srcObject = remoteStream;
    });

    call.on('close', () => {
        endCallUI();
    });
}

function endCall() {
    if (currentCall) currentCall.close();
    endCallUI();
}

function endCallUI() {
    document.getElementById('remote-video').srcObject = null;
    document.getElementById('remote-label').innerHTML = `<i class="fas fa-user-graduate"></i> Waiting for peer...`;
    document.getElementById('video-title').textContent = "Video Exchange Room";
}

// Render the grid on startup
renderRequests();