import confetti from 'canvas-confetti';



const defaultWorkoutPlan = {
    Monday: {
        name: "Chest, Tricep, Shoulder",
        exercises: [
            { name: "Decline Push Up", sets: 4, reps: 20, image: "decline_pushup.jpg", type: 'reps', caloriesPerRep: 0.5 },
            { name: "Normal Push Up", sets: 4, reps: 15, image: "normal_pushup.png", type: 'reps', caloriesPerRep: 0.4 },
            { name: "Diamond Push Up", sets: 4, reps: 15, image: "diamond_pushup.png", type: 'reps', caloriesPerRep: 0.6 },
            { name: "Incline Push Up", sets: 3, reps: 20, image: "incline_pushup.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Lateral Raises", sets: 4, reps: 15, image: "lateral_raises.png", type: 'reps', caloriesPerRep: 0.2 },
            { name: "Shoulder Press", sets: 3, reps: 15, image: "shoulder_press.png", type: 'reps', caloriesPerRep: 0.3 }
        ]
    },
    Tuesday: {
        name: "Back, Biceps",
        exercises: [
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps', caloriesPerRep: 1.0 },
            { name: "Bicep Curls", sets: 3, reps: 15, image: "bicep_curls.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps', caloriesPerRep: 1.0 },
            { name: "Dumbbell Rows", sets: 3, reps: '15 each', image: "dumbbell_rows.png", type: 'reps', caloriesPerRep: 0.5 },
            { name: "Chin Ups", sets: 3, reps: 10, image: "chin_ups.png", type: 'reps', caloriesPerRep: 0.9 },
            { name: "Barbell rows", sets: 3, reps: 15, image: "barbell_rows.png", type: 'reps', caloriesPerRep: 0.7 },
            { name: "Shrugs", sets: 3, reps: 30, image: "shrugs.png", type: 'reps', caloriesPerRep: 0.1 }
        ]
    },
    Wednesday: {
        name: "Legs, Abs",
        exercises: [
             { name: "Jumping Jack", sets: 3, duration: 60, image: "jumping_jack.png", type: 'time', caloriesPerSecond: 0.1 },
             { name: "Hanging Knee Raises", sets: 3, reps: 15, image: "hanging_knee_raises.png", type: 'reps', caloriesPerRep: 0.7 },
             { name: "Jumping Squats", sets: 3, reps: 25, image: "jumping_squats.png", type: 'reps', caloriesPerRep: 0.8 },
             { name: "Plank", sets: 3, duration: 60, image: "plank.png", type: 'time', caloriesPerSecond: 0.05 },
             { name: "Russian Twist", sets: 3, reps: 50, image: "russian_twist.png", type: 'reps', caloriesPerRep: 0.2 },
             { name: "Calf Raises", sets: 3, reps: 25, image: "calf_raises.png", type: 'reps', caloriesPerRep: 0.2 },
             { name: "Crunches", sets: 3, reps: 12, image: "crunches.png", type: 'reps', caloriesPerRep: 0.3 }
        ]
    },
    Thursday: { name: "Rest Day", exercises: [] },
    Friday: {
        name: "Arm, Shoulder",
        exercises: [
            { name: "Pronation", sets: 3, reps: 10, image: "pronation.png", type: 'reps', caloriesPerRep: 0.1 },
            { name: "Bicep curls", sets: 3, reps: 15, image: "bicep_curls.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Lateral Raises", sets: 4, reps: 15, image: "lateral_raises.png", type: 'reps', caloriesPerRep: 0.2 },
            { name: "Shoulder Press", sets: 3, reps: 15, image: "shoulder_press.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Hammer curl", sets: 3, reps: 30, image: "hammer_curl.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Wrist Curl", sets: 3, reps: 20, image: "wrist_curl.png", type: 'reps', caloriesPerRep: 0.1 }
        ]
    },
    Saturday: {
        name: "Chest, Back",
        exercises: [
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps', caloriesPerRep: 1.0 },
            { name: "Decline Push Up", sets: 4, reps: 20, image: "decline_pushup.png", type: 'reps', caloriesPerRep: 0.5 },
            { name: "Pull ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps', caloriesPerRep: 1.0 },
            { name: "Wide Push Up", sets: 4, reps: 15, image: "wide_pushup.png", type: 'reps', caloriesPerRep: 0.4 },
            { name: "Incline Push Up", sets: 3, reps: 20, image: "incline_pushup.png", type: 'reps', caloriesPerRep: 0.3 },
            { name: "Dumbbell Rows", sets: 3, reps: '15 each', image: "dumbbell_rows.png", type: 'reps', caloriesPerRep: 0.5 },
            { name: "Barbell Rows", sets: 3, reps: 15, image: "barbell_rows.png", type: 'reps', caloriesPerRep: 0.7 }
        ]
    },
    Sunday: { name: "Rest Day", exercises: [] }
};

let userWorkoutPlan;
let workoutLog = {}; // Stores workout data by date
let currentProfileYear = new Date().getFullYear();

const planContainer = document.getElementById('plan');
const workoutDisplayContainer = document.getElementById('workout-display');
const currentDayDisplay = document.getElementById('current-day');
const currentExerciseDiv = document.getElementById('current-exercise');
const exerciseNameDisplay = document.getElementById('exercise-name');
const exerciseDetailsDisplay = document.getElementById('exercise-details');
const exerciseImage = document.getElementById('exercise-image');
const timerDisplay = document.getElementById('timer-display');
const startWorkoutButton = document.getElementById('start-workout');
const nextExerciseButton = document.getElementById('next-exercise');
const skipRestButton = document.getElementById('skip-rest');
const skipTimerButton = document.getElementById('skip-timer');
const playPauseBgmButton = document.getElementById('play-pause-bgm');
const prevBgmButton = document.getElementById('prev-bgm');
const nextBgmButton = document.getElementById('next-bgm');
const uploadBgmInput = document.getElementById('upload-bgm');
const musicSelectElement = document.getElementById('music-select');
const backToPlanButton = document.getElementById('back-to-plan');
const themeSelectElement = document.getElementById('theme-select');
const editPlanButton = document.getElementById('edit-plan-button');
const viewProfileButton = document.getElementById('view-profile-button');
const profileView = document.getElementById('profile-view');
const totalWorkoutsDisplay = document.getElementById('total-workouts');
const totalExercisesCompletedDisplay = document.getElementById('total-exercises-completed');
const totalCaloriesDisplay = document.getElementById('total-calories');
const currentYearDisplay = document.getElementById('current-year');
const progressTrackerGrid = document.getElementById('progress-tracker-grid');
const prevYearButton = document.getElementById('prev-year');
const nextYearButton = document.getElementById('next-year');
const modeToggleButton = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const clearLogButton = document.getElementById('clear-log-button');


// Modal elements
const editDayModal = document.getElementById('edit-day-modal');
const modalDayTitle = document.getElementById('modal-day-title');
const modalDayDescriptionInput = document.getElementById('modal-day-description');
const modalExercisesContainer = document.getElementById('modal-exercises-container');
const addExerciseToModalButton = document.getElementById('add-exercise-to-modal');
const saveDayChangesButton = document.getElementById('save-day-changes');
const cancelDayEditButton = document.getElementById('cancel-day-edit');
const closeModalButton = document.getElementById('close-edit-modal-button');
const editingDayKeyInput = document.getElementById('editing-day-key');

// AI Chatbot elements
const aiChatToggle = document.getElementById('ai-chat-toggle');
const aiChatbotModal = document.getElementById('ai-chatbot-modal');
const closeAiModalButton = document.getElementById('close-ai-modal-button');
const chatHistoryDiv = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat-btn');
const speakChatButton = document.getElementById('speak-chat-btn');

let conversationHistory = [];
let speaking = false;


let audioContext;
let bgmSource;
let bgmGainNode; // Added gain node for BGM volume control
let bgmPlaylist = [];
let currentTrackIndex = -1;
let isBgmPlaying = false;
let timerInterval;
let currentWorkoutDayKey = null;
let currentExerciseIndex = 0;
let currentSet = 1;
let isResting = false;
let restTime = 60;
let timeRemaining;
let workoutSoundBuffer;
let restSoundBuffer;
let profileSoundBuffer;
let lightModeSoundBuffer; // New sound for light mode toggle
let darkModeSoundBuffer; // New sound for dark mode toggle
let isEditingPlan = false;
let workoutCaloriesBurned = 0; // Track calories for the current workout session
let workoutExercisesCompleted = []; // Track completed exercises for the current workout session
let isLightMode = false; // Track light/dark mode state
let currentSpeechAudio = null; // To hold the Audio object for speech

// Pre-loaded BGMs
const preloadedBgms = [
    { name: "High Energy Phonk", path: 'workout_bgm_2.mp3', buffer: null },
    { name: "Futuristic Workout", path: 'bloody_mary_edit.mp3', buffer: null },
    { name: "Motivational Electro", path: 'background_music.mp3', buffer: null },
    { name: "MONTAGEM TOMADA", path: 'MONTAGEM TOMADA SLOWED.mp3', buffer: null },
    { name: "Passo Bem Solto", path: 'PASSO BEM SOLTO (Slowed).mp3', buffer: null },
    { name: "LE SSERAFIM (르세라핌) HOT", path: 'LE SSERAFIM (르세라핌) HOT.mpm', buffer: null },
    { name: "Henry Young - One More Last Time (feat. Ashley Alisha)", path: 'Henry Young - One More Last Time (feat. Ashley Alisha).mp3', buffer: null },
    { name: "LUNA BALA (SLOWED)", path: 'Yb Wasgood, Ariis - LUNA BALA (SLOWED).mp3', buffer: null },
    { name: "Los Voltaje", path: 'LOS VOLTAJE.mp3', buffer: null },
    { name: "5x30", path: '5x30.mp3', buffer: null },
    { name: "Amor Na Praia (Slowed)", path: 'Amor Na Praia (Slowed).mp3', buffer: null }
];

let uploadedBgms = [];


function initWorkoutPlan() {
    const storedPlan = localStorage.getItem('userWorkoutPlan');
    if (storedPlan) {
        try {
            userWorkoutPlan = JSON.parse(storedPlan);
            if (!userWorkoutPlan || Object.keys(userWorkoutPlan).length === 0 || !userWorkoutPlan.Monday || !userWorkoutPlan.Monday.exercises) {
                 throw new Error("Stored plan is not valid");
            }
        } catch (e) {
            console.error("Failed to parse or validate stored workout plan, using default:", e);
            userWorkoutPlan = JSON.parse(JSON.stringify(defaultWorkoutPlan));
            saveUserPlan();
        }
    } else {
        userWorkoutPlan = JSON.parse(JSON.stringify(defaultWorkoutPlan));
        saveUserPlan();
    }
}

function saveUserPlan() {
    if (userWorkoutPlan) {
        localStorage.setItem('userWorkoutPlan', JSON.stringify(userWorkoutPlan));
    }
}

function initWorkoutLog() {
    const storedLog = localStorage.getItem('workoutLog');
    if (storedLog) {
        try {
            workoutLog = JSON.parse(storedLog);
        } catch (e) {
            console.error("Failed to parse stored workout log, starting fresh:", e);
            workoutLog = {};
        }
    }
}

function saveWorkoutLog() {
    localStorage.setItem('workoutLog', JSON.stringify(workoutLog));
}

async function setupAudio() {
    if (audioContext && audioContext.state !== 'closed') {
        return;
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    bgmGainNode = audioContext.createGain(); // Initialize gain node
    bgmGainNode.connect(audioContext.destination);
    // Set initial BGM volume (e.g., 0.5 for half volume)
    bgmGainNode.gain.value = 0.5; 

    // Do not resume context automatically here. Resume on first user interaction with audio controls.
    document.body.addEventListener('click', () => {
         if (audioContext && audioContext.state === 'suspended') {
             audioContext.resume();
         }
    }, { once: true }); 
    await loadSounds();
}

async function loadSound(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            console.warn(`Preloaded sound file not found or network error: ${filePath} - status: ${response.status}`);
            return null;
        }
        const arrayBuffer = await response.arrayBuffer();
        if (audioContext && audioContext.state !== 'closed') {
             return await audioContext.decodeAudioData(arrayBuffer);
        } else {
             console.warn("AudioContext not available or closed during decodeAudioData");
             return null;
        }
    } catch (error) {
        console.error(`Error loading or decoding sound ${filePath}:`, error);
        return null;
    }
}

async function loadBufferFromUpload(file) {
    try {
        const fileReader = new FileReader();
        const promise = new Promise((resolve, reject) => {
            fileReader.onload = async (event) => {
                try {
                    const arrayBuffer = event.target.result;
                    // Do not resume context here - it will be resumed when play is clicked
                     if (audioContext && audioContext.state !== 'closed') {
                        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                        resolve(audioBuffer);
                     } else {
                        reject("AudioContext not available or closed for upload decoding.");
                     }
                } catch (e) {
                    reject(e);
                }
            };
            fileReader.onerror = (e) => reject(e);
        });
        fileReader.readAsArrayBuffer(file);
        return promise;
    } catch (error) {
        console.error("Error reading or decoding uploaded file:", error);
        return null;
    }
}

async function loadSounds() {
    try {
        const loadedPreloaded = await Promise.all(preloadedBgms.map(async bgm => {
             const buffer = await loadSound(bgm.path);
             if (buffer) {
                return { ...bgm, buffer };
             }
             return null;
        }));
        const validPreloadedBgms = loadedPreloaded.filter(bgm => bgm !== null);
        // Load uploaded BGMs from localStorage if any
        const storedUploaded = localStorage.getItem('uploadedBgms');
        if (storedUploaded) {
            try {
                uploadedBgms = JSON.parse(storedUploaded);
                // Note: Buffers for uploaded songs are NOT stored in localStorage.
                // They must be re-uploaded by the user or re-loaded from saved paths
                // if saved paths pointed to something persistent (which they don't here).
                // For this implementation, uploaded songs are only available during the session.
                // Filter out previous entries, user needs to re-upload for new session.
                uploadedBgms = []; 
            } catch (e) {
                console.error("Failed to parse stored uploaded BGMs:", e);
                uploadedBgms = [];
            }
        }
        bgmPlaylist = [...validPreloadedBgms, ...uploadedBgms];
        workoutSoundBuffer = await loadSound('workout_start.mp3');
        restSoundBuffer = await loadSound('rest_start.mp3');
        profileSoundBuffer = await loadSound('workout_start.mp3'); // Assuming workout_start.mp3 is fine for profile click
        lightModeSoundBuffer = await loadSound('workout_start.mp3'); // Assign light mode sound
        darkModeSoundBuffer = await loadSound('rest_start.mp3'); // Assign dark mode sound

        let initialTrackIndex = -1;
        const lastTrackName = localStorage.getItem('lastSelectedBGM');
        if (lastTrackName) {
             initialTrackIndex = bgmPlaylist.findIndex(bgm => bgm.name === lastTrackName);
        }
        if (initialTrackIndex === -1 && bgmPlaylist.length > 0) {
             initialTrackIndex = 0;
        }
        currentTrackIndex = initialTrackIndex;
        populateMusicSelector();
        
        isBgmPlaying = false;
        playPauseBgmButton.textContent = '▶'; 
        if (bgmPlaylist.length === 0 || currentTrackIndex === -1 || !bgmPlaylist[currentTrackIndex].buffer) {
             musicSelectElement.disabled = true;
             playPauseBgmButton.disabled = true;
             prevBgmButton.disabled = true;
             nextBgmButton.disabled = true;
        } else {
            musicSelectElement.disabled = false;
            playPauseBgmButton.disabled = false;
            prevBgmButton.disabled = false;
            nextBgmButton.disabled = false;
        }
    } catch (error) {
        console.error("Error during initial sound loading and setup:", error);
         musicSelectElement.disabled = true;
         playPauseBgmButton.disabled = true;
         prevBgmButton.disabled = true;
         nextBgmButton.disabled = true;
         playPauseBgmButton.textContent = '▶';
    }
}

function populateMusicSelector() {
    musicSelectElement.innerHTML = '';
    if (bgmPlaylist.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No music available';
        musicSelectElement.appendChild(option);
        musicSelectElement.disabled = true;
        playPauseBgmButton.disabled = true;
        prevBgmButton.disabled = true;
        nextBgmButton.disabled = true;
        return;
    }
    musicSelectElement.disabled = false;
    playPauseBgmButton.disabled = false;
    prevBgmButton.disabled = false;
    nextBgmButton.disabled = false;
    bgmPlaylist.forEach(bgm => {
        const option = document.createElement('option');
        option.value = bgm.name;
        option.textContent = bgm.name;
        musicSelectElement.appendChild(option);
    });
    if (currentTrackIndex !== -1 && bgmPlaylist[currentTrackIndex]) {
        musicSelectElement.value = bgmPlaylist[currentTrackIndex].name;
    }
}

musicSelectElement.addEventListener('change', async (event) => {
    await setupAudio();
    const selectedName = event.target.value;
    const newIndex = bgmPlaylist.findIndex(bgm => bgm.name === selectedName);
    if (newIndex !== -1 && newIndex !== currentTrackIndex) {
        currentTrackIndex = newIndex;
        localStorage.setItem('lastSelectedBGM', bgmPlaylist[currentTrackIndex].name);
        if (isBgmPlaying) { 
            playBGM(true);
        } else {
            pauseBGM(); 
        }
    }
});

uploadBgmInput.addEventListener('change', async (event) => {
    await setupAudio();
    const file = event.target.files[0];
    if (file && audioContext) {
        if (!file.type.startsWith('audio/')) {
             alert("Please upload an audio file (MP3).");
             event.target.value = '';
             return;
        }
        try {
             const buffer = await loadBufferFromUpload(file);
             if (buffer) {
                 const newTrack = { name: file.name, buffer: buffer, path: null };
                 uploadedBgms.push(newTrack);
                 bgmPlaylist.push(newTrack);
                 populateMusicSelector();
                 musicSelectElement.value = newTrack.name;
                 currentTrackIndex = bgmPlaylist.length - 1;
                 localStorage.setItem('lastSelectedBGM', newTrack.name);
                 if (isBgmPlaying) {
                    playBGM(true);
                 } else {
                    pauseBGM();
                 }
             } else {
                 alert("Could not load or decode audio file. Please ensure it's a valid MP3.");
             }
        } catch (e) {
             console.error("Error loading uploaded file:", e);
             alert("Could not load or decode audio file. Please ensure it's a valid MP3.");
        }
    } else if (!audioContext) {
        alert("Audio context not ready. Please try again after interacting with the page.");
    }
    event.target.value = '';
});

function playBGM(restart = false) {
    if (audioContext && audioContext.state === 'suspended') {
         audioContext.resume().then(() => {
             playBGM(restart);
         }).catch(e => console.error("Failed to resume AudioContext:", e));
         return; 
    }
    
    if (bgmSource) {
        bgmSource.stop();
        bgmSource.disconnect();
        bgmSource = null;
    }
    
    if (currentTrackIndex === -1 || !bgmPlaylist[currentTrackIndex] || !bgmPlaylist[currentTrackIndex].buffer) {
        console.warn("No valid BGM selected or buffer not loaded. Cannot play.");
        isBgmPlaying = false;
        playPauseBgmButton.textContent = '▶';
        if(bgmPlaylist.length === 0 || currentTrackIndex === -1) {
             musicSelectElement.disabled = true;
             playPauseBgmButton.disabled = true;
             prevBgmButton.disabled = true;
             nextBgmButton.disabled = true;
        }
        localStorage.removeItem('lastSelectedBGM');
        return;
    }
    
    try {
        const buffer = bgmPlaylist[currentTrackIndex].buffer;
        bgmSource = audioContext.createBufferSource();
        bgmSource.buffer = buffer;
        bgmSource.loop = true;
        bgmSource.connect(bgmGainNode); // Connect to gain node
        bgmSource.start(0);
        isBgmPlaying = true;
        playPauseBgmButton.textContent = '❚❚';
        localStorage.setItem('lastSelectedBGM', bgmPlaylist[currentTrackIndex].name);
        console.log("Playing BGM:", bgmPlaylist[currentTrackIndex].name);
    } catch (error) {
         console.error("Error starting BGM source:", error);
         isBgmPlaying = false;
         playPauseBgmButton.textContent = '▶';
         bgmSource = null;
         if (bgmPlaylist.length > 1) {
             console.log("Trying next track after playback error.");
             playNextBGM();
         } else {
            console.log("No other tracks to try.");
            musicSelectElement.disabled = true;
            playPauseBgmButton.disabled = true;
            prevBgmButton.disabled = true;
            nextBgmButton.disabled = true;
            localStorage.removeItem('lastSelectedBGM');
         }
    }
}

function pauseBGM() {
    if (bgmSource) {
        bgmSource.stop();
        bgmSource.disconnect();
        bgmSource = null;
    }
    isBgmPlaying = false;
    playPauseBgmButton.textContent = '▶';
    console.log("BGM paused.");
}

function playPauseBGM() {
     setupAudio().then(() => { 
         if (isBgmPlaying) {
             pauseBGM();
         } else {
             playBGM(); 
         }
    });
}

function playNextBGM() {
     setupAudio().then(() => {
         if (bgmPlaylist.length <= 1) {
             console.log("Not enough tracks to play next.");
             return;
         }
         currentTrackIndex = (currentTrackIndex + 1) % bgmPlaylist.length;
         musicSelectElement.value = bgmPlaylist[currentTrackIndex].name;
         if (isBgmPlaying) {
            playBGM(true);
         } else {
            pauseBGM(); 
            // No need to call playBGM, just update selection
         }
         console.log("Skipping to next track:", bgmPlaylist[currentTrackIndex].name);
     });
}

function playPreviousBGM() {
     setupAudio().then(() => {
         if (bgmPlaylist.length <= 1) {
              console.log("Not enough tracks to play previous.");
              return;
         }
         currentTrackIndex = (currentTrackIndex - 1 + bgmPlaylist.length) % bgmPlaylist.length;
         musicSelectElement.value = bgmPlaylist[currentTrackIndex].name;
         if (isBgmPlaying) {
            playBGM(true);
         } else {
            pauseBGM(); 
            // No need to call playBGM, just update selection
         }
         console.log("Skipping to previous track:", bgmPlaylist[currentTrackIndex].name);
     });
}

playPauseBgmButton.addEventListener('click', playPauseBGM);
nextBgmButton.addEventListener('click', playNextBGM);
prevBgmButton.addEventListener('click', playPreviousBGM);

function playSound(buffer) {
    if (!audioContext || audioContext.state === 'closed' || !buffer) {
        console.warn("Audio context not ready or buffer missing for sound effect.");
        return;
    }
    // Sound effects should try to resume context if needed
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        }).catch(e => console.error("Error resuming audio context for sound:", e));
    } else {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
}

function applyTheme(themeName) {
    document.body.className = ''; // Clear existing theme classes
    if (isLightMode) { // If light mode is active, re-apply it
        document.body.classList.add('light-mode');
    }
    if (themeName && themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }
    localStorage.setItem('workoutAppTheme', themeName);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('workoutAppTheme');
    if (savedTheme) {
        if (themeSelectElement) themeSelectElement.value = savedTheme;
        applyTheme(savedTheme);
    } else {
        if (themeSelectElement) {
            themeSelectElement.value = 'green'; // Set default theme to green lush
            applyTheme('green');
        }
    }
}

if (themeSelectElement) {
    themeSelectElement.addEventListener('change', (event) => {
        applyTheme(event.target.value);
    });
}

function toggleLightDarkMode() {
    isLightMode = !isLightMode;
    if (isLightMode) {
        document.body.classList.add('light-mode');
        modeIcon.textContent = '☀️'; // Sun icon for light mode
        localStorage.setItem('colorMode', 'light');
        playSound(lightModeSoundBuffer); // Play sound for light mode
    } else {
        document.body.classList.remove('light-mode');
        modeIcon.textContent = '🌙'; // Moon icon for dark mode
        localStorage.setItem('colorMode', 'dark');
        playSound(darkModeSoundBuffer); // Play sound for dark mode
    }
    // Re-apply the current theme to ensure theme-specific light/dark styles are updated
    applyTheme(themeSelectElement.value);
}

function loadColorMode() {
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode === 'light') {
        isLightMode = true;
        document.body.classList.add('light-mode');
        modeIcon.textContent = '☀️';
    } else {
        isLightMode = false;
        document.body.classList.remove('light-mode');
        modeIcon.textContent = '🌙';
    }
}
modeToggleButton.addEventListener('click', () => {
    setupAudio().then(() => {
        toggleLightDarkMode();
    });
});


function setView(viewName) {
    planContainer.style.display = 'none';
    workoutDisplayContainer.style.display = 'none';
    profileView.style.display = 'none';
    currentExerciseDiv.style.display = 'none';
    document.body.classList.remove('plan-view', 'workout-view', 'profile-view');

    // Reset workout view elements
    currentDayDisplay.textContent = "Select a day to start";
    timerDisplay.textContent = "00:00";
    startWorkoutButton.style.display = 'none';
    nextExerciseButton.style.display = 'none';
    skipRestButton.style.display = 'none';
    skipTimerButton.style.display = 'none';
    exerciseImage.classList.remove('visible');
    exerciseImage.src = '';
    exerciseImage.style.display = 'none';
    exerciseNameDisplay.textContent = "";
    exerciseDetailsDisplay.textContent = "";

    // General control button visibility
    backToPlanButton.style.display = 'none';
    editPlanButton.style.display = 'inline-block';
    viewProfileButton.style.display = 'inline-block';


    if (viewName === 'plan') {
        document.body.classList.add('plan-view');
        planContainer.style.display = 'grid';
        workoutDisplayContainer.style.display = 'block'; // Ensure workout-display wrapper is visible
        currentExerciseDiv.style.display = 'none'; // But exercise details are hidden
        if (isEditingPlan) {
            editPlanButton.textContent = 'Finish Editing';
            editPlanButton.classList.add('active-editing');
        } else {
            editPlanButton.textContent = 'Edit My Plan';
            editPlanButton.classList.remove('active-editing');
        }
    } else if (viewName === 'workout') {
        document.body.classList.add('workout-view');
        planContainer.style.display = 'none';
        workoutDisplayContainer.style.display = 'block';
        currentExerciseDiv.style.display = 'block';
        backToPlanButton.style.display = 'inline-block';
        editPlanButton.style.display = 'none';
        viewProfileButton.style.display = 'inline-block';
    } else if (viewName === 'profile') {
        document.body.classList.add('profile-view');
        profileView.style.display = 'block';
        backToPlanButton.style.display = 'inline-block'; // Allow going back from profile to plan
        editPlanButton.style.display = 'none';
        viewProfileButton.style.display = 'none';
        renderProfile();
    }
}

function selectDay(dayKey) {
    if (!userWorkoutPlan[dayKey] || !userWorkoutPlan[dayKey].exercises || userWorkoutPlan[dayKey].exercises.length === 0) {
        alert("It's a rest day or no exercises defined! You can edit the plan to add some.");
        return;
    }
    currentWorkoutDayKey = dayKey;
    currentExerciseIndex = 0;
    currentSet = 1;
    isResting = false;
    workoutCaloriesBurned = 0; // Reset calories for new workout
    workoutExercisesCompleted = []; // Reset completed exercises for new workout
    setView('workout');
    currentDayDisplay.textContent = `${dayKey} - ${userWorkoutPlan[dayKey].name}`;
    displayExercise();
    timerDisplay.textContent = '00:00';
    clearInterval(timerInterval);
}

function displayExercise() {
    setView('workout');
    const exercises = userWorkoutPlan[currentWorkoutDayKey].exercises;
    if (currentExerciseIndex >= exercises.length) {
        workoutComplete();
        return;
    }
    currentExerciseDiv.style.display = 'block';
    const exercise = exercises[currentExerciseIndex];
    exerciseNameDisplay.textContent = exercise.name;
    let details = `Set ${currentSet} of ${exercise.sets}`;
    if (exercise.type === 'reps') {
        details += ` - ${exercise.reps} reps`;
    } else {
        details += ` - ${exercise.duration} seconds`;
    }
    exerciseDetailsDisplay.textContent = details;
    if (exercise.image && exercise.image.trim() !== '') {
        exerciseImage.src = exercise.image;
        exerciseImage.alt = exercise.name;
        exerciseImage.classList.add('visible');
        exerciseImage.style.display = 'block';
    } else {
        exerciseImage.src = '';
        exerciseImage.alt = '';
        exerciseImage.classList.remove('visible');
        exerciseImage.style.display = 'none';
    }
    timerDisplay.textContent = exercise.type === 'time' ? formatTime(exercise.duration) : 'Ready';
    startWorkoutButton.textContent = exercise.type === 'time' ? 'Start Timer' : 'Start Set';
    startWorkoutButton.style.display = 'inline-block';
    startWorkoutButton.disabled = false;
    nextExerciseButton.style.display = 'none';
    skipRestButton.style.display = 'none';
    skipTimerButton.style.display = 'none';
}

function startTimer(duration) {
    clearInterval(timerInterval);
    timeRemaining = duration;
    timerDisplay.textContent = formatTime(timeRemaining);
    const exercise = userWorkoutPlan[currentWorkoutDayKey].exercises[currentExerciseIndex];
    if (isResting) {
        skipRestButton.style.display = 'inline-block';
        skipRestButton.disabled = false;
        skipTimerButton.style.display = 'none';
    } else {
        skipTimerButton.style.display = 'inline-block';
        skipTimerButton.disabled = false;
        skipRestButton.style.display = 'none';
    }
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = formatTime(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Done!";
            playSound(isResting ? restSoundBuffer : workoutSoundBuffer);
            if (isRestButton) {
                isResting = false;
                skipRestButton.style.display = 'none';
                displayExercise();
            } else {
                // Calculate calories burned for timed exercises
                if (exercise.type === 'time' && exercise.caloriesPerSecond) {
                    workoutCaloriesBurned += (duration - timeRemaining) * exercise.caloriesPerSecond;
                }
                // Log individual exercise completion
                workoutExercisesCompleted.push(exercise.name);

                skipTimerButton.style.display = 'none';
                handleSetCompletion();
            }
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function handleSetCompletion() {
    const exercises = userWorkoutPlan[currentWorkoutDayKey].exercises;
    const exercise = exercises[currentExerciseIndex];
    exerciseImage.classList.remove('visible');
    exerciseImage.style.display = 'none';
    
    // Calculate calories burned for reps-based exercises
    if (exercise.type === 'reps' && exercise.caloriesPerRep) {
        const repsValue = parseInt(String(exercise.reps).replace(' each', ''));
        if (!isNaN(repsValue)) {
            workoutCaloriesBurned += repsValue * exercise.caloriesPerRep;
        }
    }
    // Log individual exercise completion for reps-based exercises
    if (exercise.type === 'reps') {
        workoutExercisesCompleted.push(exercise.name);
    }


    if (currentSet < exercise.sets) {
        currentSet++;
        isResting = true;
        exerciseNameDisplay.textContent = "Rest";
        exerciseDetailsDisplay.textContent = `Get ready for Set ${currentSet} of ${exercise.name}`;
        timerDisplay.textContent = formatTime(restTime);
        startWorkoutButton.textContent = 'Start Rest Timer';
        startWorkoutButton.style.display = 'inline-block';
        startWorkoutButton.disabled = false;
        nextExerciseButton.style.display = 'none';
        skipRestButton.style.display = 'inline-block';
        skipRestButton.disabled = true; 
        skipTimerButton.style.display = 'none';
        playSound(restSoundBuffer); 
    } else {
        currentExerciseIndex++;
        currentSet = 1;
        isResting = false;
        skipRestButton.style.display = 'none';
        skipTimerButton.style.display = 'none';
        if (currentExerciseIndex < exercises.length) {
            displayExercise();
        } else {
            workoutComplete();
        }
    }
}

function workoutComplete() {
    setView('workout');
    currentDayDisplay.textContent = "Workout Complete!";
    exerciseNameDisplay.textContent = "Congratulations!";
    exerciseDetailsDisplay.textContent = "";
    exerciseImage.classList.remove('visible');
    exerciseImage.style.display = 'none';
    timerDisplay.textContent = "🎉";
    startWorkoutButton.style.display = 'none';
    nextExerciseButton.style.display = 'none';
    skipRestButton.style.display = 'none';
    skipTimerButton.style.display = 'none';
    clearInterval(timerInterval);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

    // Log workout completion
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    if (!workoutLog[dateString]) {
        workoutLog[dateString] = {
            completedWorkouts: 0,
            caloriesBurned: 0,
            exercises: {} // Store exercise counts by name
        };
    }
    workoutLog[dateString].completedWorkouts++;
    workoutLog[dateString].caloriesBurned += Math.round(workoutCaloriesBurned); // Round calories

    // Aggregate completed exercises
    workoutExercisesCompleted.forEach(exerciseName => {
        workoutLog[dateString].exercises[exerciseName] = (workoutLog[dateString].exercises[exerciseName] || 0) + 1;
    });

    saveWorkoutLog();
}

startWorkoutButton.addEventListener('click', () => {
     if (audioContext && audioContext.state === 'suspended') {
         audioContext.resume();
     }
    if (!currentWorkoutDayKey || !userWorkoutPlan[currentWorkoutDayKey] || !userWorkoutPlan[currentWorkoutDayKey].exercises || userWorkoutPlan[currentWorkoutDayKey].exercises.length === 0) {
        console.warn("Start workout clicked without a valid workout day/exercise selected.");
        return;
    }
    if (currentExerciseIndex >= userWorkoutPlan[currentWorkoutDayKey].exercises.length && !isResting) {
        console.warn("Attempting to start exercise beyond the list and not resting.");
        workoutComplete();
        return;
    }
    startWorkoutButton.disabled = true;
    if (isResting) {
        startWorkoutButton.textContent = 'Resting...';
        skipRestButton.style.display = 'inline-block';
        skipRestButton.disabled = false;
        skipTimerButton.style.display = 'none';
        startTimer(restTime);
    } else {
        const exercise = userWorkoutPlan[currentWorkoutDayKey].exercises[currentExerciseIndex];
        if (exercise.type === 'time') {
            startWorkoutButton.textContent = 'Timing...';
            skipTimerButton.style.display = 'inline-block';
            skipTimerButton.disabled = false;
            nextExerciseButton.style.display = 'none';
            skipRestButton.style.display = 'none';
            playSound(workoutSoundBuffer); 
            startTimer(exercise.duration);
        } else {
            timerDisplay.textContent = `Set ${currentSet} Active`;
            startWorkoutButton.style.display = 'none';
            nextExerciseButton.style.display = 'inline-block';
            nextExerciseButton.disabled = false;
            skipTimerButton.style.display = 'none';
            skipRestButton.style.display = 'none';
            playSound(workoutSoundBuffer); 
        }
    }
});

nextExerciseButton.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    nextExerciseButton.disabled = true;
    handleSetCompletion();
});

skipRestButton.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (!isResting) return;
    clearInterval(timerInterval);
    isResting = false;
    skipRestButton.style.display = 'none';
    skipTimerButton.style.display = 'none';
    displayExercise();
});

skipTimerButton.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const exercise = userWorkoutPlan[currentWorkoutDayKey]?.exercises[currentExerciseIndex];
    if (isResting || exercise.type !== 'time') return;
    clearInterval(timerInterval);
    timerDisplay.textContent = "Skipped!";
    // Ensure calories are still calculated for timed exercises if skipped
    if (exercise.type === 'time' && exercise.caloriesPerSecond) {
        workoutCaloriesBurned += (exercise.duration - timeRemaining) * exercise.caloriesPerSecond;
    }
    // Log individual exercise completion if skipped (still counts as completed)
    workoutExercisesCompleted.push(exercise.name);

    skipTimerButton.style.display = 'none';
    skipTimerButton.disabled = true;
    handleSetCompletion();
});

backToPlanButton.addEventListener('click', () => {
    setupAudio().then(() => {
        playSound(restSoundBuffer); // Play restSoundBuffer when Back to Plan is clicked
        setView('plan');
        clearInterval(timerInterval);
        currentWorkoutDayKey = null;
        currentExerciseIndex = 0;
        currentSet = 1;
        isResting = false;
        exerciseImage.classList.remove('visible');
        exerciseImage.src = '';
        exerciseImage.style.display = 'none';
    });
});

// --- Edit Plan Logic ---
editPlanButton.addEventListener('click', () => {
    isEditingPlan = !isEditingPlan;

    // Play sound using AudioBuffer
    if (isEditingPlan && workoutSoundBuffer) {
        playSound(workoutSoundBuffer);
    } else if (!isEditingPlan && restSoundBuffer) {
        playSound(restSoundBuffer);
    }

    editPlanButton.textContent = isEditingPlan ? 'Finish Editing' : 'Edit My Plan';
    editPlanButton.classList.toggle('active-editing', isEditingPlan);
    setView('plan');
    displayPlan();
});


function createExerciseEditRow(exercise = {}, index = -1, dayKey = '') {
    const row = document.createElement('div');
    row.classList.add('exercise-edit-row');
    const uniqueId = `${dayKey}-${index}-${Math.random().toString(36).substr(2, 9)}`; 
    row.dataset.id = uniqueId;

    row.innerHTML = `
        <div class="form-group">
            <label for="ex-name-${uniqueId}">Exercise Name:</label>
            <input type="text" id="ex-name-${uniqueId}" class="modal-input ex-name" value="${exercise.name || ''}">
        </div>
        <div class="form-group">
            <label for="ex-sets-${uniqueId}">Sets:</label>
            <input type="number" id="ex-sets-${uniqueId}" class="modal-input ex-sets" value="${exercise.sets || 3}" min="1">
        </div>
        <div class="form-group">
            <label for="ex-type-${uniqueId}">Type:</label>
            <select id="ex-type-${uniqueId}" class="modal-select ex-type">
                <option value="reps" ${exercise.type === 'reps' ? 'selected' : ''}>Reps</option>
                <option value="time" ${exercise.type === 'time' ? 'selected' : ''}>Time</option>
            </select>
        </div>
        <div class="form-group" id="ex-reps-group-${uniqueId}" style="display: ${exercise.type === 'time' ? 'none' : 'block'};">
            <label for="ex-reps-${uniqueId}">Reps (e.g., 10 or '10 each'):</label>
            <input type="text" id="ex-reps-${uniqueId}" class="modal-input ex-reps" value="${exercise.reps || ''}">
        </div>
        <div class="form-group" id="ex-duration-group-${uniqueId}" style="display: ${exercise.type === 'reps' || !exercise.type ? 'none' : 'block'};">
            <label for="ex-duration-${uniqueId}">Duration (seconds):</label>
            <input type="number" id="ex-duration-${uniqueId}" class="modal-input ex-duration" value="${exercise.duration || 60}" min="1">
        </div>
        <div class="form-group">
            <label for="ex-image-${uniqueId}">Image Filename (e.g., pullups.png):</label>
            <input type="text" id="ex-image-${uniqueId}" class="modal-input ex-image" value="${exercise.image || ''}">
        </div>
        <div class="form-group">
            <label for="ex-calories-${uniqueId}">Calories per Rep/Second:</label>
            <input type="number" step="0.1" id="ex-calories-${uniqueId}" class="modal-input ex-calories" value="${exercise.caloriesPerRep || exercise.caloriesPerSecond || 0.1}" min="0">
        </div>
        <button class="modal-button danger remove-exercise-button" type="button">Remove Exercise</button>
    `;
    const typeSelect = row.querySelector('.ex-type');
    const repsGroup = row.querySelector(`#ex-reps-group-${uniqueId}`);
    const durationGroup = row.querySelector(`#ex-duration-group-${uniqueId}`);
    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'reps') {
            repsGroup.style.display = 'block';
            durationGroup.style.display = 'none';
        } else {
            repsGroup.style.display = 'none';
            durationGroup.style.display = 'block';
        }
    });
    row.querySelector('.remove-exercise-button').addEventListener('click', () => row.remove());
    return row;
}

function openEditDayModal(dayKey) {
    const dayData = userWorkoutPlan[dayKey];
    if (!dayData) return;
    editingDayKeyInput.value = dayKey;
    modalDayTitle.textContent = `Edit ${dayKey}`;
    modalDayDescriptionInput.value = dayData.name || '';
    modalExercisesContainer.innerHTML = '';
    if (dayData.exercises && dayData.exercises.length > 0) {
        dayData.exercises.forEach((ex, index) => {
            modalExercisesContainer.appendChild(createExerciseEditRow(ex, index, dayKey));
        });
    } else {
        modalExercisesContainer.appendChild(createExerciseEditRow({}, 0, dayKey));
    }
    editDayModal.style.display = 'flex';
}

addExerciseToModalButton.addEventListener('click', () => {
    const dayKey = editingDayKeyInput.value;
    const newIndex = modalExercisesContainer.children.length;
    modalExercisesContainer.appendChild(createExerciseEditRow({}, newIndex, dayKey));
});

saveDayChangesButton.addEventListener('click', () => {
    const dayKey = editingDayKeyInput.value;
    if (!userWorkoutPlan[dayKey]) return;
    userWorkoutPlan[dayKey].name = modalDayDescriptionInput.value.trim() || `Workout for ${dayKey}`;
    const newExercises = [];
    const exerciseRows = modalExercisesContainer.querySelectorAll('.exercise-edit-row');
    exerciseRows.forEach(row => {
        const name = row.querySelector('.ex-name').value.trim();
        if (!name) return;
        const exercise = {
            name: name,
            sets: parseInt(row.querySelector('.ex-sets').value) || 3,
            type: row.querySelector('.ex-type').value,
            image: row.querySelector('.ex-image').value.trim()
        };
        if (exercise.type === 'reps') {
            exercise.reps = row.querySelector('.ex-reps').value.trim() || 10;
            exercise.caloriesPerRep = parseFloat(row.querySelector('.ex-calories').value) || 0.1;
        } else {
            exercise.duration = parseInt(row.querySelector('.ex-duration').value) || 60;
            exercise.caloriesPerSecond = parseFloat(row.querySelector('.ex-calories').value) || 0.1;
        }
        newExercises.push(exercise);
    });
    userWorkoutPlan[dayKey].exercises = newExercises;
    if (newExercises.length === 0 && userWorkoutPlan[dayKey].name !== "Rest Day") {
        userWorkoutPlan[dayKey].name = "Rest Day";
    } else if (newExercises.length > 0 && userWorkoutPlan[dayKey].name === "Rest Day") {
        userWorkoutPlan[dayKey].name = modalDayDescriptionInput.value.trim() || `Workout for ${dayKey}`;
    }
    saveUserPlan();
    editDayModal.style.display = 'none';
    displayPlan();
});

cancelDayEditButton.addEventListener('click', () => {
    editDayModal.style.display = 'none';
});
closeModalButton.addEventListener('click', () => {
    editDayModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === editDayModal) {
        editDayModal.style.display = 'none';
    }
});

function displayPlan() {
    planContainer.innerHTML = '';
    for (const [dayKey, data] of Object.entries(userWorkoutPlan)) {
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
        dayCard.innerHTML = `<h3>${dayKey} - ${data.name}</h3>`;
        if (data.exercises && data.exercises.length > 0) {
            const ul = document.createElement('ul');
            data.exercises.forEach((ex) => {
                const li = document.createElement('li');
                li.textContent = `${ex.name} - ${ex.sets} sets x ${ex.reps ? ex.reps + ' reps' : ex.duration + ' sec'}`;
                ul.appendChild(li);
            });
            dayCard.appendChild(ul);
            if (!isEditingPlan) {
                const startDayButton = document.createElement('button');
                startDayButton.textContent = `Start ${dayKey} Workout`;
                startDayButton.dataset.dayKey = dayKey;
                startDayButton.classList.add('start-day-workout');
                startDayButton.addEventListener('click', () => selectDay(dayKey));
                dayCard.appendChild(startDayButton);
            }
        } else {
            dayCard.innerHTML += `<p class="rest-day">Rest Day</p>`;
        }
        if (isEditingPlan) {
            const editButton = document.createElement('button');
            editButton.textContent = `Edit Day`;
            editButton.classList.add('edit-day-button');
            editButton.dataset.dayKey = dayKey;
            editButton.addEventListener('click', () => openEditDayModal(dayKey));
            dayCard.appendChild(editButton);
        }
        planContainer.appendChild(dayCard);
    }
}

// --- Profile View Logic ---
viewProfileButton.addEventListener('click', () => {
    setupAudio().then(() => {
        playSound(profileSoundBuffer); // Play sound when View Profile is clicked
        setView('profile');
    });
});

function renderProfile() {
    let totalWorkouts = 0;
    let totalExercises = 0;
    let totalCalories = 0;

    for (const date in workoutLog) {
        totalWorkouts += workoutLog[date].completedWorkouts;
        totalCalories += workoutLog[date].caloriesBurned;
        for (const exerciseName in workoutLog[date].exercises) {
            totalExercises += workoutLog[date].exercises[exerciseName];
        }
    }
    totalWorkoutsDisplay.textContent = totalWorkouts;
    totalExercisesCompletedDisplay.textContent = totalExercises;
    totalCaloriesDisplay.textContent = totalCalories.toFixed(0); // Display as integer

    renderProgressTracker(currentProfileYear);
}

function renderProgressTracker(year) {
    currentYearDisplay.textContent = year;
    progressTrackerGrid.innerHTML = '';

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create month containers instead of individual days
    monthNames.forEach((monthName, monthIndex) => {
        const monthContainer = document.createElement('div');
        monthContainer.classList.add('month-container');
        
        const monthHeader = document.createElement('div');
        monthHeader.classList.add('month-header');
        monthHeader.textContent = monthName;
        monthContainer.appendChild(monthHeader);

        const daysInMonthGrid = document.createElement('div');
        daysInMonthGrid.classList.add('days-in-month-grid');
        monthContainer.appendChild(daysInMonthGrid);

        // Add day labels (Sun, Mon, Tue...)
        dayLabels.forEach(label => {
            const dayLabelDiv = document.createElement('div');
            dayLabelDiv.classList.add('day-label');
            dayLabelDiv.textContent = label;
            daysInMonthGrid.appendChild(dayLabelDiv);
        });

        // Determine the day of the week for the 1st of the month
        // getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        // This is now correctly aligned with 'Sun' as the first label.
        const firstDayOfMonth = new Date(year, monthIndex, 1);
        const startOffsetDays = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday etc.

        // Add empty cells for the start offset
        for (let i = 0; i < startOffsetDays; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('progress-day', 'empty');
            daysInMonthGrid.appendChild(emptyCell);
        }

        // Add actual day cells
        let date = new Date(year, monthIndex, 1);
        const today = new Date();
        // Set today's date to midnight for consistent comparison
        today.setHours(0, 0, 0, 0); 

        while (date.getMonth() === monthIndex) {
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const dayCell = document.createElement('div');
            dayCell.classList.add('progress-day');

            // Set current date to midnight for comparison
            const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            // Add a class for today's date for special highlighting
            if (currentDate.getTime() === today.getTime()) {
                dayCell.classList.add('today');
            }

            if (workoutLog[dateString]) {
                dayCell.classList.add('completed-day');
                const logData = workoutLog[dateString];
                const workoutCount = logData.completedWorkouts;
                if (workoutCount >= 4) dayCell.classList.add('level-4');
                else if (workoutCount >= 3) dayCell.classList.add('level-3');
                else if (workoutCount >= 2) dayCell.classList.add('level-2');
                else if (workoutCount >= 1) dayCell.classList.add('level-1');

                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                let tooltipContent = `${new Date(dateString).toLocaleDateString()}\nWorkouts: ${logData.completedWorkouts}\nCalories: ${logData.caloriesBurned} kcal`;
                if (logData.exercises && Object.keys(logData.exercises).length > 0) {
                    tooltipContent += "\n\nExercises:";
                    for (const exName in logData.exercises) {
                        tooltipContent += `\n- ${exName}: ${logData.exercises[exName]} completed`;
                    }
                }
                tooltip.textContent = tooltipContent;
                dayCell.appendChild(tooltip);
            }
            daysInMonthGrid.appendChild(dayCell);
            date.setDate(date.getDate() + 1);
        }
        
        progressTrackerGrid.appendChild(monthContainer);
    });
}

// Clear Workout Log button functionality
clearLogButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all workout log data? This cannot be undone.")) {
        workoutLog = {}; // Clear the log object
        saveWorkoutLog(); // Save the empty log to localStorage
        renderProfile(); // Re-render the profile to show cleared stats
        alert("Workout log cleared!");
    }
});


prevYearButton.addEventListener('click', () => {
    currentProfileYear--;
    renderProgressTracker(currentProfileYear);
});

nextYearButton.addEventListener('click', () => {
    currentProfileYear++;
    renderProgressTracker(currentProfileYear);
});

// --- AI Assistant Logic ---
aiChatToggle.addEventListener('click', () => {
    aiChatbotModal.style.display = 'flex';
    chatInput.focus();
});

closeAiModalButton.addEventListener('click', () => {
    aiChatbotModal.style.display = 'none';
    stopSpeaking(); // Stop speech when closing modal
});

window.addEventListener('click', (event) => {
    if (event.target === aiChatbotModal) {
        aiChatbotModal.style.display = 'none';
        stopSpeaking(); // Stop speech when clicking outside modal
    }
});

sendChatButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

speakChatButton.addEventListener('click', async () => {
    if (speaking) {
        stopSpeaking();
        speakChatButton.textContent = 'Speak';
    } else {
        const lastBotMessage = chatHistoryDiv.lastElementChild;
        if (lastBotMessage && lastBotMessage.classList.contains('bot-message')) {
            await speakText(lastBotMessage.textContent);
            speakChatButton.textContent = 'Stop Speaking';
        } else {
            appendMessage("Bot", "There's nothing for me to say yet!", 'bot-message');
            await speakText("There's nothing for me to say yet!");
        }
    }
});

function appendMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    // Replace markdown bold with HTML strong tags
    messageElement.innerHTML = message.replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
    chatHistoryDiv.appendChild(messageElement);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight; // Auto-scroll to bottom
}

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage, 'user-message');
    chatInput.value = '';
    sendChatButton.disabled = true;
    speakChatButton.disabled = true;
    stopSpeaking(); // Stop any ongoing speech

    conversationHistory.push({ role: "user", content: userMessage });
    conversationHistory = conversationHistory.slice(-10); // Keep last 10 messages

    try {
        const completion = await websim.chat.completions.create({
            model: "claude-3-sonnet-20240229", // Specify the model
            messages: [
                {
                    role: "system",
                    content: `You are Nova, a friendly, beautiful, and knowledgeable AI workout assistant. Your responses should be clear, fluent, and helpful. You can answer general questions, conduct research, and assist with workout-related commands (like "start Monday workout", "next exercise", "skip rest") and music control commands (like "play music", "pause music", "next song", "previous song", "what's playing"). 
                    
                    Here are the available workout days: ${Object.keys(userWorkoutPlan).join(', ')}.
                    Here are the exercises in the current plan: ${Object.values(userWorkoutPlan).map(day => day.exercises.map(ex => ex.name)).flat().filter((value, index, self) => self.indexOf(value) === index).join(', ')}.
                    
                    If the user asks to start a workout, respond with "Absolutely! Starting your ***[Day Name]*** workout now. Let's get moving!".
                    If the user asks for the next exercise, respond with "Alright, moving to the next exercise. You're doing great!".
                    If the user asks to skip rest, respond with "No problem! Skipping the rest period for you. Keep up the momentum!".
                    If the user asks to skip timer, respond with "Timer skipped! Let's get straight to the next part of your workout!".
                    If the user asks to play music, respond with "Energizing sounds coming right up! Playing your music now.".
                    If the user asks to pause music, respond with "Music paused for you. Take a breather if you need!".
                    If the user asks for the next song, respond with "Skipping to the next track! Hope you enjoy this one.".
                    If the user asks for the previous song, respond with "Going back to the previous song. Let's find that perfect beat!".
                    If the user asks "what's playing", respond with the current song title from the music player, e.g., "Currently playing: ***[Song Title]*** by ***[Artist Name]***. A fantastic choice!". If nothing is playing, say "It looks like no music is currently playing. Would you like me to start some?".
                    
                    For other queries related to workout, nutrition, general knowledge, or anything else, provide helpful and informative responses. If a command cannot be executed, explain why in a friendly manner. Always aim to be encouraging and supportive!`,
                },
                ...conversationHistory,
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: "selectDay",
                        description: "Starts a workout for a specific day.",
                        parameters: {
                            type: "object",
                            properties: {
                                dayKey: {
                                    type: "string",
                                    enum: Object.keys(userWorkoutPlan),
                                },
                            },
                            required: ["dayKey"],
                        },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "handleSetCompletion",
                        description: "Moves to the next set or next exercise in the current workout.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "skipRestButton.click",
                        description: "Skips the current rest period.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "skipTimerButton.click",
                        description: "Skips the current timed exercise.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "playPauseBGM",
                        description: "Toggles playback of the background music.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "playNextBGM",
                        description: "Skips to the next background music track.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "playPreviousBGM",
                        description: "Skips to the previous background music track.",
                        parameters: { type: "object", properties: {} },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "getCurrentSongInfo",
                        description: "Gets the title and artist of the currently playing YouTube song.",
                        parameters: { type: "object", properties: {} },
                    },
                },
            ],
            temperature: 0.7, 
            max_tokens: 150,   
        });

        if (completion.tool_calls && completion.tool_calls.length > 0) {
            for (const toolCall of completion.tool_calls) {
                const functionName = toolCall.function.name;
                const args = JSON.parse(toolCall.function.arguments);
                let toolResponse = '';

                switch (functionName) {
                    case 'selectDay':
                        if (userWorkoutPlan[args.dayKey]) {
                            selectDay(args.dayKey);
                            toolResponse = `Absolutely! Starting your ***${args.dayKey}*** workout now. Let's get moving!`;
                        } else {
                            toolResponse = `I'm sorry, I couldn't find a workout plan for ***${args.dayKey}***. Please check the available days!`;
                        }
                        break;
                    case 'handleSetCompletion':
                        if (currentWorkoutDayKey) {
                            handleSetCompletion();
                            toolResponse = "Alright, moving to the next exercise or set. You're doing great!";
                        } else {
                            toolResponse = "There isn't an active workout to move to the next exercise. Please start a workout first!";
                        }
                        break;
                    case 'skipRestButton.click':
                        if (isResting) {
                            skipRestButton.click();
                            toolResponse = "No problem! Skipping the rest period for you. Keep up the momentum!";
                        } else {
                            toolResponse = "You're not currently in a rest period, so there's no rest to skip!";
                        }
                        break;
                    case 'skipTimerButton.click':
                        const exercise = userWorkoutPlan[currentWorkoutDayKey]?.exercises[currentExerciseIndex];
                        if (exercise && exercise.type === 'time' && !isResting) {
                            skipTimerButton.click();
                            toolResponse = "Timer skipped! Let's get straight to the next part of your workout!";
                        } else {
                            toolResponse = "There's no active timer to skip right now, or you're not in a timed exercise.";
                        }
                        break;
                    case 'playPauseBGM':
                        playPauseBGM();
                        toolResponse = isBgmPlaying ? "Music paused for you. Take a breather if you need!" : "Energizing sounds coming right up! Playing your music now.";
                        break;
                    case 'playNextBGM':
                        playNextBGM();
                        toolResponse = "Skipping to the next track! Hope you enjoy this one.";
                        break;
                    case 'playPreviousBGM':
                        playPreviousBGM();
                        toolResponse = "Going back to the previous song. Let's find that perfect beat!";
                        break;
                    case 'getCurrentSongInfo':
                        const title = titleElement.textContent;
                        const artist = artistElement.textContent;
                        if (title && title !== 'Song Title') {
                            toolResponse = `Currently playing: ***${title}*** by ***${artist}***. A fantastic choice!`;
                        } else {
                            toolResponse = "It looks like no music is currently playing. Would you like me to start some?";
                        }
                        break;
                    default:
                        toolResponse = `I'm not quite sure how to handle that specific command, but I'm always learning!`;
                }
                appendMessage("Nova", toolResponse, 'bot-message');
                await speakText(toolResponse);
                conversationHistory.push({ role: "tool", tool_call_id: toolCall.id, content: toolResponse });
            }
        } else if (completion.content) {
            appendMessage("Nova", completion.content, 'bot-message');
            await speakText(completion.content);
            conversationHistory.push({ role: "assistant", content: completion.content });
        } else {
            appendMessage("Nova", "I'm sorry, I couldn't quite understand that. Could you please rephrase?", 'bot-message');
            await speakText("I'm sorry, I couldn't quite understand that. Could you please rephrase?");
        }
    } catch (error) {
        console.error("AI Assistant error:", error);
        appendMessage("Nova", "Oops! Something went wrong while processing your request. Please try again. I'm always here to help!", 'bot-message');
        await speakText("Oops! Something went wrong while processing your request. Please try again. I'm always here to help!");
    } finally {
        sendChatButton.disabled = false;
        speakChatButton.disabled = false;
    }
}

async function speakText(text) {
    if (speaking) {
        stopSpeaking();
    }
    speaking = true;
    speakChatButton.textContent = 'Stop Speaking';
    try {
        const result = await websim.textToSpeech({
            text: text,
            voice: "en-female", 
            model: "aura-latest", // Use the latest model for faster, more fluent speech
        });

        currentSpeechAudio = new Audio(result.url);
        currentSpeechAudio.play();
        currentSpeechAudio.onended = () => {
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
        };
        currentSpeechAudio.onerror = (e) => {
            console.error("Text-to-speech audio error:", e);
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
        };
    } catch (e) {
        console.error("Error generating speech:", e);
        speaking = false;
        speakChatButton.textContent = 'Speak';
    }
}

function stopSpeaking() {
    if (currentSpeechAudio) {
        currentSpeechAudio.pause();
        currentSpeechAudio.currentTime = 0; // Reset to beginning
        currentSpeechAudio = null;
    }
    speaking = false;
    speakChatButton.textContent = 'Speak';
}


// Initial Setup
initWorkoutPlan();
initWorkoutLog();
populateMusicSelector();
if (themeSelectElement) {
    loadTheme();
} else {
    applyTheme('green');
}
loadColorMode(); // Load color mode on startup
exerciseImage.src = '';
exerciseImage.classList.remove('visible');
exerciseImage.style.display = 'none';
displayPlan();
setView('plan');

document.addEventListener('DOMContentLoaded', () => {
    setupAudio();
});