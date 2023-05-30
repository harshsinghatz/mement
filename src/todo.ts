
const renderTodo = (todoInput: HTMLInputElement, addButton: HTMLButtonElement, todoList: HTMLDivElement) => {
    addButton.addEventListener('click', function () {
        const task = todoInput.value;
        if (task !== '') {
            const todo = {
                id: Date.now().toString(),
                title: task,
                status: TodoStatus.PENDING
            };
            addTodoToDatabase(todo); // Assuming you have a function to add the todo to the database
            addTodoToList(todo);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', function (event) {
        const key = event.which || event.keyCode;
        if (key === 13) { // Enter key
            addButton.click();
        }
    });

    enum TodoStatus {
        COMPLETED = 'completed',
        PENDING = 'pending'
    }

    type Todo = {
        id: string,
        title: string,
        status: TodoStatus,
    }

    // Repopulate the todo list from an array of todos
    let todos: Todo[] = [
        {
            id: "1",
            title: "Take trash out",
            status: TodoStatus.COMPLETED,
        },
        // Add more todos as needed
    ];

    todos.forEach(function (todo) {
        addTodoToList(todo);
    });

    function addTodoToList(todo: Todo) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = (todo.status === 'completed');
        checkbox.addEventListener('change', function () {
            updateTodoStatus(todo.id, checkbox.checked ? 'completed' : 'pending'); // Assuming you have a function to update the todo status in the database
        });

        const label = document.createElement('label');
        label.textContent = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            li.remove();
            deleteTodoFromDatabase(todo.id); // Assuming you have a function to delete the todo from the database
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    // Functions to interact with the database
    function addTodoToDatabase(todo: Todo) {
        // Implementation to add the todo to the database
        console.log('Added to database:', todo);
    }

    function updateTodoStatus(id: string, status: string) {
        todos = todos.map((todo) => {
            if (todo.id === id) {
                // @ts-ignore
                todo.status = todo.status === "completed" ? "pending" : "completed"
            }
            return todo;
        })
        // Implementation to update the todo status in the database
        console.log('Updated status in database: id =', id, ', status =', status);
    }

    function deleteTodoFromDatabase(id: string) {
        // Implementation to delete the todo from the database
        console.log('Deleted from database: id =', id);
    }
}


export default renderTodo