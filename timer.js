document.addEventListener('DOMContentLoaded', (event) => {
    const timerElement = document.getElementById('timer');
    let interval; // time in seconds 
    //const mElement=document.getElementById('Message');

    window.openTimerOverlay2 = function (overlayId,  startTimer=10) {
        document.getElementById(overlayId).style.display = "block";
        let time = startTimer;
        const updateTimer = () => {

            const minutes = Math.floor(time / 60);
            const seconds = time % 60;

            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            /*if (time>=8)
            {
                mElement.textContent="Hello";
            }
            else{
                mElement.textContent=" ";
            }*/
            if (time >= 0) {
                time--;
            }
            else {
                timerElement.textContent = `${String(0).padStart(2, '0')}:${String(0).padStart(2, '0')}`;
                //mElement.textContent="Goodbye";
                clearInterval(interval);
                alert('Timer Ended');
            }

        };
        interval = setInterval(updateTimer, 1000);
        updateTimer(); // initial call to set the timer display immediately

        window.closeOverlay = function (overlayId) {
            document.getElementById(overlayId).style.display = "none"; 
            clearInterval(interval); // Stop the timer when the overlay is closed 
        };
    };
});