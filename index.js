import { generateSymbol } from 'symbol-generator';
import { questions, getDiagnosis, beliefs } from 'questions';

// DOM Elements
const generatorSection = document.getElementById('generator-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const ritualSection = document.getElementById('ritual-section');
const reprogrammerContainer = document.getElementById('reprogrammer-container');

const dataForm = document.getElementById('data-form');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress-bar');
const restartBtn = document.getElementById('restart-btn');
const startRitualBtn = document.getElementById('start-ritual-btn');

// App State
let userData = {};
let currentQuestionIndex = 0;
let userAnswers = [];
let currentRitualStep = 0;
let ritualInterval;
let selectedBeliefs = new Set();

// Event Listeners
dataForm.addEventListener('submit', handleDataFormSubmit);
restartBtn.addEventListener('click', handleRestart);
startRitualBtn.addEventListener('click', startRitual);

function handleDataFormSubmit(e) {
    e.preventDefault();
    userData = {
        name: document.getElementById('fullName').value,
        dob: document.getElementById('birthDate').value,
        word: document.getElementById('favoriteWord').value,
        number: document.getElementById('powerNumber').value,
    };

    generatorSection.classList.add('d-none');
    quizSection.classList.remove('d-none');
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answersContainer.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.category);
        answersContainer.appendChild(button);
    });

    updateProgress();
}

function selectAnswer(category) {
    userAnswers.push(category);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function finishQuiz() {
    quizSection.classList.add('d-none');
    resultSection.classList.remove('d-none');
    generateResults();
}

function generateResults() {
    // 1. Generate Wealth Name
    const nameParts = userData.name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const wealthName = `${userData.word} ${firstNameInitial}${userData.number}`;
    document.getElementById('wealth-name').textContent = wealthName;

    // 2. Generate Symbol
    const canvas = document.getElementById('symbol-canvas');
    generateSymbol(canvas, userData);

    // 3. Generate Diagnosis
    const diagnosis = getDiagnosis(userAnswers);
    document.getElementById('diagnosis-text').textContent = diagnosis.text;
    document.getElementById('affirmation-text').textContent = diagnosis.affirmation;
}

function handleRestart() {
    resultSection.classList.add('d-none');
    ritualSection.classList.add('d-none');
    reprogrammerContainer.innerHTML = '';
    generatorSection.classList.remove('d-none');
    dataForm.reset();
    progressBar.style.width = '0%';
    if(ritualInterval) clearInterval(ritualInterval);
}

// --- RITUAL LOGIC ---

const affirmations = [
    "I am worthy of the wealth I desire.",
    "My energy is a magnet for financial abundance and prosperity.",
    "I release all resistance to receiving money.",
    "I am open to the limitless flow of abundance in the universe.",
    "My wealth expands with joy and ease.",
    "I honor my sacred wealth symbol as a key to my potential.",
    "Every day, I am attracting more opportunities for financial growth.",
    "I manage my wealth with wisdom and grace.",
    "My financial success benefits myself and others.",
    "I am in perfect harmony with the frequency of money."
];

function startRitual() {
    resultSection.classList.add('d-none');
    ritualSection.classList.remove('d-none');
    currentRitualStep = 0;
    showRitualStep();
}

function navigateRitual(direction) {
    currentRitualStep += direction;
    if (ritualInterval) {
        clearInterval(ritualInterval);
        ritualInterval = null;
    }
    showRitualStep();
}

function showRitualStep() {
    const contentEl = document.getElementById('ritual-content');
    reprogrammerContainer.innerHTML = ''; // Clear reprogrammer content
    let content = '';

    const navigation = `
        <div class="d-flex justify-content-between mt-5">
            ${currentRitualStep > 0 ? `<button class="btn btn-secondary" onclick="window.ritual.navigate(-1)">Previous</button>` : '<div></div>'}
            ${currentRitualStep < 5 ? `<button class="btn btn-primary" onclick="window.ritual.navigate(1)">Next</button>` : ''}
        </div>
    `;

    switch (currentRitualStep) {
        case 0: // Introduction
            content = `
                <h2>Welcome to Your Activation Ritual</h2>
                <p class="lead mt-3">This guided ritual will help you align your energy with your new Wealth Profile.</p>
                <p class="text-muted">You will be guided through sacred breathing, chakra activation, and powerful affirmations. Find a quiet space and begin when you are ready.</p>
            `;
            break;
        case 1: // Breathing
            content = `
                <h2>Step 1: Sacred Breathing</h2>
                <p>Follow the guide to harmonize your energy. This is the Codex Operando Deus method: Inhale for 4s, Hold for 4s, Exhale for 8s.</p>
                <div id="breathing-circle" class="breathing-circle">
                    <span id="breathing-text" class="breathing-text">Get Ready...</span>
                </div>
            `;
            setTimeout(runBreathingAnimation, 500);
            break;
        case 2: // Chakras
            content = `
                <h2>Step 2: Money Chakra Activation</h2>
                <p>Visualize golden light activating your key wealth centers as they appear on the diagram.</p>
                <div class="chakra-container">
                    <img src="body-chakras.png" alt="Meditating figure" class="chakra-img">
                    <div id="chakra-root" class="chakra-dot"></div>
                    <div id="chakra-sacral" class="chakra-dot"></div>
                    <div id="chakra-solar" class="chakra-dot"></div>
                </div>
            `;
            setTimeout(runChakraAnimation, 500);
            break;
        case 3: // Affirmations
            content = `
                <h2>Step 3: Ritual Affirmations</h2>
                <p>Read each affirmation aloud or silently. Feel its truth resonate within you.</p>
                <div id="affirmation-container" class="affirmation-container">
                    <h3 id="affirmation-text-ritual"></h3>
                </div>
            `;
            setTimeout(runAffirmations, 500);
            break;
        case 4: // Belief Reprogrammer
            content = `
                <h2>Step 4: Belief Reprogrammer</h2>
                <p>Select up to 10 limiting beliefs below that you feel hold you back.</p>
                <p class="text-muted" id="belief-counter">0/10 selected</p>
                <div id="belief-selection-list" class="belief-list">
                    <!-- Beliefs will be injected here -->
                </div>
                <div class="mt-4">
                    <button id="reprogram-btn" class="btn btn-primary" disabled>Reprogram Selected Beliefs</button>
                </div>
            `;
            setTimeout(setupBeliefReprogrammer, 100);
            break;
        case 5: // Completion
             content = `
                <h2>Ritual Complete</h2>
                <p class="lead mt-3">Your energy is now harmonized with your Wealth Profile.</p>
                <p>Carry this activated energy with you. Revisit your symbol and affirmations daily to strengthen your connection to abundance.</p>
                <div class="mt-5">
                    <button class="btn btn-primary btn-lg" onclick="window.ritual.restart()">Start Over</button>
                </div>
            `;
            break;
    }

    contentEl.innerHTML = content + (currentRitualStep < 5 ? navigation : '');
}

function runBreathingAnimation() {
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    if (!circle || !text) return;

    const sequence = [
        { state: 'inhale', text: 'Inhale...', duration: 4000 },
        { state: 'hold', text: 'Hold', duration: 4000 },
        { state: 'exhale', text: 'Exhale...', duration: 8000 }
    ];
    let currentIndex = 0;

    function nextStep() {
        const current = sequence[currentIndex];
        circle.className = `breathing-circle ${current.state}`;
        text.textContent = current.text;
        currentIndex = (currentIndex + 1) % sequence.length;
    }

    nextStep();
    ritualInterval = setInterval(nextStep, sequence[currentIndex].duration); // Start with first duration
    //This is tricky. We need to update interval time.
    clearInterval(ritualInterval);
    const runSequence = () => {
        const current = sequence[currentIndex];
        circle.className = `breathing-circle ${current.state}`;
        text.textContent = current.text;
        ritualInterval = setTimeout(() => {
            currentIndex = (currentIndex + 1) % sequence.length;
            runSequence();
        }, current.duration);
    };
    runSequence();
}

function runChakraAnimation() {
    const chakras = ['chakra-root', 'chakra-sacral', 'chakra-solar'];
    let i = 0;
    ritualInterval = setInterval(() => {
        if (i < chakras.length) {
            document.getElementById(chakras[i]).classList.add('active');
            i++;
        } else {
            clearInterval(ritualInterval);
        }
    }, 2000);
}

function runAffirmations() {
    const container = document.getElementById('affirmation-container');
    const textEl = document.getElementById('affirmation-text-ritual');
    if(!container || !textEl) return;
    let i = 0;

    function showNextAffirmation() {
        container.classList.remove('visible');
        setTimeout(() => {
            if (i < affirmations.length) {
                textEl.textContent = affirmations[i];
                container.classList.add('visible');
                i++;
            } else {
                 textEl.textContent = "Focus on this final thought.";
                 container.classList.add('visible');
                 clearInterval(ritualInterval);
            }
        }, 1000); // Time to fade out
    }
    
    showNextAffirmation();
    ritualInterval = setInterval(showNextAffirmation, 5000);
}

// --- BELIEF REPROGRAMMER LOGIC ---

function setupBeliefReprogrammer() {
    const listEl = document.getElementById('belief-selection-list');
    const counterEl = document.getElementById('belief-counter');
    const reprogramBtn = document.getElementById('reprogram-btn');

    listEl.innerHTML = '';
    selectedBeliefs.clear(); // Clear previous selections

    beliefs.forEach(belief => {
        const item = document.createElement('div');
        item.className = 'belief-item';
        item.textContent = belief.limiting;
        item.dataset.id = belief.id;
        item.onclick = () => toggleBeliefSelection(belief.id);
        listEl.appendChild(item);
    });
    
    reprogramBtn.onclick = runReprogrammingAnimation;
    updateBeliefCounter();
}

function toggleBeliefSelection(beliefId) {
    const item = document.querySelector(`.belief-item[data-id="${beliefId}"]`);
    if (selectedBeliefs.has(beliefId)) {
        selectedBeliefs.delete(beliefId);
        item.classList.remove('selected');
    } else {
        if (selectedBeliefs.size < 10) {
            selectedBeliefs.add(beliefId);
            item.classList.add('selected');
        } else {
            // Optional: feedback that limit is reached
            const listEl = document.getElementById('belief-selection-list');
            listEl.classList.add('shake');
            setTimeout(() => listEl.classList.remove('shake'), 500);
        }
    }
    updateBeliefCounter();
}

function updateBeliefCounter() {
    const counterEl = document.getElementById('belief-counter');
    const reprogramBtn = document.getElementById('reprogram-btn');
    counterEl.textContent = `${selectedBeliefs.size}/10 selected`;
    reprogramBtn.disabled = selectedBeliefs.size === 0;
}

function runReprogrammingAnimation() {
    const contentEl = document.getElementById('ritual-content');
    contentEl.innerHTML = `
        <h2>Reprogramming Beliefs...</h2>
        <p>Witness the transformation of your old beliefs into new, empowering truths.</p>
    `;
    
    const container = document.getElementById('reprogrammer-container');
    container.innerHTML = ''; // Clear previous content

    const beliefsToReprogram = beliefs.filter(b => selectedBeliefs.has(b.id));
    let i = 0;

    function showNextReprogram() {
        if (i < beliefsToReprogram.length) {
            const belief = beliefsToReprogram[i];
            
            const reprogramBox = document.createElement('div');
            reprogramBox.className = 'reprogram-box';
            reprogramBox.innerHTML = `<p class="limiting-belief">${belief.limiting}</p>`;
            container.appendChild(reprogramBox);
            
            setTimeout(() => {
                reprogramBox.classList.add('active');
                reprogramBox.innerHTML = `
                    <p class="limiting-belief faded">${belief.limiting}</p>
                    <p class="empowering-belief">${belief.empowering}</p>
                `;
            }, 2000);

            i++;
            setTimeout(showNextReprogram, 4000); // Stagger animations
        } else {
             setTimeout(() => {
                contentEl.innerHTML = `
                    <h2>Reprogramming Complete</h2>
                    <p>Your new beliefs are now being integrated into your energetic field.</p>
                `;
            }, 2000);
        }
    }
    
    showNextReprogram();
}

// Expose functions to global scope for onclick attributes
window.ritual = {
    navigate: navigateRitual,
    restart: handleRestart
};