import confetti from 'canvas-confetti';
import { GoogleGenerativeAI } from 'https://cdn.skypack.dev/@google/generative-ai';
window.GoogleGenerativeAI = GoogleGenerativeAI;

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
let workoutLog = {}; 
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

const editDayModal = document.getElementById('edit-day-modal');
const modalDayTitle = document.getElementById('modal-day-title');
const modalDayDescriptionInput = document.getElementById('modal-day-description');
const modalExercisesContainer = document.getElementById('modal-exercises-container');
const addExerciseToModalButton = document.getElementById('add-exercise-to-modal');
const saveDayChangesButton = document.getElementById('save-day-changes');
const cancelDayEditButton = document.getElementById('cancel-day-edit');
const closeModalButton = document.getElementById('close-edit-modal-button');
const editingDayKeyInput = document.getElementById('editing-day-key');

const aiChatToggle = document.getElementById('ai-chat-toggle');
const aiChatbotModal = document.getElementById('ai-chatbot-modal');
const closeAiModalButton = document.getElementById('close-ai-modal-button');
const chatHistoryDiv = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat-btn');
const speakChatButton = document.getElementById('speak-chat-btn');
const voiceInputButton = document.getElementById('voice-input-btn'); 

let conversationHistory = [];
let speaking = false;
let recognition; 

let audioContext;
let bgmSource;
let bgmGainNode; 
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
let lightModeSoundBuffer; 
let darkModeSoundBuffer; 
let isEditingPlan = false;
let workoutCaloriesBurned = 0; 
let workoutExercisesCompleted = []; 
let isLightMode = false; 
let currentSpeechAudio = null; 
let currentView = 'plan'; 

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
    bgmGainNode = audioContext.createGain(); 
    bgmGainNode.connect(audioContext.destination);
    bgmGainNode.gain.value = 0.5; 

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
        const storedUploaded = localStorage.getItem('uploadedBgms');
        if (storedUploaded) {
            try {
                uploadedBgms = JSON.parse(storedUploaded);
                uploadedBgms = []; 
            } catch (e) {
                console.error("Failed to parse stored uploaded BGMs:", e);
                uploadedBgms = [];
            }
        }
        bgmPlaylist = [...validPreloadedBgms, ...uploadedBgms];
        workoutSoundBuffer = await loadSound('workout_start.mp3');
        restSoundBuffer = await loadSound('rest_start.mp3');
        profileSoundBuffer = await loadSound('workout_start.mp3'); 
        lightModeSoundBuffer = await loadSound('workout_start.mp3'); 
        darkModeSoundBuffer = await loadSound('rest_start.mp3'); 

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
        bgmSource.connect(bgmGainNode); 
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

function playPauseBGMHandler() {
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

playPauseBgmButton.addEventListener('click', playPauseBGMHandler);
nextBgmButton.addEventListener('click', playNextBGM);
prevBgmButton.addEventListener('click', playPreviousBGM);

function playSound(buffer) {
    if (!audioContext || audioContext.state === 'closed' || !buffer) {
        console.warn("Audio context not ready or buffer missing for sound effect.");
        return;
    }
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
    document.body.className = ''; 
    if (isLightMode) { 
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
            themeSelectElement.value = 'green'; 
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
        modeIcon.textContent = '☀️'; 
        localStorage.setItem('colorMode', 'light');
        playSound(lightModeSoundBuffer); 
    } else {
        document.body.classList.remove('light-mode');
        modeIcon.textContent = '🌙'; 
        localStorage.setItem('colorMode', 'dark');
        playSound(darkModeSoundBuffer); 
    }
    applyTheme(themeSelectElement.value);
    setView(currentView); 
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
    currentView = viewName; 

    planContainer.style.display = 'none';
    workoutDisplayContainer.style.display = 'none';
    profileView.style.display = 'none';
    currentExerciseDiv.style.display = 'none';
    document.body.classList.remove('plan-view', 'workout-view', 'profile-view');
    backToPlanButton.style.display = 'none'; 
    editPlanButton.style.display = 'inline-block'; 
    viewProfileButton.style.display = 'inline-block'; 

    if (viewName === 'plan') {
        document.body.classList.add('plan-view');
        planContainer.style.display = 'grid';
        workoutDisplayContainer.style.display = 'block'; 
        currentExerciseDiv.style.display = 'none'; 
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
        backToPlanButton.style.display = 'inline-block'; 
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
    workoutCaloriesBurned = 0; 
    workoutExercisesCompleted = []; 
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
            if (isResting) { 
                isResting = false;
                skipRestButton.style.display = 'none';
                displayExercise();
            } else {
                if (exercise.type === 'time' && exercise.caloriesPerSecond) {
                    workoutCaloriesBurned += (duration - timeRemaining) * exercise.caloriesPerSecond;
                }
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
    
    if (exercise.type === 'reps' && exercise.caloriesPerRep) {
        const repsValue = parseInt(String(exercise.reps).replace(' each', ''));
        if (!isNaN(repsValue)) {
            workoutCaloriesBurned += repsValue * exercise.caloriesPerRep;
        }
    }
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

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; 
    if (!workoutLog[dateString]) {
        workoutLog[dateString] = {
            completedWorkouts: 0,
            caloriesBurned: 0,
            exercises: {} 
        };
    }
    workoutLog[dateString].completedWorkouts++;
    workoutLog[dateString].caloriesBurned += Math.round(workoutCaloriesBurned); 

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
    if (exercise.type === 'time' && exercise.caloriesPerSecond) {
        workoutCaloriesBurned += (exercise.duration - timeRemaining) * exercise.caloriesPerSecond;
    }
    workoutExercisesCompleted.push(exercise.name);

    skipTimerButton.style.display = 'none';
    skipTimerButton.disabled = true;
    handleSetCompletion();
});

backToPlanButton.addEventListener('click', () => {
    setupAudio().then(() => {
        playSound(restSoundBuffer); 
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

editPlanButton.addEventListener('click', () => {
    isEditingPlan = !isEditingPlan;

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

viewProfileButton.addEventListener('click', () => {
    setupAudio().then(() => {
        playSound(profileSoundBuffer); 
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
    totalCaloriesDisplay.textContent = totalCalories.toFixed(0); 

    renderProgressTracker(currentProfileYear);
}

function renderProgressTracker(year) {
    currentYearDisplay.textContent = year;
    progressTrackerGrid.innerHTML = '';

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
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

        dayLabels.forEach(label => {
            const dayLabelDiv = document.createElement('div');
            dayLabelDiv.classList.add('day-label');
            dayLabelDiv.textContent = label;
            daysInMonthGrid.appendChild(dayLabelDiv);
        });

        const firstDayOfMonth = new Date(year, monthIndex, 1);
        const startOffsetDays = firstDayOfMonth.getDay(); 

        for (let i = 0; i < startOffsetDays; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('progress-day', 'empty');
            daysInMonthGrid.appendChild(emptyCell);
        }

        let date = new Date(year, monthIndex, 1);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        while (date.getMonth() === monthIndex) {
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const dayCell = document.createElement('div');
            dayCell.classList.add('progress-day');

            const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

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

clearLogButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all workout log data? This cannot be undone.")) {
        workoutLog = {}; 
        saveWorkoutLog(); 
        renderProfile(); 
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


// Gemini API variables
let genAI = null;
let model = null;
let userApiKey = localStorage.getItem('geminiApiKey') || '';


// Initialize Gemini AI
function initializeGemini() {
    if (window.GoogleGenerativeAI && userApiKey) {
        genAI = new window.GoogleGenerativeAI(userApiKey);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
}

aiChatToggle.addEventListener('click', () => {
    const GEMINI_API_KEY = 'AIzaSyD7bUXPvX-rpooc_nlLAWl5i9vN9tGXR3Y';
    userApiKey = GEMINI_API_KEY;
    initializeGemini(); 

    aiChatbotModal.style.display = 'flex';
    chatInput.focus();
    
    // Add welcome message if chat is empty
    if (chatHistoryDiv.children.length === 0) {
        appendMessage("Nova", "Hi there! I'm Nova, your AI fitness assistant🤖. I can start Workout Commands, Control Music, share Fitness Knowledge, and keep you on track! Just ask away!", 'bot-message');
    }
});

closeAiModalButton.addEventListener('click', () => {
    aiChatbotModal.style.display = 'none';
    stopSpeaking(); 
    stopVoiceInput(); 
});

window.addEventListener('click', (event) => {
    if (event.target === aiChatbotModal) {
        aiChatbotModal.style.display = 'none';
        stopSpeaking(); 
        stopVoiceInput(); 
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
            appendMessage("Nova", "There's nothing for me to say yet!", 'bot-message');
            await speakText("There's nothing for me to say yet!");
        }
    }
});

voiceInputButton.addEventListener('click', toggleVoiceInput);

function toggleVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        if (!recognition) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false; 
            recognition.interimResults = true; 
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                voiceInputButton.style.backgroundColor = 'var(--accent-color-hover)'; 
                voiceInputButton.textContent = '🔴';
                chatInput.placeholder = "Listening...";
                sendChatButton.disabled = true;
                speakChatButton.disabled = true;
                stopSpeaking(); 
            };

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                chatInput.value = finalTranscript || interimTranscript; 
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                chatInput.placeholder = "Error, try again or type...";
                voiceInputButton.style.backgroundColor = 'var(--accent-color)';
                voiceInputButton.textContent = '🎤';
                sendChatButton.disabled = true;
                speakChatButton.disabled = true;
                stopVoiceInput();
            };

            recognition.onend = () => {
                voiceInputButton.style.backgroundColor = 'var(--accent-color)';
                voiceInputButton.textContent = '🎤';
                chatInput.placeholder = "Ask me anything about your workout or fitness!";
                sendChatButton.disabled = false;
                speakChatButton.disabled = false;
                if (chatInput.value.trim() !== '') { 
                    sendMessage();
                }
            };
        }

        if (voiceInputButton.textContent === '🎤') {
            recognition.start();
        } else {
            recognition.stop();
        }
    } else {
        alert("Speech recognition is not supported in this browser. Please use Chrome for this feature.");
    }
}

function stopVoiceInput() {
    if (recognition) {
        recognition.stop();
        voiceInputButton.style.backgroundColor = 'var(--accent-color)';
        voiceInputButton.textContent = '🎤';
        chatInput.placeholder = "Ask me anything about your workout or fitness!";
    }
}

function appendMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.innerHTML = message.replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
    chatHistoryDiv.appendChild(messageElement);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight; 
}

// Modified sendMessage function to use Gemini API
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    if (!userApiKey || !model) {
        alert('Please set up your Gemini API key first.');
        if (!checkApiKey()) return;
    }

    appendMessage("You", userMessage, 'user-message');
    chatInput.value = '';
    sendChatButton.disabled = true;
    speakChatButton.disabled = true;
    voiceInputButton.disabled = true;
    stopSpeaking();
    stopVoiceInput(); 

    // Show loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('chat-message', 'bot-message', 'loading');
    loadingElement.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatHistoryDiv.appendChild(loadingElement);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;

    try {
        // Check for workout-specific commands first
        const workoutAction = checkWorkoutCommands(userMessage.toLowerCase());
        let response;
        
        if (workoutAction) {
            response = workoutAction;
        } else {
            // Use Gemini API for general fitness advice
            const context = `You are Nova, an AI fitness assistant for a workout planner app. You're knowledgeable, encouraging, and friendly. Focus on providing helpful fitness, nutrition, and wellness advice. Keep responses conversational and motivating. If asked about non-fitness topics, gently redirect to fitness-related discussions.

Current context: The user is using a workout planner app that can:
- Start workouts for specific days (Monday through Sunday)
- Track exercises, sets, and reps
- Play/pause music
- Track calories burned
- View workout progress
- Edit workout plans

You can reference these features when appropriate. Be encouraging and supportive in your responses.`;
            
            const fullPrompt = `${context}\n\nUser: ${userMessage}`;
            
            const result = await model.generateContent(fullPrompt);
            const geminiResponse = await result.response;
            response = geminiResponse.text();
        }

        // Remove loading indicator
        chatHistoryDiv.removeChild(loadingElement);
        
        // Add AI response
        appendMessage("Nova", response, 'bot-message');
        await speakText(response);

    } catch (error) {
        console.error('Gemini API Error:', error);
        
        // Remove loading indicator
        if (loadingElement.parentNode) {
            chatHistoryDiv.removeChild(loadingElement);
        }
        
        const errorMessage = "I'm sorry, I encountered an error. Please check your API key and try again. If the problem persists, the service might be temporarily unavailable.";
        appendMessage("Nova", errorMessage, 'bot-message');
        await speakText(errorMessage);
    } finally {
        sendChatButton.disabled = false;
        speakChatButton.disabled = false;
        voiceInputButton.disabled = false;
    }
}

// Keep workout-specific commands for immediate actions
function checkWorkoutCommands(msg) {
    const workoutDayKeywords = {
        "monday": "Monday", "tuesday": "Tuesday", "wednesday": "Wednesday",
        "thursday": "Thursday", "friday": "Friday", "saturday": "Saturday", "sunday": "Sunday"
    };

    // 🔊 Music
    if (msg.includes("play music") || (msg.includes("play") && !msg.includes("workout"))) {
        if (typeof playPauseBGMHandler === 'function') playPauseBGMHandler(); 
        return "Energizing sounds coming right up! Playing your music now.";
    }
    if (msg.includes("pause music") || (msg.includes("pause") && !msg.includes("workout"))) {
        if (typeof playPauseBGMHandler === 'function') playPauseBGMHandler(); 
        return "Music paused. Take a breather if you need!";
    }
    if (msg.includes("next song")) {
        if (typeof playNextBGM === 'function') playNextBGM();
        return "Skipping to the next track! Hope you enjoy this one.";
    }
    if (msg.includes("previous song")) {
        if (typeof playPreviousBGM === 'function') playPreviousBGM();
        return "Back to the previous song. Let's find that perfect beat!";
    }

    // 🏋️‍♂️ Workout Commands
    if (msg.includes("start workout")) {
        let foundDay = null;
        for (const keyword in workoutDayKeywords) {
            if (msg.includes(keyword)) {
                foundDay = workoutDayKeywords[keyword];
                break;
            }
        }
        if (foundDay) {
            if (typeof userWorkoutPlan !== 'undefined' && userWorkoutPlan[foundDay] && userWorkoutPlan[foundDay].exercises.length > 0) {
                if (typeof selectDay === 'function') selectDay(foundDay);
                return `Absolutely! Starting your ***${foundDay}*** workout now. Let's get moving!`;
            } else {
                return `I'm sorry, ***${foundDay}*** seems to be a rest day or has no exercises defined. Want to pick another day or edit your plan?`;
            }
        } else {
            return "Which day's workout would you like to start? For example, 'start workout Monday'.";
        }
    }

    if (msg.includes("next exercise") || msg.includes("next set")) {
        if (typeof currentWorkoutDayKey !== 'undefined' && currentWorkoutDayKey) {
            if (typeof handleSetCompletion === 'function') handleSetCompletion(); 
            return "Alright, moving to the next exercise. You're doing great!";
        } else {
            return "There isn't an active workout to move to the next exercise. Please start a workout first!";
        }
    }

    if (msg.includes("skip rest")) {
        if (typeof isResting !== 'undefined' && isResting) {
            if (typeof skipRestButton !== 'undefined' && skipRestButton.click) skipRestButton.click(); 
            return "No problem! Skipping the rest period for you. Keep up the momentum!";
        } else {
            return "You're not currently in a rest period, so there's no rest to skip!";
        }
    }

    if (msg.includes("skip timer")) {
        const exercise = userWorkoutPlan[currentWorkoutDayKey]?.exercises[currentExerciseIndex];
        if (exercise && exercise.type === 'time' && !isResting) {
            skipTimerButton.click(); 
            return "Timer skipped! Let's get straight to the next part of your workout!";
        } else {
            return "There's no active timer to skip right now, or you're not in a timed exercise.";
        }
    }

    if (msg.includes("view profile") || msg.includes("check progress")) {
        if (typeof viewProfileButton !== 'undefined' && viewProfileButton.click) viewProfileButton.click();
        return "Alright, let's take a look at your progress! Keep crushing those goals.";
    }

    if (msg.includes("edit plan")) {
        if (typeof editPlanButton !== 'undefined' && editPlanButton.click) editPlanButton.click();
        return "Opening the workout plan editor. You can customize your routine here!";
    }

    // 🧠 Fitness Knowledge Responses
    if (msg.includes("how to warm up"))
        return "A good warm-up includes 5-10 minutes of light cardio like jumping jacks or jogging in place. Add dynamic stretches like arm swings and leg swings!";
    if (msg.includes("importance of cool down"))
        return "Cooling down helps lower your heart rate gradually and prevents dizziness. It also improves flexibility and aids recovery!";
    if (msg.includes("best time to workout"))
        return "The best time to workout is the time you’ll stick with! Morning, afternoon, or evening — consistency is what matters most.";
    if (msg.includes("what to eat before workout"))
        return "A banana, oats, or yogurt 30–60 minutes before exercise fuels your body. Combine carbs and a bit of protein for best performance.";
    if (msg.includes("how to stay motivated"))
        return "Set small goals, celebrate progress, switch routines often, and remember your 'why'. You’ve got this!";
    if (msg.includes("what is hiit"))
        return "HIIT means High-Intensity Interval Training: short bursts of exercise followed by short rests. Efficient and intense!";
    if (msg.includes("why is stretching important"))
        return "Stretching increases flexibility, reduces risk of injury, and relieves muscle tension. Do it before and after workouts!";
    if (msg.includes("how much water should i drink"))
        return "About 2–3 liters daily, more if you’re sweating. Drink before, during, and after workouts.";
    if (msg.includes("healthy breakfast ideas"))
        return "Try oatmeal, Greek yogurt with fruit, eggs on toast, or a smoothie with banana and spinach!";
    if (msg.includes("how to improve strength"))
        return "Progressive overload is key. Add reps, increase resistance, and allow recovery days. Form matters more than speed!";
    if (msg.includes("benefits of strength training"))
        return "Strength training boosts metabolism, improves posture, enhances bone density, and helps you burn fat!";
    if (msg.includes("cardio vs strength training"))
        return "Cardio boosts endurance and heart health. Strength training builds muscle. Best results? Do both!";
    if (msg.includes("nutrition tips"))
        return "Eat lean protein, healthy fats, whole grains, fruits, and veggies. Limit sugar and processed food. Hydrate well!";
    if (msg.includes("calories burned"))
        return workoutCaloriesBurned > 0
            ? `You've burned around ***${workoutCaloriesBurned.toFixed(0)} calories*** so far! Amazing effort!`
            : "No workout yet today — let's change that!";

    // 🤝 Small Talk
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) return "Hi there! I'm Nova, your AI fitness assistant. Ready to get started?";
    if (msg.includes("how are you")) return "I'm fully charged and ready to help with your fitness journey!";
    if (msg.includes("thank you") || msg.includes("thanks")) return "You're welcome! Keep pushing forward!";
    if (msg.includes("bye") || msg.includes("goodbye")) return "Goodbye! Keep moving, stay hydrated, and come back soon!";
    if (msg.includes("who are you")) return "I'm Nova — your intelligent, friendly, and supportive fitness assistant!";
    if (msg.includes("help") || msg.includes("what can you do")) return "I can start Workout Commands, Control Music, share Fitness Knowledge, and keep you on track! Just ask away!";

    return null; // fallback to Gemini
}

let synth = window.speechSynthesis || null;
let currentUtterance = null;

const ELEVENLABS_API_KEY = 'sk_26f7a33f44b9fdd92a9f99b70b86ceed3fd81528d0f92735'; 
const ELEVENLABS_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; 

async function speakText(text) {
    stopSpeaking();
    speaking = true;
    speakChatButton.textContent = 'Stop Speaking';

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.4,
                    similarity_boost: 0.8
                }
            }),
        });

        if (!response.ok) throw new Error("ElevenLabs TTS API failed or returned an error.");

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (currentSpeechAudio) {
            currentSpeechAudio.pause();
            currentSpeechAudio = null;
        }

        currentSpeechAudio = new Audio(audioUrl);
        currentSpeechAudio.playbackRate = 0.95;

        currentSpeechAudio.onended = () => {
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
            URL.revokeObjectURL(audioUrl); 
        };

        currentSpeechAudio.onerror = (e) => {
            console.error("Audio playback error:", e);
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
            URL.revokeObjectURL(audioUrl); 
        };

        await currentSpeechAudio.play();
    } catch (err) {
        console.error("ElevenLabs TTS failed:", err);
        fallbackToBrowserTTS(text);
    }
}

function fallbackToBrowserTTS(text) {
    if (window.speechSynthesis) {
        if (!synth) { 
            synth = window.speechSynthesis;
        }

        let voices = synth.getVoices();
        if (!voices.length) {
            synth.onvoiceschanged = () => {
                voices = synth.getVoices();
                actuallySpeak(voices, text);
            };
        } else {
            actuallySpeak(voices, text);
        }
    } else {
        speaking = false;
        speakChatButton.textContent = 'Speak';
    }
}

function actuallySpeak(voices, text) {
    let selectedVoice =
        voices.find(v => /Google US English/.test(v.name)) ||
        voices.find(v => /en-US/.test(v.lang) && /female/i.test(v.name)) ||
        voices.find(v => /en-US/.test(v.lang)) ||
        voices.find(v => v.lang.startsWith('en'));

    currentUtterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) currentUtterance.voice = selectedVoice;
    currentUtterance.lang = selectedVoice?.lang || 'en-US';

    currentUtterance.rate = 0.95;
    currentUtterance.pitch = 1.09;

    currentUtterance.onend = () => {
        speaking = false;
        speakChatButton.textContent = 'Speak';
        currentUtterance = null;
    };
    currentUtterance.onerror = () => {
        speaking = false;
        speakChatButton.textContent = 'Speak';
        currentUtterance = null;
    };
    synth.speak(currentUtterance);
}

function stopSpeaking() {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    if (currentSpeechAudio) {
        currentSpeechAudio.pause();
        currentSpeechAudio = null;
    }
    currentUtterance = null;
    speaking = false;
    speakChatButton.textContent = 'Speak';
}

// Add API key management functions
function resetApiKey() {
    localStorage.removeItem('geminiApiKey');
    userApiKey = '';
    genAI = null;
    model = null;
    checkApiKey();
}

// Add this to your HTML or call it from console to reset API key
window.resetGeminiApiKey = resetApiKey;

initWorkoutPlan();
initWorkoutLog();
populateMusicSelector();
if (themeSelectElement) {
    loadTheme();
} else {
    applyTheme('green');
}
loadColorMode(); 
exerciseImage.src = '';
exerciseImage.classList.remove('visible');
exerciseImage.style.display = 'none';
displayPlan();
setView('plan');

document.addEventListener('DOMContentLoaded', () => {
    setupAudio();
    checkApiKey();
});