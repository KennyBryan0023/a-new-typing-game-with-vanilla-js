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