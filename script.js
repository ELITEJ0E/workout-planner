import confetti from 'canvas-confetti';

const defaultWorkoutPlan = {
    Monday: {
        name: "Chest, Tricep, Shoulder",
        exercises: [
            { name: "Decline Push Up", sets: 4, reps: 20, image: "decline_pushup.jpg", type: 'reps' },
            { name: "Normal Push Up", sets: 4, reps: 15, image: "normal_pushup.png", type: 'reps' },
            { name: "Diamond Push Up", sets: 4, reps: 15, image: "diamond-pushup.gif", type: 'reps' },
            { name: "Incline Push Up", sets: 3, reps: 20, image: "incline-pushup.gif", type: 'reps' },
            { name: "Lateral Raises", sets: 4, reps: 15, image: "lateral-raise.gif", type: 'reps' },
            { name: "Shoulder Press", sets: 3, reps: 15, image: "shoulder-press.gif", type: 'reps' }
        ]
    },
    Tuesday: {
        name: "Back, Biceps",
        exercises: [
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps' },
            { name: "Bicep Curls", sets: 3, reps: 15, image: "bicep_curls.png", type: 'reps' },
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps' },
            { name: "Dumbbell Rows", sets: 3, reps: '15 each', image: "dumbbell_rows.png", type: 'reps' },
            { name: "Chin Ups", sets: 3, reps: 10, image: "chin_ups.png", type: 'reps' },
            { name: "Barbell rows", sets: 3, reps: 15, image: "barbell_rows.png", type: 'reps' },
            { name: "Shrugs", sets: 3, reps: 30, image: "shrugs.png", type: 'reps' }
        ]
    },
    Wednesday: {
        name: "Legs, Abs",
        exercises: [
             { name: "Jumping Jack", sets: 3, duration: 60, image: "jumping_jack.png", type: 'time' },
             { name: "Hanging Knee Raises", sets: 3, reps: 15, image: "hanging_knee_raises.png", type: 'reps' },
             { name: "Jumping Squats", sets: 3, reps: 25, image: "jumping_squats.png", type: 'reps' },
             { name: "Plank", sets: 3, duration: 60, image: "plank.png", type: 'time' },
             { name: "Russian Twist", sets: 3, reps: 50, image: "russian_twist.png", type: 'reps' },
             { name: "Calf Raises", sets: 3, reps: 25, image: "calf_raises.png", type: 'reps' },
             { name: "Crunches", sets: 3, reps: 12, image: "crunches.png", type: 'reps' }
        ]
    },
    Thursday: { name: "Rest Day", exercises: [] },
    Friday: {
        name: "Arm, Shoulder",
        exercises: [
            { name: "Pronation", sets: 3, reps: 10, image: "pronation.png", type: 'reps' },
            { name: "Bicep curls", sets: 3, reps: 15, image: "bicep_curls.png", type: 'reps' },
            { name: "Lateral Raises", sets: 4, reps: 15, image: "lateral_raises.png", type: 'reps' },
            { name: "Shoulder Press", sets: 3, reps: 15, image: "shoulder_press.png", type: 'reps' },
            { name: "Hammer curl", sets: 3, reps: 30, image: "hammer_curl.png", type: 'reps' },
            { name: "Wrist Curl", sets: 3, reps: 20, image: "wrist_curl.png", type: 'reps' }
        ]
    },
    Saturday: {
        name: "Chest, Back",
        exercises: [
            { name: "Pull Ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps' },
            { name: "Decline Push Up", sets: 4, reps: 20, image: "decline_pushup.jpg", type: 'reps' },
            { name: "Pull ups", sets: 3, reps: 10, image: "pullups.png", type: 'reps' },
            { name: "Wide Push Up", sets: 4, reps: 15, image: "wide_pushup.png", type: 'reps' },
            { name: "Incline Push Up", sets: 3, reps: 20, image: "incline_pushup.png", type: 'reps' },
            { name: "Dumbbell Rows", sets: 3, reps: '15 each', image: "dumbbell_rows.png", type: 'reps' },
            { name: "Barbell Rows", sets: 3, reps: 15, image: "barbell_rows.png", type: 'reps' }
        ]
    },
    Sunday: { name: "Rest Day", exercises: [] }
};

let userWorkoutPlan;

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
const bgmToggleButton = document.getElementById('bgm-toggle');
const musicSelectElement = document.getElementById('music-select');
const backToPlanButton = document.getElementById('back-to-plan');
const themeSelectElement = document.getElementById('theme-select');
const editPlanButton = document.getElementById('edit-plan-button');

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

let audioContext;
let bgmSource;
let currentBgmBuffer;
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
let isEditingPlan = false;

const availableBgms = {
    "High Energy Phonk": { path: 'workout_bgm_2.mp3', buffer: null },
    "Bloody Mary Edit": { path: 'bloody_mary_edit.mp3', buffer: null },
    "Motivational Electro": { path: 'background_music.mp3', buffer: null },
    "MONTAGEM TOMADA": { path: 'MONTAGEM TOMADA SLOWED.mp3', buffer: null },
    "Passo Bem Solto": { path: 'PASSO BEM SOLTO (Slowed).mp3', buffer: null }
};

function initWorkoutPlan() {
    const storedPlan = localStorage.getItem('userWorkoutPlan');
    if (storedPlan) {
        try {
            userWorkoutPlan = JSON.parse(storedPlan);
            // Basic validation: check if it has expected days
            if (!userWorkoutPlan.Monday || !userWorkoutPlan.Monday.exercises) {
                throw new Error("Invalid plan structure in localStorage");
            }
        } catch (e) {
            console.error("Failed to parse stored workout plan, using default:", e);
            userWorkoutPlan = JSON.parse(JSON.stringify(defaultWorkoutPlan)); // Deep copy
            saveUserPlan();
        }
    } else {
        userWorkoutPlan = JSON.parse(JSON.stringify(defaultWorkoutPlan)); // Deep copy
        saveUserPlan();
    }
}

function saveUserPlan() {
    if (userWorkoutPlan) {
        localStorage.setItem('userWorkoutPlan', JSON.stringify(userWorkoutPlan));
    }
}

async function setupAudio() {
    if (audioContext) return;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await loadSounds();
}

async function loadSound(filePath) {
    try {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error(`Error loading sound ${filePath}:`, error);
        return null;
    }
}

async function loadSounds() {
    try {
        for (const key in availableBgms) {
            availableBgms[key].buffer = await loadSound(availableBgms[key].path);
        }
        const firstBgmKey = Object.keys(availableBgms)[0];
        if (firstBgmKey) {
            currentBgmBuffer = availableBgms[firstBgmKey].buffer;
        }
        workoutSoundBuffer = await loadSound('workout_start.mp3');
        restSoundBuffer = await loadSound('rest_start.mp3');
    } catch (error) {
        console.error("Error loading sounds:", error);
    }
}

function populateMusicSelector() {
    musicSelectElement.innerHTML = '';
    for (const name in availableBgms) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        musicSelectElement.appendChild(option);
    }
    if (Object.keys(availableBgms).length > 0) {
        musicSelectElement.value = Object.keys(availableBgms)[0];
    }
}

musicSelectElement.addEventListener('change', async (event) => {
    const selectedBgmName = event.target.value;
    if (availableBgms[selectedBgmName]) {
        currentBgmBuffer = availableBgms[selectedBgmName].buffer;
        if (!currentBgmBuffer) {
            await setupAudio();
            currentBgmBuffer = availableBgms[selectedBgmName].buffer;
        }
        if (isBgmPlaying) {
            if (bgmSource) bgmSource.stop();
            playBGM();
        }
    }
});

function playSound(buffer) {
    if (!audioContext || !buffer) return;
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

function toggleBGM() {
    if (!audioContext) {
        setupAudio().then(() => {
            if (currentBgmBuffer) {
                 actuallyToggleBGM();
            } else {
                console.warn("Default BGM not loaded yet.");
            }
        });
        return;
    }
    actuallyToggleBGM();
}

function actuallyToggleBGM() {
    if (isBgmPlaying) {
        if (bgmSource) {
            bgmSource.stop();
        }
        isBgmPlaying = false;
        bgmToggleButton.textContent = 'Play BGM';
    } else {
        if (!currentBgmBuffer) {
            const selectedKey = musicSelectElement.value;
            if (availableBgms[selectedKey] && availableBgms[selectedKey].buffer) {
                currentBgmBuffer = availableBgms[selectedKey].buffer;
            } else {
                console.warn("Selected BGM not loaded yet or invalid selection.");
                return;
            }
        }
       playBGM();
    }
}

function playBGM() {
    if (!audioContext || !currentBgmBuffer) return;
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (bgmSource) {
        bgmSource.stop();
    }
    bgmSource = audioContext.createBufferSource();
    bgmSource.buffer = currentBgmBuffer;
    bgmSource.loop = true;
    bgmSource.connect(audioContext.destination);
    bgmSource.start(0);
    isBgmPlaying = true;
    bgmToggleButton.textContent = 'Pause BGM';
}

bgmToggleButton.addEventListener('click', toggleBGM);

function applyTheme(themeName) {
    document.body.className = '';
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
        if (themeSelectElement) applyTheme(themeSelectElement.value);
    }
}

if (themeSelectElement) {
    themeSelectElement.addEventListener('change', (event) => {
        applyTheme(event.target.value);
    });
}

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

            // Only add start workout button if not in editing mode
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

        // Always add the edit button if in editing mode
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

function setView(viewName) {
    if (viewName === 'plan') {
        document.body.classList.remove('workout-view');
        document.body.classList.add('plan-view');
        planContainer.style.display = 'grid';
        workoutDisplayContainer.style.display = 'block';
        currentExerciseDiv.style.display = 'none';
        backToPlanButton.style.display = 'none';
        editPlanButton.style.display = 'inline-block';
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

    } else if (viewName === 'workout') {
        document.body.classList.remove('plan-view');
        document.body.classList.add('workout-view');
        planContainer.style.display = 'none';
        workoutDisplayContainer.style.display = 'block';
        currentExerciseDiv.style.display = 'block';
        backToPlanButton.style.display = 'inline-block';
        editPlanButton.style.display = 'none'; 
    }
}

function selectDay(dayKey) {
    if (!userWorkoutPlan[dayKey] || !userWorkoutPlan[dayKey].exercises || userWorkoutPlan[dayKey].exercises.length === 0) {
        alert("It's a rest day or no exercises defined! You can edit the plan to add some.");
        return;
    }
    if (!audioContext) {
        setupAudio();
    }

    currentWorkoutDayKey = dayKey;
    currentExerciseIndex = 0;
    currentSet = 1;
    isResting = false;

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
    } else if (exercise.type === 'time') {
        skipTimerButton.style.display = 'inline-block';
        skipTimerButton.disabled = false;
        skipRestButton.style.display = 'none';
    } else {
        skipRestButton.style.display = 'none';
        skipTimerButton.style.display = 'none';
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

    if(isResting) { 
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

    playSound(workoutSoundBuffer); 

    displayExercise();
});

skipTimerButton.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const exercise = userWorkoutPlan[currentWorkoutDayKey].exercises[currentExerciseIndex];
    if (isResting || exercise.type !== 'time') return;

    clearInterval(timerInterval);
    playSound(workoutSoundBuffer); 
    timerDisplay.textContent = "Skipped!";
    skipTimerButton.style.display = 'none';
    skipTimerButton.disabled = true;

    handleSetCompletion();
});

backToPlanButton.addEventListener('click', () => {
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

// --- Edit Plan Logic ---
editPlanButton.addEventListener('click', () => {
    isEditingPlan = !isEditingPlan;
    editPlanButton.textContent = isEditingPlan ? 'Finish Editing' : 'Edit My Plan';
    editPlanButton.classList.toggle('active-editing', isEditingPlan);
    setView('plan'); 
    displayPlan(); 
});

function createExerciseEditRow(exercise = {}, index = -1, dayKey = '') {
    const row = document.createElement('div');
    row.classList.add('exercise-edit-row');
    row.dataset.index = index; 

    row.innerHTML += `
        <div class="form-group">
            <label for="ex-name-${dayKey}-${index}">Exercise Name:</label>
            <input type="text" id="ex-name-${dayKey}-${index}" class="modal-input ex-name" value="${exercise.name || ''}">
        </div>
        <div class="form-group">
            <label for="ex-sets-${dayKey}-${index}">Sets:</label>
            <input type="number" id="ex-sets-${dayKey}-${index}" class="modal-input ex-sets" value="${exercise.sets || 3}" min="1">
        </div>
        <div class="form-group">
            <label for="ex-type-${dayKey}-${index}">Type:</label>
            <select id="ex-type-${dayKey}-${index}" class="modal-select ex-type">
                <option value="reps" ${exercise.type === 'reps' ? 'selected' : ''}>Reps</option>
                <option value="time" ${exercise.type === 'time' ? 'selected' : ''}>Time</option>
            </select>
        </div>
        <div class="form-group" id="ex-reps-group-${dayKey}-${index}" style="display: ${exercise.type === 'time' ? 'none' : 'block'};">
            <label for="ex-reps-${dayKey}-${index}">Reps (e.g., 10 or '10 each'):</label>
            <input type="text" id="ex-reps-${dayKey}-${index}" class="modal-input ex-reps" value="${exercise.reps || ''}">
        </div>
        <div class="form-group" id="ex-duration-group-${dayKey}-${index}" style="display: ${exercise.type === 'reps' || !exercise.type ? 'none' : 'block'};">
            <label for="ex-duration-${dayKey}-${index}">Duration (seconds):</label>
            <input type="number" id="ex-duration-${dayKey}-${index}" class="modal-input ex-duration" value="${exercise.duration || 60}" min="1">
        </div>
        <div class="form-group">
            <label for="ex-image-${dayKey}-${index}">Image Filename (e.g., pullups.png):</label>
            <input type="text" id="ex-image-${dayKey}-${index}" class="modal-input ex-image" value="${exercise.image || ''}">
        </div>
    `;

    const typeSelect = row.querySelector('.ex-type');
    const repsGroup = row.querySelector(`#ex-reps-group-${dayKey}-${index}`);
    const durationGroup = row.querySelector(`#ex-duration-group-${dayKey}-${index}`);

    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'reps') {
            repsGroup.style.display = 'block';
            durationGroup.style.display = 'none';
        } else {
            repsGroup.style.display = 'none';
            durationGroup.style.display = 'block';
        }
    });
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Exercise';
    removeButton.classList.add('modal-button', 'danger');
    removeButton.type = 'button';
    removeButton.addEventListener('click', () => row.remove());
    row.appendChild(removeButton);

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
        } else {
            exercise.duration = parseInt(row.querySelector('.ex-duration').value) || 60; 
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

// Initial Setup
initWorkoutPlan(); 
populateMusicSelector();
if (themeSelectElement) {
    loadTheme();
} else {
    applyTheme('default'); 
}
exerciseImage.src = '';
exerciseImage.classList.remove('visible');
exerciseImage.style.display = 'none';
displayPlan();
setView('plan');