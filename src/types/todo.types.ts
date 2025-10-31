export interface Timer {
    minutes: number;
    seconds: number;
}

export interface Todo {
    id: number;
    label: string;
    timer: Timer
    completed: boolean
    isRunning?: boolean
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoStore {
    todos: Todo[]
    filter: FilterType


addTodo: (label: string, minutes: number, seconds: number) => void;
toggleTodo: (id: number) => void;
deleteTodo: (id: number) => void;
updateTodoLabel: (id: number, label: string) => void;
toggleTimer: (id: number) => void;
updateTimer: (id: number) => void;
setFilter: (filter: FilterType) => void;
clearCompleted: () => void;
}