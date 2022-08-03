const timer = document.querySelector(".menssageContainer");
export let timerInterval;

export const startTimer = () => {
    clearInterval(timerInterval);
    let second = 0,
        minute = 0,
        hour = 0;

    timerInterval = setInterval(function () {
        timer.innerHTML =
            (hour ? hour + ":" : "") +
            (minute < 10 ? "0" + minute : minute) +
            ":" +
            (second < 10 ? "0" + second : second);

        second++;

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};