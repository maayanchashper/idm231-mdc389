const zodiac_data = [
    {
        sign: 'ARIES',
        img: 'images/puffer.png',
        question: "What fish species are you?",
        answer: "If you're an Aries then you must be a... drum roll please... puffer fish!",
        sound: "audio/bubbles1.mp3",
    },
    {
        sign: 'TAURUS',
        img: 'images/parrot.png',
        question: "What fish species are you?",
        answer: "If you're a Taurus then you must be a... drum roll please... parrotfish!",
        sound: "audio/bubbles4.mp3",
    },
    {
        sign: 'GEMINI',
        img: 'images/trumpet.png',
        question: "What fish species are you?",
        answer: "If you're a Gemini then you must be a... drum roll please... trumpetfish!",
        sound: "audio/bubbles8.mov",
    },
    {
        sign: 'CANCER',
        img: 'images/lion.png',
        question: "What fish species are you?",
        answer: "If you're a Cancer then you must be a... drum roll please... lion fish!",
        sound: "audio/bubbles12.mov",
    },    
    {
        sign: 'LEO',
        img: 'images/trunk.png',
        question: "What fish species are you?",
        answer: "If you're a Leo then you must be a... drum roll please... trunkfish!",
        sound: "audio/bubbles5.mp3",
    },    
    {
        sign: 'VIRGO',
        img: 'images/drum.png',
        question: "What fish species are you?",
        answer: "If you're a Virgo then you must be a... drum roll please... spotted drum!",
        sound: "audio/bubbles10.mov",
    },    
    {
        sign: 'LIBRA',
        img: 'images/squirrel.png',
        question: "What fish species are you?",
        answer: "If you're a Libra then you must be a... drum roll please... squirrelfish!",
        sound: "audio/bubbles3.mp3",
    },    
    {
        sign: 'SCORPIO',
        img: 'images/tarpon.png',
        question: "What fish species are you?",
        answer: "If you're a Scorpio then you must be a... drum roll please... tarpon!",
        sound: "audio/bubbles2.mp3",
    },    
    {
        sign: 'SAGITTARIUS',
        img: 'images/lizard.png',
        question: "What fish species are you?",
        answer: "If you're a Sagittarius then you must be a... drum roll please... lizard fish!",
        sound: "audio/bubbles11.mov",
    },    
    {
        sign: 'CAPRICORN',
        img: 'images/fairy.png',
        question: "What fish species are you?",
        answer: "If you're a Capricorn then you must be a... drum roll please... fairy basslet!",
        sound: "audio/bubbles6.mov",
    },    
    {
        sign: 'AQUARIUS',
        img: 'images/angel.png',
        question: "What fish species are you?",
        answer: "If you're an Aquarius then you must be a... drum roll please... queen angelfish!",
        sound: "audio/bubbles9.mov",
    },    
    {
        sign: 'PISCES',
        img: 'images/butterfly.png',
        question: "What fish species are you?",
        answer: "If you're a Pisces then you must be a... drum roll please... butterfly fish!",
        sound: "audio/bubbles7.mov",
    },
    {
        sign: 'HELP',
        question: "Have you ever wondered what fish species matches your zodiac sign? If the answer is yes, click your zodiac sign or enter your birthdate to find out!",
    }
]

// variables to select buttons corresponding to each zodiac sign
const ariesButton = document.querySelector('.aries-button');
const taurusButton = document.querySelector('.taurus-button');
const geminiButton = document.querySelector('.gemini-button');
const cancerButton = document.querySelector('.cancer-button');
const leoButton = document.querySelector('.leo-button');
const virgoButton = document.querySelector('.virgo-button');
const libraButton = document.querySelector('.libra-button');
const scorpioButton = document.querySelector('.scorpio-button');
const sagittariusButton = document.querySelector('.sagittarius-button');
const capricornButton = document.querySelector('.capricorn-button');
const aquariusButton = document.querySelector('.aquarius-button');
const piscesButton = document.querySelector('.pisces-button');
const helpButton = document.querySelector('.help-button');
const backButtonInZodiac = document.querySelector('.zodiac-container .back-button');
const backButtonInHelp = document.querySelector('.help .back-button');

// get main container and zodiac container
const mainContainer = document.getElementById('main-container');
const zodiacContainer = document.getElementById('zodiac-container');
const helpContainer = document.getElementById('help-container');


// function to reveal zodiac result
function showZodiacContainer() {
    if (mainContainer)
        mainContainer.style.display = 'none'; 
    if (zodiacContainer)
        zodiacContainer.style.display = 'flex';
}

// function to go back to main container
function showMainContainer() {
    if (mainContainer && zodiacContainer && helpContainer){
        mainContainer.style.display = 'flex'; // Show the main container
        zodiacContainer.style.display = 'none'; // Hide the zodiac container
        helpContainer.style.display = 'none'; 
    }
}

// function to reveal help container
function showHelpContainer() {
    if (mainContainer && helpContainer) {
        mainContainer.style.display = 'none'; 
        helpContainer.style.display = 'flex';
    }
}

// handling the form
const form = document.querySelector('form')
const error_list = document.querySelector('.errors')

function log_birthday(birthday) {
    const date = {
        year: birthday[0],
        month: birthday[1],
        day: birthday[2]
    }
    return date;
}

// get today's date
const today = new Date();

// format it to YYYY-MM-DD (only date part, no time zone issue)
const formattedDate = today.toLocaleDateString('en-CA');  // 'en-CA' format is YYYY-MM-DD

// get the birthday input field and set the max value
const birthdayInput = document.querySelector('input[name="birthday"]');
if (birthdayInput) {
    birthdayInput.setAttribute('max', formattedDate);
}

function handle_submit(event) {
    event.preventDefault();
    const errors = [];

    // Get the birthday value
    const birthdayValue = form.elements['birthday'].value;
    
    // Convert it to a date object
    const selectedDate = new Date(birthdayValue);
    
    // Compare with today's date
    if (selectedDate > today) {
        errors.push("The date cannot be in the future.");
    }

    if (errors.length) {
        errors.forEach((error) => {
            const li = document.createElement('li');
            const text = document.createTextNode(error);

            li.appendChild(text)

            if (error_list) {
                error_list.appendChild(li);
                error_list.hidden = false;
            }
        });
        return false;
    } else {
        if (error_list){
            error_list.hidden = true;
            error_list.innerHTML = '';
        }
    }

    const date_object = log_birthday(form.elements['birthday'].value.split('-'));
    const month = date_object.month;
    const day = date_object.day;

    let z = getZodiac(Number(month), Number(day));  
    showZodiacContainer();  
}

if (form) {
    form.addEventListener('submit', handle_submit);
}

let currentAudio = null;

// function to stop sound from playing
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

// function to play sound for corresponding sign
function playZodiacSound(sign) {
    stopCurrentAudio();

    let zodiac = null;

    for (let i = 0; i < zodiac_data.length; i++) {
        if (zodiac_data[i].sign === sign) {  
            zodiac = zodiac_data[i];
            break;  
        }
    }

    if (zodiac && zodiac.sound) {
        currentAudio = new Audio(zodiac.sound);
        currentAudio.volume = 0.7;
        currentAudio.play(); 
    }

    if (zodiac && zodiac.sound && zodiac.sound.includes("bubbles3.mp3")) {
        currentAudio.volume = 0.3; // Set a lower volume for this audio
    } else {
        currentAudio.volume = 0.7;
    }
}

function getZodiac(month, day) {
    let zodiacSign = "";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        zodiacSign = "CAPRICORN";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        zodiacSign = "SAGITTARIUS";
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
        zodiacSign = "SCORPIO";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
        zodiacSign = "LIBRA";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        zodiacSign = "VIRGO";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        zodiacSign = "LEO";
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
        zodiacSign = "CANCER";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
        zodiacSign = "GEMINI";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        zodiacSign = "TAURUS";
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        zodiacSign = "ARIES";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        zodiacSign = "PISCES";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        zodiacSign = "AQUARIUS";
    } 

    // find zodiac sign object that matches zodiacSign
    let zodiac = zodiac_data.find(z => z.sign === zodiacSign);

    if (zodiac) {
        const displayImage = document.getElementById('zodiac-img');

        if (displayImage) {
            displayImage.src = zodiac.img;
            displayImage.alt = zodiac.sign + " fish"; // Accessibility
        }

        const displayQuestion = document.getElementById('question');
        const displayAnswer = document.getElementById('answer');

        if (displayQuestion && displayAnswer){
            displayQuestion.textContent = zodiac.question;
            displayAnswer.textContent = zodiac.answer;
        }

        showZodiacContainer();
        playZodiacSound(zodiacSign);
    }
}

// event listeners for each zodiac sign button 
if (aquariusButton && piscesButton && ariesButton && taurusButton && geminiButton && cancerButton && leoButton && virgoButton && libraButton && scorpioButton && sagittariusButton && capricornButton){
    aquariusButton.addEventListener('click', () => getZodiac(1, 25)); 
    piscesButton.addEventListener('click', () => getZodiac(2, 19));
    ariesButton.addEventListener('click', () => getZodiac(3, 21));
    taurusButton.addEventListener('click', () => getZodiac(4, 20));
    geminiButton.addEventListener('click', () => getZodiac(5, 21));
    cancerButton.addEventListener('click', () => getZodiac(6, 22));
    leoButton.addEventListener('click', () => getZodiac(7, 23));
    virgoButton.addEventListener('click', () => getZodiac(8, 23));
    libraButton.addEventListener('click', () => getZodiac(9, 23));
    scorpioButton.addEventListener('click', () => getZodiac(10, 24));
    sagittariusButton.addEventListener('click', () => getZodiac(11, 22));
    capricornButton.addEventListener('click', () => getZodiac(12, 22));
}

// event listener for help button
if (helpButton){
    helpButton.addEventListener('click', () => {
        showHelpContainer(); 
    })
}

// Event listener for back button in zodiac container
if (backButtonInZodiac){
    backButtonInZodiac.addEventListener('click', () => {
        stopCurrentAudio();
        showMainContainer();
    });
}

// Event listener for back button in help container
if (backButtonInHelp){
    backButtonInHelp.addEventListener('click', () => {
        stopCurrentAudio();
        showMainContainer();
    });
}