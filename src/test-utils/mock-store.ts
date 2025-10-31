import { useTodoStore } from '../store';

jest.mock('../store', () => ({
    useTodoStore: jest.fn()
}));

export const mockedUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

export const createMockStore = (overrides: Partial<ReturnType<typeof useTodoStore>> = {}) => {
    const defaultStore = {
        todos: [],
        filter: 'all' as const,
        setFilter: jest.fn(),
        addTodo: jest.fn(),
        toggleTodo: jest.fn(),
        deleteTodo: jest.fn(),
        updateTodoLabel: jest.fn(),
        toggleTimer: jest.fn(),
        updateTimer: jest.fn(),
        clearCompleted: jest.fn(),
        ...overrides
    };

    mockedUseTodoStore.mockImplementation((selector?: any) => {
        if (typeof selector === 'function') {
            return selector(defaultStore);
        }
        return defaultStore;
    });
    return defaultStore;
};