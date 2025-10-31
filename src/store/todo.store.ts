import { create } from "zustand";
import {TodoStore} from '../types'

export const useTodoStore = create<TodoStore>((set) =>({
    todos: [
        {id: 1, label: 'First task', timer: {minutes: 10,seconds: 0}, completed: false, isRunning: false},
        {id: 2, label: 'Second task', timer: {minutes: 5,seconds: 0}, completed: false, isRunning: false},
        {id: 3, label: 'Third task', timer: {minutes: 0,seconds: 0}, completed: true, isRunning: false}
    ],
    filter: 'all',

    addTodo: (label: string, minutes: number, seconds: number) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Math.max(0, ...state.todos.map(todo => todo.id)) + 1,
                    label,
                    timer: { minutes, seconds },
                    completed: false
                }
            ]
        })),

    toggleTodo: (id: number) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed } : todo
            )
        })),

    deleteTodo: (id: number) =>
        set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
        })),

    updateTodoLabel: (id: number, label: string) =>
        set((state) => ({
           todos: state.todos.map((todo) =>
           todo.id === id ? {...todo, label } : todo
           )
        })),

    toggleTimer: (id: number) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
            todo.id === id ? {...todo, isRunning: !todo.isRunning} : todo
            )
        })),

    updateTimer: (id: number) =>
        set((state) => ({
            todos: state.todos.map((todo) => {
                if (todo.id === id && todo.isRunning) {
                    const { minutes, seconds } = todo.timer;

                    if (seconds === 0 && minutes === 0) return { ...todo, isRunning: false }
                    if (seconds === 0) return {...todo, timer: { minutes: minutes - 1, seconds: 59 }}
                    return {...todo, timer: { minutes, seconds: seconds - 1 }
                    };
                }
                return todo;
            })
        })),

    setFilter: (filter: TodoStore['filter']) => set({filter}),

    clearCompleted: () => set((state) =>({
        todos: state.todos.filter((todo) => !todo.completed)
    }))
}))