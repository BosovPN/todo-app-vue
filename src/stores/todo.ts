import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [] as Todo[],
    }),
    
    actions: {
        loadTodos() {
            const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
            if (Array.isArray(todosFromStorage)) {
                this.todos = todosFromStorage as Todo[];
            }
        },

        addTask(text: string) {
            const newTask: Todo = {
                id: nanoid(),
                text,
                completed: false,
            };
            this.todos.push(newTask);
            this.saveToLocalStorage('todos', this.todos);
        },
        
        removeTask(id: string) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage('todos', this.todos);
        },

        toggleTask(id: string) {
            const task = this.todos.find(todo => todo.id === id);
            if (task) {
                task.completed = !task.completed;
                this.saveToLocalStorage('todos', this.todos);
            }
        },

        editTask(id: string, text: string) {
            const task = this.todos.find(task => task.id === id);
            if (task) {
                task.text = text;
                this.saveToLocalStorage('todos', this.todos);
            }
        },

        saveToLocalStorage<T>(key: string, value: T) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
})