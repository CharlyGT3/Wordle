import { WORDS } from './words';
import { keys, $ } from './keys';
import { timerInterval } from './timer'
import { myName } from './eventKey';

const keyboard = document.querySelector(".keyContainer");
const winnersTimes = $("winnersTimes");
const winnersPodium = $("winnersPodium");

let winAudio = $("winAudio");
let letterAudio = $("letterAudio");
let gameOverAudio = $("gameOverAudio");
let finished = false;


let word = WORDS[Math.floor(Math.random() * WORDS.length)]
// console.log(word);
let isWord = "";
let currentRow = 1;
let currentBox = 1;
let values = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
// let noRepeat = [[],[],[],[],[]];
let str = word.split("");
function fTempStr () {
    let tempStr = word.split(""); 
    str = tempStr;
};

function removeItemFromArr(item) {
    var i = str.indexOf(item);
    if (i !== -1) {
        str.splice(i, 1);
    }
}

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement)
});

function handleClick(key) {
    if (key === '«') {
        deleteLetter();
    }
    else if (key === 'ENTER') {
        if (currentBox === 6 && currentRow < 6 && finished === false) {
            isWord = values[currentRow - 1].join("");
            if (isWord === word) {
                checkRow();
                winner();
                finished = true;
            }
            else if (WORDS.includes(isWord)) {
                checkRow();
                nextRow();
                fTempStr();
            }
            else {
                let children = $("row-" + currentRow).children;
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add("not");
                setTimeout(() => children[i].classList.remove("not"), 500);
                }
            }
        }
        if (currentRow === 6 && finished === false) {
            gameOver();
            finished = true;
        }
    }
    else {
        addLetter(key);
    }
};

function addLetter(key) {
    if (currentBox < 6 && currentRow < 6) {
        letterAudio.play();
        const box = $("box-" + currentBox + "-row-" + currentRow);
        box.textContent = key;
        box.classList.add("zoom");
        setTimeout(() => box.classList.remove("zoom"), 250);
        values[currentRow - 1][currentBox - 1] = key;
        currentBox += 1;
    }
};

function deleteLetter() {
    if (currentBox > 1) {
        letterAudio.play();
        currentBox--;
        const box = $("box-" + currentBox + "-row-" + currentRow);
        box.textContent = "";
        values[currentRow - 1][currentBox - 1] = "";
    }
};

function nextRow() {
    currentRow++;
    currentBox = 1;
};

function checkRow() {
    let children = $("row-" + currentRow).children;

    for (let i = 0; i < children.length; i++) {
        let childText = children[i].textContent;

        setTimeout(() => {
            children[i].classList.add("flip");
        }, 150 * [i])

        if (childText === word[i] && str.includes(childText)) {
            children[i].style.backgroundColor = "var(--colorGreen)";
            $(childText).style.backgroundColor = "var(--colorGreen)";
            removeItemFromArr(childText);
            // noRepeat[currentRow-2].push(childText);

        } else if (str.includes(childText)) {
            children[i].style.backgroundColor = "var(--colorYellow)";
            removeItemFromArr(childText);
            // noRepeat[currentRow-2].push(childText);

            if ($(childText).style.backgroundColor !== "var(--colorGreen)") {
                $(childText).style.backgroundColor = "var(--colorYellow)";
            }

        } else {
            children[i].style.backgroundColor = "var(--colorDarkGray)";
            $(childText).style.backgroundColor = "var(--colorDarkGray)";
        }
    }
}

function gameOver() {
    gameOverAudio.play();
    $("gameOver").style.display = "flex";
    clearInterval(timerInterval);
    let time = [];
    if (JSON.parse(localStorage.getItem("bestTime")) !== null) {
        time = JSON.parse(localStorage.getItem("bestTime"));
    }

    winnersPodium.innerHTML += "<div>" + time[0] + " " + "🥇" + "</div>";
    winnersPodium.innerHTML += "<div>" + time[1] + " " + "🥈" + "</div>";
    winnersPodium.innerHTML += "<div>" + time[2] + " " + "🥉" + "</div>";

    $("btnRestartGO").addEventListener("click", function () {
        location.reload();
    });
}

function winner() {
    winAudio.play();
    $("winner").style.display = "flex";
    let myTime = document.querySelector(".menssageContainer");
    let youTimeIs = $("youTime")
    youTimeIs.innerHTML = "your time was" + " " + myTime.textContent;
    BestTime(myTime.textContent + " " + myName);
    clearInterval(timerInterval);
    $("btnRestartW").addEventListener("click", function () {
        location.reload();
    });
}

function BestTime(timer) {
    let time = [];
    if (JSON.parse(localStorage.getItem("bestTime")) !== null) {
        time = JSON.parse(localStorage.getItem("bestTime"));
    }
    time.push(timer);
    time.sort();
    let bestTime = time.slice(0, 3);
    let timeJSON = JSON.stringify(bestTime);
    localStorage.setItem("bestTime", timeJSON);

    winnersTimes.innerHTML += "<div>" + bestTime[0] + " " + "🥇" + "</div>";
    winnersTimes.innerHTML += "<div>" + bestTime[1] + " " + "🥈" + "</div>";
    winnersTimes.innerHTML += "<div>" + bestTime[2] + " " + "🥉" + "</div>";

}