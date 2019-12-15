const clockContainer = document.querySelector(".clockContainer");
const clock = clockContainer.querySelector(".clock");

function paintClock() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    // const secd = now.getSeconds();
    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
    //:${secd < 10 ? `0${secd}` : secd}
}

function init() {
    setInterval(function() {
        paintClock();
    }, 1000);
}

init();
