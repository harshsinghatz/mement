const renderMemento = (yearRange: number, dob: string, boardEl: HTMLDivElement) => {
    if (!yearRange || !dob) {
        boardEl.innerHTML = `
        <h3>Please enter the input</h3>
        `;
        return;
    }
    boardEl.innerHTML = ``;

    const dateDob = new Date(dob);
    const dateNow = new Date();

    const timeDiff = Math.abs(dateNow.getTime() - dateDob.getTime());
    const weeksDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 7));

    const startDate = new Date(dob);
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + yearRange);

    const timeDiffYr = Math.abs(endDate.getTime() - startDate.getTime());
    const weeksDiffYr = Math.floor(timeDiffYr / (1000 * 3600 * 24 * 7));

    let weeksRemaining = weeksDiff;
    const NO_OF_WEEKS_IN_CONTAINER = 260;
    let noOfWeeksRemainingInContainer = 0;
    let container: HTMLDivElement | null = null;

    for (let i = 0; i < weeksDiffYr; i++) {
        if (i === 0 || noOfWeeksRemainingInContainer === 0) {
            noOfWeeksRemainingInContainer = NO_OF_WEEKS_IN_CONTAINER;
            container = document.createElement('div');
            container.classList.add('weeks-container');
            boardEl.appendChild(container);
        }

        const weekEl = document.createElement('span');
        weekEl.classList.add('week-el');
        if (weeksRemaining > 0) {
            weekEl.classList.add('week-el-done');
            weeksRemaining--;
        }
        noOfWeeksRemainingInContainer--;
        if (container) {
            container.appendChild(weekEl);
        }
    }
}

export default renderMemento;