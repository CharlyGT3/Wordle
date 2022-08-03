import { WORDS } from './words';
import { keys, $ } from './keys';
import { timerInterval } from './timer'

const keyboard = document.querySelector(".keyContainer");

let word = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(word);
let isWord = "";
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
            else if (WORDS.includes(isWord)) {
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
        setTimeout(() => {
            children[i].classList.add("flip");

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
        }, 500 * [i])
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