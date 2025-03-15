// variables
let sign = "";
let img = "";
let question = "";
let answer = "";
let sound = "";
// let buttonText = "";

// array for each zodiac
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
    }
        //help screen
]

// variables to select the buttons corresponding to each zodiac sign
//allow the user to click on a specific zodiac sign to display its information.
const maskAries = document.querySelector('.aries-button');
const maskTaurus = document.querySelector('.taurus-button');
const maskGemini = document.querySelector('.gemini-button');
const maskCancer = document.querySelector('.cancer-button');
const maskLeo = document.querySelector('.leo-button');
const maskVirgo = document.querySelector('.virgo-button');
const maskLibra = document.querySelector('.libra-button');
const maskScorpio = document.querySelector('.scorpio-button');
const maskSagittarius = document.querySelector('.sagittarius-button');
const maskCapricorn = document.querySelector('.capricorn-button');
const maskAquarius = document.querySelector('.aquarius-button');
const maskPisces = document.querySelector('.pisces-button');

// const maskHelp = document.querySelector('.help-button');

//const maskBackButton = document.getElementById('back');

// get the main container and zodiac container
const mainContainer = document.getElementById('main-container');
const zodiacContainer = document.getElementById('zodiac-container');

// function to reveal the zodiac result
function showZodiacContainer() {
    mainContainer.style.display = 'none'; 
    zodiacContainer.style.display = 'flex';
}

// function to go back to the the main container
function showMainContainer() {
    mainContainer.style.display = 'flex'; // Show the main container
    zodiacContainer.style.display = 'none'; // Hide the zodiac container
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
        error_list.hidden = true;
        error_list.innerHTML = '';
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

// handling audio
let currentAudio = null;

// function to stop sound from playing
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null; // clear the reference
    }
}

// function to play the sound for the corresponding sign
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

    if (zodiac.sound.includes("bubbles3.mp3")) {
        currentAudio.volume = 0.3; // Set a lower volume for this specific audio
    } else {
        currentAudio.volume = 0.7;
    }
}

/**
 * @description
 * Given a month and day, determine the corresponding Zodiac sign.
 * @param {number} month - month of the year (1-12)
 * @param {number} day - day of the month (1-31)
 * @returns {string} the corresponding Zodiac sign
 */

function getZodiac(month, day) {
    let zodiacSign = "";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        zodiacSign = "CAPRICORN"
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

    // find the zodiac sign object that matches the zodiacSign
    let zodiac = zodiac_data.find(z => z.sign === zodiacSign);

    if (zodiac) {
        console.log("Selected Zodiac:", zodiac); // Debugging log
        const displayImage = document.getElementById('zodiac-img');
        console.log("Display Image Element:", displayImage); // Debugging log
        console.log("Setting Image Source:", zodiac.img); // Debugging log

        if (displayImage) {
            displayImage.src = zodiac.img;
            displayImage.alt = zodiac.sign + " fish"; // Ensures accessibility
        }

        const displayQuestion = document.getElementById('question');
        const displayAnswer = document.getElementById('answer');

        displayQuestion.textContent = zodiac.question;
        displayAnswer.textContent = zodiac.answer;

        showZodiacContainer();
        playZodiacSound(zodiacSign);
    }
}


// event listeners for each zodiac sign button 
maskAquarius.addEventListener('click', () => { 
    getZodiac(1, 25);
    console.log('aquarius clicked');
}); 
maskPisces.addEventListener('click', () => getZodiac(2, 19));
maskAries.addEventListener('click', () => getZodiac(3, 21));
maskTaurus.addEventListener('click', () => getZodiac(4, 20));
maskGemini.addEventListener('click', () => getZodiac(5, 21));
maskCancer.addEventListener('click', () => getZodiac(6, 22));
maskLeo.addEventListener('click', () => getZodiac(7, 23));
maskVirgo.addEventListener('click', () => getZodiac(8, 23));
maskLibra.addEventListener('click', () => getZodiac(9, 23));
maskScorpio.addEventListener('click', () => getZodiac(10, 24));
maskSagittarius.addEventListener('click', () => getZodiac(11, 22));
maskCapricorn.addEventListener('click', () => getZodiac(12, 22));

/* event listener for the help button
maskHelp.addEventListener('click', () => {
    let zodiac = zodiac_data[zodiac_data.length - 1];

    // const displaySign = document.querySelector('#zodiac-sign');
    const displayImage = document.querySelector('#zodiac-img');
    const displayQuestion = document.querySelector('#question');
    const displayAnswer = document.querySelector('#answer');
    // const displayButton = document.querySelector('#back');

    displaySign.textContent = zodiac.sign;
    displayImage.src = zodiac.img;
    displayQuestion.textContent = zodiac.question;
    displayAnswer.textContent = zodiac.answer;
    displayButton.textContent = zodiac.buttonText;

    showZodiacContainer();

    playZodiacSound(zodiac.sign);
});*/

// event listener for the back button 
//maskBackButton.addEventListener('click', () =>{
 //   showMainContainer();
  //  stopCurrentAudio();
//});