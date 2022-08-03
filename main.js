import { WORDS } from './words';
import { keys } from './keys';

const $ = (elements) => document.getElementById(elements);
const keyboard = document.querySelector(".keyContainer");

const btnStart = $("btnStart");

btnStart.addEventListener("click", () => {
    $("start").style.display = "none";
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case 'Q':
            case 'q':
                $('Q').click()
                break;
            case 'W':
            case 'w':
                $('W').click()
                break;
            case 'E':
            case 'e':
                $('E').click()
                break;
            case 'R':
            case 'r':
                $('R').click()
                break;
            case 'T':
            case 't':
                $('T').click()
                break;
            case 'Y':
            case 'y':
                $('Y').click()
                break;
            case 'U':
            case 'u':
                $('U').click()
                break;
            case 'I':
            case 'i':
                $('I').click()
                break;
            case 'O':
            case 'o':
                $('O').click()
                break;
            case 'P':
            case 'p':
                $('P').click()
                break;
            case 'A':
            case 'a':
                $('A').click()
                break;
            case 'S':
            case 's':
                $('S').click()
                break;
            case 'D':
            case 'd':
                $('D').click()
                break;
            case 'F':
            case 'f':
                $('F').click()
                break;
            case 'G':
            case 'g':
                $('G').click()
                break;
            case 'H':
            case 'h':
                $('H').click()
                break;
            case 'J':
            case 'j':
                $('J').click()
                break;
            case 'K':
            case 'k':
                $('K').click()
                break;
            case 'L':
            case 'l':
                $('L').click()
                break;
            case 'Z':
            case 'z':
                $('Z').click()
                break;
            case 'X':
            case 'x':
                $('X').click()
                break;
            case 'C':
            case 'c':
                $('C').click()
                break;
            case 'V':
            case 'v':
                $('V').click()
                break;
            case 'B':
            case 'b':
                $('B').click()
                break;
            case 'N':
            case 'n':
                $('N').click()
                break;
            case 'M':
            case 'm':
                $('M').click()
                break;
            case 'Enter':
                $('ENTER').click()
                break;
            case 'Backspace':
                $('«').click()
                break;
            default:
                return;
        }
        event.preventDefault();
    }, true);
});

let word = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(word);
// let word = "CASAS"
let isWord = ""
let currentRow = 1;
let currentBox = 1;
let values = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

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
        if (currentBox === 6 && currentRow < 6) {
            isWord = values[currentRow - 1].join("");
            if (isWord === word) {
                checkRow();
                winner();
            }
            else if(WORDS.includes(isWord)){
                checkRow();
                nextRow();
            }
            else {
            }
        }
        if (currentRow === 6) {
            gameOver();
        }
    }
    else {
        addLetter(key);
    }
};

function addLetter(key) {
    if (currentBox < 6 && currentRow < 6) {
        const box = $("box-" + currentBox + "-row-" + currentRow);
        box.textContent = key;
        values[currentRow - 1][currentBox - 1] = key;
        currentBox += 1;
    }
};

function deleteLetter() {
    if (currentBox > 1) {
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

        if (childText === word[i]) {
            children[i].style.backgroundColor = "green";
            $(childText).style.backgroundColor = "green";

        } else if (word.includes(childText)) {
            children[i].style.backgroundColor = "yellow";

            if ($(childText).style.backgroundColor !== "green") {
                $(childText).style.backgroundColor = "yellow";
            }

        } else {
            children[i].style.backgroundColor = "gray";
        }
    }
}

function gameOver() {
    $("gameOver").style.display = "flex";
    clearInterval(timerInterval);
    $("btnRestartGO").addEventListener("click", function () {
        location.reload();
    });
}

function winner() {
    $("winner").style.display = "flex";
    let myTime = document.querySelector(".menssageContainer");
    let youTimeIs = $("youTime")
    youTimeIs.innerHTML = "your time was" + " " + myTime.textContent;
    clearInterval(timerInterval);
    $("btnRestartW").addEventListener("click", function () {
        location.reload();
    });
}