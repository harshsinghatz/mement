type PomodoroParams = {
    progressCircle: HTMLCanvasElement,
    timerText: HTMLDivElement,
    workDurationInput: HTMLInputElement,
    breakDurationInput: HTMLInputElement,
    startButton: HTMLButtonElement,
    resetButton: HTMLButtonElement,
}

function renderPomodoro({
    progressCircle,
    timerText,
    workDurationInput,
    breakDurationInput,
    startButton,
    resetButton, }: PomodoroParams) {

    let duration = 25 * 60; // Default work duration: 25 minutes
    let timeLeft = duration;
    let isRunning = false;
    let interval: NodeJS.Timer;
    console.log("Hello therererere")

    function startTimer() {
        isRunning = true;
        if (!startButton || !resetButton) return;
        startButton.disabled = true;
        resetButton.disabled = false;
        const endTime = Date.now() + timeLeft * 1000;

        interval = setInterval(() => {
            timeLeft = Math.max(0, Math.round((endTime - Date.now()) / 1000));
            updateTimerDisplay();

            if (timeLeft === 0) {
                clearInterval(interval);
                isRunning = false;
                startButton.disabled = false;
                resetButton.disabled = true;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(interval);
        isRunning = false;
        timeLeft = duration;
        updateTimerDisplay();
        startButton.disabled = false;
        resetButton.disabled = true;
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        const text = `${minutes}:${seconds}`;
        const progress = 628 - (timeLeft / duration) * 628; // 628 is the circumference of the circle (2 * PI * radius)

        if (!timerText || !progressCircle) {
            return;
        }
        timerText.textContent = text;
        progressCircle.style.strokeDashoffset = progress.toString();
    }

    function updateTimerSettings() {
        duration = parseInt(workDurationInput?.value, 10) * 60;
        timeLeft = duration;
        updateTimerDisplay();
        if (!isRunning) {
            startButton.disabled = false;
        }
    }

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
    workDurationInput.addEventListener('change', updateTimerSettings);


    function modalLogic() {
        const openModalBtn = document.getElementById("openModalBtn") as HTMLButtonElement;
        const modal = document.getElementById("modal") as HTMLDivElement;
        const closeModalBtn = document.getElementsByClassName("close")[0];
        const applyChangesBtn = document.getElementById("applyChangesBtn") as HTMLButtonElement;

        openModalBtn.addEventListener("click", function () {
            console.log("modal: ", modal);
            modal.style.display = "block";
        });

        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        applyChangesBtn.addEventListener("click", function () {
            const searchBar1 = document.getElementById("searchBar1") as HTMLInputElement;
            const searchBar2 = document.getElementById("searchBar2") as HTMLInputElement;
            const colorPicker1 = document.getElementById("colorPicker1") as HTMLInputElement;
            const colorPicker2 = document.getElementById("colorPicker2") as HTMLInputElement;

            const search1Value = searchBar1.value;
            const search2Value = searchBar2.value;
            const color1Value = colorPicker1.value;
            const color2Value = colorPicker2.value;

            console.log(search1Value, search2Value, color1Value, color2Value)

            // Perform desired actions with the selected values
        });
    }

    // @ts-ignore
    if (window?.onSpotifyIframeApiReady) {
        // @ts-ignore
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '200',
                uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
            };
            // @ts-ignore

            const callback = (EmbedController) => {
                document.querySelectorAll('.episode').forEach(
                    episode => {
                        episode.addEventListener('click', () => {
                            // @ts-ignore
                            EmbedController.loadUri(episode?.dataset?.spotifyId)
                        });
                    })
            };
            IFrameAPI.createController(element, options, callback);
        };
    }

    modalLogic();
    updateTimerDisplay();
}

export default renderPomodoro;