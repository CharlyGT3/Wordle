import { $ } from './keys';
import { startTimer } from './timer'

export let myName = "";
const btnStart = $("btnStart");
const name = $("name");

btnStart.addEventListener("click", () => {
    if (name.value !== "") {
        myName = name.value;
        startTimer();
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
                case 'Ñ':
                case 'ñ':
                    $('Ñ').click()
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
    }
});