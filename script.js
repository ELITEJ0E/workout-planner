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
    backToPlanButton.style.display = 'none'; 

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
        viewProfileButton.style.display = 'inline-block';
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


aiChatToggle.addEventListener('click', () => {
    aiChatbotModal.style.display = 'flex';
    chatInput.focus();
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
            recognition.interimResults = true; // Enable interim results for typing effect
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                voiceInputButton.style.backgroundColor = 'var(--accent-color-hover)'; 
                voiceInputButton.textContent = '🔴';
                chatInput.placeholder = "Listening...";
                sendChatButton.disabled = true;
                speakChatButton.disabled = true;
                stopSpeaking(); // Stop speaking if AI is talking
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
                chatInput.value = finalTranscript || interimTranscript; // Show final or interim
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                chatInput.placeholder = "Error, try again or type...";
                voiceInputButton.style.backgroundColor = 'var(--accent-color)';
                voiceInputButton.textContent = '🎤';
                sendChatButton.disabled = false;
                speakChatButton.disabled = false;
                stopVoiceInput();
            };

            recognition.onend = () => {
                voiceInputButton.style.backgroundColor = 'var(--accent-color)';
                voiceInputButton.textContent = '🎤';
                chatInput.placeholder = "Ask me anything about your workout or music!";
                sendChatButton.disabled = false;
                speakChatButton.disabled = false;
                if (chatInput.value.trim() !== '') { // If there's content, send it
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
        chatInput.placeholder = "Ask me anything about your workout or music!";
    }
}

function appendMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.innerHTML = message.replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
    chatHistoryDiv.appendChild(messageElement);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight; 
}

const workoutDayKeywords = {
    "monday": "Monday", "tuesday": "Tuesday", "wednesday": "Wednesday",
    "thursday": "Thursday", "friday": "Friday", "saturday": "Saturday", "sunday": "Sunday"
};

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage, 'user-message');
    chatInput.value = '';
    sendChatButton.disabled = true;
    speakChatButton.disabled = true;
    stopSpeaking();
    stopVoiceInput(); 

    conversationHistory.push({ role: "user", content: userMessage.toLowerCase() });

    const reply = generateRuleBasedReply(userMessage.toLowerCase());

    appendMessage("Nova", reply, 'bot-message');
    await speakText(reply);

    sendChatButton.disabled = false;
    speakChatButton.disabled = false;
}

function generateRuleBasedReply(msg) {
    if (msg.includes("play music") || msg.includes("play")) {
        playPauseBGMHandler(); 
        return "Energizing sounds coming right up! Playing your music now.";
    }
    if (msg.includes("pause music") || msg.includes("pause")) {
        playPauseBGMHandler(); 
        return "Music paused. Take a breather if you need!";
    }
    if (msg.includes("next song") || msg.includes("current song")) {
        playNextBGM();
        return "Skipping to the next track! Hope you enjoy this one.";
    }
    if (msg.includes("previous song") || msg.includes("previous")) {
        playPreviousBGM();
        return "Back to the previous song. Let's find that perfect beat!";
    }
    if (msg.includes("what's playing") || msg.includes("current song")) {
        const title = titleElement.textContent;
        const artist = artistElement.textContent;
        if (title && title !== "Song Title") return `Currently playing: ***${title}*** by ***${artist}***. A great vibe!`;
        return "Looks like no music is playing right now. Want me to start something?";
    }

    if (msg.includes("start workout")) {
        let foundDay = null;
        for (const keyword in workoutDayKeywords) {
            if (msg.includes(keyword)) {
                foundDay = workoutDayKeywords[keyword];
                break;
            }
        }
        if (foundDay) {
            if (userWorkoutPlan[foundDay] && userWorkoutPlan[foundDay].exercises.length > 0) {
                selectDay(foundDay);
                return `Absolutely! Starting your ***${foundDay}*** workout now. Let's get moving!`;
            } else {
                return `I'm sorry, ***${foundDay}*** seems to be a rest day or has no exercises defined. Would you like to pick another day or ***edit your plan***?`;
            }
        } else {
            return "Which day's workout would you like to start? For example, 'start Monday workout'.";
        }
    }
    if (msg.includes("next exercise") || msg.includes("next set")) {
        if (currentWorkoutDayKey) {
            handleSetCompletion(); 
            return "Alright, moving to the next exercise. You're doing great!";
        } else {
            return "There isn't an active workout to move to the next exercise. Please start a workout first!";
        }
    }
    if (msg.includes("skip rest")) {
        if (isResting) {
            skipRestButton.click(); 
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
        viewProfileButton.click();
        return "Alright, let's take a look at your progress! Keep crushing those goals.";
    }
    if (msg.includes("edit plan")) {
        editPlanButton.click();
        return "Opening the workout plan editor. You can customize your routine here!";
    }
    if (msg.includes("what day is it") || msg.includes("what workout today")) {
        const today = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayKey = days[today.getDay()];
        const workoutForToday = userWorkoutPlan[todayKey];
        if (workoutForToday && workoutForToday.exercises.length > 0) {
            return `Today is ***${todayKey}***, and your plan is ***${workoutForToday.name}***. Are you ready to tackle it?`;
        } else {
            return `Today is ***${todayKey}***, which is a rest day for you. Enjoy your recovery!`;
        }
    }
    if (msg.includes("what exercise is next") && currentWorkoutDayKey) {
        const exercises = userWorkoutPlan[currentWorkoutDayKey].exercises;
        if (currentExerciseIndex < exercises.length) {
            const nextExercise = exercises[currentExerciseIndex];
            let details = `${nextExercise.sets} sets x ${nextExercise.reps ? nextExercise.reps + ' reps' : nextExercise.duration + ' seconds'}`;
            return `Up next is ***${nextExercise.name}*** for ${details}. You got this!`;
        } else {
            return "You've completed all exercises for today! Great job!";
        }
    }
    if (msg.includes("calories burned") || msg.includes("how many calories have i burned")) {
        if (workoutCaloriesBurned > 0) {
            return `So far in this workout, you've burned approximately ***${workoutCaloriesBurned.toFixed(0)} calories***! Amazing effort!`;
        } else {
            return "You haven't started a workout yet, so no calories burned to report. Let's get going!";
        }
    }
    if (msg.includes("how to warm up")) {
        return "A good warm-up should prepare your muscles for activity and increase your heart rate gradually. Try 5-10 minutes of light cardio like jogging in place, jumping jacks, or dynamic stretches such as arm circles and leg swings!";
    }
    if (msg.includes("importance of cool down")) {
        return "Cooling down helps your body recover, gradually bringing your heart rate back to normal and preventing blood pooling. It also improves flexibility and reduces muscle soreness. Always finish with 5-10 minutes of static stretches!";
    }
    if (msg.includes("best time to workout")) {
        return "The best time to work out is when it works best for YOU and your schedule! Consistency is more important than the specific time of day. Find a time you can stick to and that makes you feel energized.";
    }
    if (msg.includes("what to eat before workout")) {
        return "Before a workout, aim for easily digestible carbohydrates to fuel your body, like a banana, oatmeal, or whole-wheat toast. A little protein can also be good, such as a handful of nuts or some Greek yogurt.";
    }
    if (msg.includes("how to stay motivated")) {
        return "Motivation can be tricky! Try setting small, achievable goals, finding a workout buddy, trying new exercises to keep things fresh, rewarding yourself, and remembering why you started your fitness journey!";
    }
    if (msg.includes("what is hiit")) {
        return "HIIT stands for ***High-Intensity Interval Training***. It involves short bursts of intense exercise followed by brief recovery periods. It's super effective for burning calories and improving cardiovascular fitness!";
    }
    if (msg.includes("why is stretching important")) {
        return "Stretching is vital for flexibility, preventing injuries, improving range of motion, and reducing muscle stiffness. Incorporate both dynamic stretches before workouts and static stretches after workouts.";
    }
    if (msg.includes("how much water should i drink")) {
        return "General guidelines suggest about 8 glasses (around 2 liters) of water per day, but this can increase significantly with exercise. Listen to your body and drink when thirsty, and especially before, during, and after workouts!";
    }
    if (msg.includes("healthy breakfast ideas")) {
        return "For a healthy breakfast, consider options like oatmeal with berries, Greek yogurt with fruit and nuts, scrambled eggs with spinach, or a whole-grain toast with avocado. Balanced nutrition is key!";
    }
    if (msg.includes("how to improve strength")) {
        return "To improve strength, focus on resistance training with proper form. Gradually increase the weight or resistance, ensure adequate protein intake, and prioritize rest and recovery to allow your muscles to rebuild stronger.";
    }
    if (msg.includes("benefits of strength training")) {
        return "Strength training offers many benefits! It includes increased muscle mass, stronger bones, improved metabolism, better posture, reduced risk of injury, and enhanced overall functional fitness!";
    }
    if (msg.includes("cardio vs strength training")) {
        return "Both cardio and strength training are important! Cardio improves heart health and endurance, while strength training builds muscle and bone density. A balanced routine includes both for overall fitness!";
    }
    if (msg.includes("nutrition tips")) {
        return "Focus on whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains. Limit sugary drinks and processed snacks. Listen to your body's hunger cues and stay hydrated!";
    }

    if (msg.includes("hi") || msg.includes("hello")) return "Hi there! I'm Nova, your AI fitness buddy. Ready to start sweating?";
    if (msg.includes("how are you")) return "I'm always energized and ready to help! How about you?";
    if (msg.includes("thank you") || msg.includes("thanks")) return "You're very welcome! Keep up the great work!";
    if (msg.includes("bye") || msg.includes("goodbye")) return "See you next time! Stay active and healthy!";
    if (msg.includes("help") || msg.includes("what can you do")) return "I can help you start a workout, control your music, track your progress, give fitness tips, and more! Just ask.";
    if (msg.includes("who are you")) return "I'm Nova — your friendly, beautiful, and knowledgeable AI workout assistant 🤖💚. Here to support your fitness journey!";

    if (msg.includes("how many calories") || msg.includes("burn calories"))
        return "The number of calories burned varies greatly by exercise type, intensity, and individual factors. For example, a 30-minute high-intensity interval training (HIIT) session can burn significantly more than a 30-minute walk. Generally, activities that get your heart rate up and involve more muscles will burn more!";
    if (msg.includes("protein") || msg.includes("post workout nutrition"))
        return "Protein is crucial for muscle repair and growth after a workout. Aim for a lean protein source like chicken, fish, eggs, or a protein shake, ideally within 30-60 minutes post-exercise. It helps your muscles recover faster and get stronger!";
    if (msg.includes("hydration") || msg.includes("drink water"))
        return "Staying hydrated is super important for your workout performance and overall health! Drink water before, during, and after exercise to replenish fluids lost through sweat. Don't wait until you're thirsty!";
    if (msg.includes("warmup") || msg.includes("warm up"))
        return "A good warm-up prepares your muscles and cardiovascular system for exercise. It reduces injury risk and improves performance. Start with 5-10 minutes of light cardio like jogging or jumping jacks, followed by dynamic stretches relevant to your workout!";
    if (msg.includes("cooldown") || msg.includes("cool down"))
        return "Cooling down after a workout helps your heart rate return to normal gradually and improves flexibility. Finish with 5-10 minutes of light cardio and static stretches, holding each stretch for 20-30 seconds!";
    if (msg.includes("consistency"))
        return "Consistency is truly key in fitness! Regular workouts, even short ones, yield better results over time than infrequent, intense sessions. Find a routine you enjoy and stick to it!";
    if (msg.includes("muscle growth") || msg.includes("build muscle"))
        return "To build muscle, focus on progressive overload (gradually increasing weight, reps, or sets), adequate protein intake, and sufficient rest. Listen to your body and give muscles time to recover!";
    if (msg.includes("lose weight") || msg.includes("weight loss"))
        return "For weight loss, a combination of regular exercise and a balanced diet with a calorie deficit is most effective. Focus on whole foods, limit processed items, and stay active!";
    if (msg.includes("benefits of exercise"))
        return "Regular exercise has incredible benefits! It improves mood, boosts energy, helps with weight management, strengthens your heart and bones, and reduces the risk of many chronic diseases. It's a true investment in yourself!";
    if (msg.includes("rest days"))
        return "Rest days are vital! They allow your muscles to recover, repair, and grow stronger. They also prevent overtraining and burnout. Don't skip them – think of them as active recovery for your body!";

    return "I'm not sure how to respond to that, but I'm always learning! Try asking me about your workout, music, or general fitness tips 🎵. Or ask me to ***start workout Monday***, ***next exercise***, or ***play music***.";
}

let synth = window.speechSynthesis || null;
let currentUtterance = null;

/**
 * Speak text using AI-generated TTS powered by websim.textToSpeech,
 * using "en-female" voice and "aura-latest" model for a natural, slightly slower speaking rate.
 * The response is also robust to rate-limiting/fallback to SpeechSynthesis as before.
 * @param {string} text
 */
async function speakText(text) {
    stopSpeaking();
    speaking = true;
    speakChatButton.textContent = 'Stop Speaking';

    // Use websim.textToSpeech with requested settings (voice: "en-female", model: "aura-latest")
    try {
        // Prefer AI voice if available
        const ttsResult = await websim.textToSpeech({
            text: text,
            voice: "en-female",
            model: "aura-latest"
        });

        if (currentSpeechAudio) {
            currentSpeechAudio.pause();
            currentSpeechAudio = null;
        }
        currentSpeechAudio = new Audio(ttsResult.url);
        currentSpeechAudio.playbackRate = 0.94; // slightly slower than normal

        currentSpeechAudio.onended = () => {
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
        };
        currentSpeechAudio.onerror = () => {
            speaking = false;
            speakChatButton.textContent = 'Speak';
            currentSpeechAudio = null;
        };

        await currentSpeechAudio.play();
        // no-op: will finish onended
    } catch (e) {
        // fallback to browser TTS if network/AI fails
        if (window.speechSynthesis) {
            let synth = window.speechSynthesis;
            let voices = synth.getVoices();
            if (!voices.length) {
                await new Promise(res => {
                    const timer = setInterval(() => {
                        voices = synth.getVoices();
                        if (voices.length > 0) {
                            clearInterval(timer);
                            res();
                        }
                    }, 20);
                });
            }

            // Pick the highest-quality en-US female fast voice
            let selectedVoice =
                voices.find(v => /Google US English/.test(v.name)) ||
                voices.find(v => /en-US/.test(v.lang) && /female/i.test(v.name)) ||
                voices.find(v => /en-US/.test(v.lang)) ||
                voices.find(v => v.lang.startsWith('en'));

            currentUtterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) currentUtterance.voice = selectedVoice;
            currentUtterance.lang = selectedVoice?.lang || 'en-US';

            currentUtterance.rate = 0.93; // Slower than before (was 1.35)
            currentUtterance.pitch = 1.07;

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
        } else {
            // Fallback: just display in chat
            speaking = false;
            speakChatButton.textContent = 'Speak';
        }
    }
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
});