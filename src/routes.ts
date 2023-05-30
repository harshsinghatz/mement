import renderTodo from './todo.js';
import renderPomodoro from './pomodoro.js';
import renderMemento from './memento.js';

const routes = {
    '/': {
        template: "/templates/index.html",
        title: "Home page for mement",
        description: "Description for Home Page",
        callback: () => {

        }
    }, '/pomodoro': {
        template: "/templates/pomodoro.html",
        title: "Home page for mement",
        description: "Description for Home Page",
        callback: () => {
            // Pomodoro Components
            const timer = document.getElementById('timer') as HTMLCanvasElement;
            const progressCircle = timer?.querySelector('.progress') as HTMLCanvasElement;
            const timerText = timer?.querySelector('.text') as HTMLDivElement;
            const workDurationInput = document.getElementById('work-duration') as HTMLInputElement;
            const breakDurationInput = document.getElementById('break-duration') as HTMLInputElement;
            const startButton = document.getElementById('start-button') as HTMLButtonElement;
            const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

            renderPomodoro({
                progressCircle,
                timerText,
                workDurationInput,
                breakDurationInput,
                startButton,
                resetButton,
            })
        }
    }, '/memento': {
        template: "/templates/memento.html",
        title: "Home page for mement",
        description: "Description for Home Page",
        callback: () => {
            const yearRangeElement = document.querySelector('#memento-years') as HTMLInputElement;
            const dobElement = document.querySelector('#memento-dob') as HTMLInputElement;
            const boardEl = document.querySelector('.memento-board') as HTMLDivElement;
            const genBtn = document.querySelector('#memento-generate') as HTMLButtonElement;
            genBtn.addEventListener('click', () => {
                renderMemento(Number(yearRangeElement.value), dobElement.value, boardEl);
            })
            // Memento Components
            renderMemento(Number(yearRangeElement.value), dobElement.value, boardEl);
        }
    }, '/todo': {
        template: "/templates/todo.html",
        title: "Home page for mement",
        description: "Description for Home Page",
        callback: () => {
            const todoInput = document.getElementById('todo-input') as HTMLInputElement;
            const addButton = document.getElementById('add-button') as HTMLButtonElement;
            const todoList = document.getElementById('todo-list') as HTMLDivElement;

            renderTodo(todoInput, addButton, todoList);
        }
    }, 404: {
        template: "/templates/404.html",
        title: "Page not found",
        description: "Description for new things",
        callback: () => {
            console.log('page not found')
        }
    }
}

export default routes;