/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */

// variable globale
let startTime = null;
let endTime = null;
let totalTypedCharacters = 0;
let correctTypedCharacters = 0;
let currentWordIndex = 0;
const wordsToType = [];

// Language Translations Object
const translations = {
    en: {
        settings: "Settings",
        theme: "Theme:",
        light: "Light",
        dark: "Dark",
        difficulty: "Difficulty:",
        easy: "Easy",
        medium: "Medium",
        hard: "Difficult",
        language: "Language:",
        english: "English",
        french: "French",
        apply: "Apply",
        typeHere: "Type here...",
        time: "Time:",
        wpm: "WPM:",
        precision: "Accuracy:",
        startTest: "Start the test",
        restart: "Restart",
        wpmResult: "WPM",
        accuracyResult: "Accuracy"
    },
    fr: {
        settings: "Paramètres",
        theme: "Thème :",
        light: "Clair",
        dark: "Sombre",
        difficulty: "Difficulté :",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
        language: "Langue :",
        english: "Anglais",
        french: "Français",
        apply: "Appliquer",
        typeHere: "Tapez ici...",
        time: "Temps :",
        wpm: "MPM :",
        precision: "Précision :",
        startTest: "Démarrer le test",
        restart: "Redémarrer",
        wpmResult: "MPM",
        accuracyResult: "Précision"
    }
};
let currentLanguage = 'en';

// DOM Elements
const settingsButton = document.getElementById("settingsButton");
const settingsIcon = settingsButton.querySelector('i');
const settingsPanel = document.getElementById("settingsPanel");
const themeLabel = settingsPanel.querySelector('label[for="theme"]');
const themeSelectElement = document.getElementById('theme');
const lightOption = themeSelectElement.querySelector('option[value="light"]');
const darkOption = themeSelectElement.querySelector('option[value="dark"]');
const modeLabel = settingsPanel.querySelector('label[for="mode"]');
const modeSelectElement = document.getElementById('mode');
const easyOption = modeSelectElement.querySelector('option[value="easy"]');
const mediumOption = modeSelectElement.querySelector('option[value="medium"]');
const hardOption = modeSelectElement.querySelector('option[value="hard"]');
const languageLabel = settingsPanel.querySelector('label[for="language"]');
const languageSelectElement = document.getElementById('language');
const englishOption = languageSelectElement.querySelector('option[value="en"]');
const frenchOption = languageSelectElement.querySelector('option[value="fr"]');
const applyButton = settingsPanel.querySelector('button');
const inputField = document.getElementById("input-field");
const timeStrong = document.querySelector('.stats p:nth-child(1) strong');
const timeSpan = document.getElementById('time');
const wpmStrong = document.querySelector('.stats p:nth-child(2) strong');
const wpmDisplay = document.getElementById('wpm');
const accuracyStrong = document.querySelector('.stats p:nth-child(3) strong');
const accuracyDisplay = document.getElementById('accuracy');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const results = document.getElementById("results");
const wordDisplay = document.getElementById("word-display");
const body = document.body;
const lightModeVideo = document.getElementById('video1');
const darkModeVideo = document.getElementById('video2');
const logoTitle = document.querySelector('.logo h1');

let timerInterval;
let timeLeft = 60;
let isTesting = false;

function updateContent() {
    const lang = translations[currentLanguage];
    settingsButton.textContent = lang.settings;
    settingsButton.prepend(settingsIcon);
    themeLabel.textContent = lang.theme;
    lightOption.textContent = lang.light;
    darkOption.textContent = lang.dark;
    modeLabel.textContent = lang.difficulty;
    easyOption.textContent = lang.easy;
    mediumOption.textContent = lang.medium;
    hardOption.textContent = lang.hard;
    languageLabel.textContent = lang.language;
    englishOption.textContent = lang.english;
    frenchOption.textContent = lang.french;
    applyButton.textContent = lang.apply;
    inputField.placeholder = lang.typeHere;
    timeStrong.textContent = lang.time;
    wpmStrong.textContent = lang.wpm;
    accuracyStrong.textContent = lang.precision;
    startButton.textContent = lang.startTest;
    restartButton.textContent = lang.restart;
    logoTitle.textContent = "Typing Test";
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endTest();
        }
    }, 1000);
}

function endTest() {
    clearInterval(timerInterval);
    isTesting = false;
    endTime = Date.now();
    if (!startTime) startTime = endTime;

    console.log("--- endTest() appelé ---");
    console.log("currentWordIndex:", currentWordIndex);
    console.log("wordsToType.length:", wordsToType.length);
    console.log("inputField.value.trim():", inputField.value.trim());
    console.log("totalTypedCharacters avant vérification:", totalTypedCharacters);
    console.log("correctTypedCharacters avant vérification:", correctTypedCharacters);

    if (currentWordIndex < wordsToType.length && inputField.value.trim() !== "") {
        const currentElement = wordDisplay.children[currentWordIndex];
        const originalWord = wordsToType[currentWordIndex];
        const typedValue = inputField.value.trim();

        console.log("Mot original:", originalWord);
        console.log("Frappe partielle:", typedValue);

        if (typedValue !== originalWord) {
            console.log("Mot incorrect ou partiel détecté.");
            currentElement.classList.add("incorrect");
            for (let i = 0; i < typedValue.length; i++) {
                const charSpan = document.createElement("span");
                charSpan.textContent = typedValue[i];
                if (i < originalWord.length && typedValue[i] !== originalWord[i]) {
                    charSpan.classList.add("typed-incorrect");
                } else if (i >= originalWord.length) {
                    charSpan.classList.add("typed-incorrect");
                }
                currentElement.querySelector(".typed-text").appendChild(charSpan);
            }
            for (let i = 0; i < Math.max(typedValue.length, originalWord.length); i++) {
                totalTypedCharacters++;
                if (i < typedValue.length && i < originalWord.length && typedValue[i] === originalWord[i]) {
                    correctTypedCharacters++;
                }
            }
        } else if (typedValue === originalWord) {
            console.log("Mot correct détecté (sans espace).");
            currentElement.classList.add("correct");
            for (let i = 0; i < typedValue.length; i++) {
                const charSpan = document.createElement("span");
                charSpan.textContent = typedValue[i];
                charSpan.classList.add("typed-correct");
                currentElement.querySelector(".typed-text").appendChild(charSpan);
            }
            totalTypedCharacters += typedValue.length;
            correctTypedCharacters += typedValue.length;
            currentWordIndex++;
        } else {
            console.log("Début de frappe sans correspondance.");
            for (let i = 0; i < typedValue.length; i++) {
                totalTypedCharacters++;
            }
        }
    }

    console.log("totalTypedCharacters après vérification:", totalTypedCharacters);
    console.log("correctTypedCharacters après vérification:", correctTypedCharacters);

    displayResults();
    inputField.disabled = true;
    startButton.textContent = translations[currentLanguage].restart;
}

function generateWords(count = 50, language = 'en') {
    const frenchWords = ["chose", "fruit", "genre", "selon", "créer", "après", "faire", "voici", "celui", "cette", "notre", "votre", "elles", "avoir", "celles", "faire", "tenir", "aller", "venir", "penser", "savoir", "pouvoir", "vouloir", "désirer"];
    const englishWords = ["about", "quick", "rapid", "brown", "color", "thing", "leaps", "jumps", "above", "idle", "lazy", "hound", "anew", "again"];
    const selected = language === 'fr' ? frenchWords : englishWords;
    wordsToType.length = 0;
    for (let i = 0; i < count; i++) {
        wordsToType.push(selected[Math.floor(Math.random() * selected.length)]);
    }
}

function displayWords() {
    wordDisplay.innerHTML = "";
    wordsToType.forEach((word, index) => {
        const container = document.createElement("div");
        container.classList.add("word-container");
        const typedSpan = document.createElement("span");
        typedSpan.classList.add("typed-text");
        const originalSpan = document.createElement("span");
        originalSpan.classList.add("original-word");
        originalSpan.textContent = word;
        container.appendChild(typedSpan);
        container.appendChild(originalSpan);
        if (index === 0) container.classList.add("current");
        wordDisplay.appendChild(container);
    });
    inputField.focus();
}

function handleInput() {
    if (!isTesting) return;
    const currentElement = wordDisplay.children[currentWordIndex];
    const originalWord = wordsToType[currentWordIndex];
    const typedValue = inputField.value;
    const typedSpan = currentElement.querySelector(".typed-text");
    typedSpan.innerHTML = "";
    correctTypedCharacters = 0;
    totalTypedCharacters = 0;

    for (let i = 0; i < typedValue.length; i++) {
        const charSpan = document.createElement("span");
        charSpan.textContent = typedValue[i];
        if (i < originalWord.length && typedValue[i] === originalWord[i]) {
            charSpan.classList.add("typed-correct");
            correctTypedCharacters++;
        } else {
            charSpan.classList.add("typed-incorrect");
        }
        typedSpan.appendChild(charSpan);
        totalTypedCharacters++;
    }

    if (typedValue.endsWith(" ")) {
        const trimmed = typedValue.trim();
        currentElement.classList.remove("current");
        currentElement.classList.add(trimmed === originalWord ? "correct" : "incorrect");
        inputField.value = "";
        currentWordIndex++;
        if (currentWordIndex < wordsToType.length) {
            wordDisplay.children[currentWordIndex].classList.add("current");
        } else {
            endTest();
        }
    }
    updateWordHighlighting();
}

function updateWordHighlighting() {
    [...wordDisplay.children].forEach(w => w.classList.remove("current", "incorrect"));
    if (currentWordIndex < wordDisplay.children.length) {
        const current = wordDisplay.children[currentWordIndex];
        current.classList.add("current");
        const original = wordsToType[currentWordIndex];
        const typed = inputField.value.trim();
        if (typed && typed !== original) current.classList.add("incorrect");
    }
}

function calculateWPM() {
    if (!startTime || !endTime || wordsToType.length === 0) return 0;
    const seconds = (endTime - startTime) / 1000;
    const minutes = seconds / 60;
    return Math.round(currentWordIndex / minutes);
}

function calculateAccuracy() {
    return totalTypedCharacters === 0 ? 100 : Math.round((correctTypedCharacters / totalTypedCharacters) * 100);
}

function displayResults() {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
    results.textContent = `${translations[currentLanguage].wpmResult}: ${wpm}, ${translations[currentLanguage].accuracyResult}: ${accuracy}%`;
}