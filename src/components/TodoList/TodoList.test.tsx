import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { createMockStore } from "../../test-utils/mock-store";

describe('TodoList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('рендерит список задач', () => {
        const mockTodos = [
            { id: 1, label: 'First task', completed: false, timer: { minutes: 10, seconds: 0 } },
            { id: 2, label: 'Second task', completed: false, timer: { minutes: 5, seconds: 0 } },
            { id: 3, label: 'Third task', completed: true, timer: { minutes: 0, seconds: 0 } }
        ];

        createMockStore({ todos: mockTodos });

        render(<TodoList />);

        expect(screen.getByText('First task')).toBeInTheDocument();
        expect(screen.getByText('Second task')).toBeInTheDocument();
        expect(screen.getByText('Third task')).toBeInTheDocument();
    });

    it('рендерит пустой список когда нет задач', () => {
        createMockStore({ todos: [] });

        render(<TodoList />);

        expect(screen.queryByTestId(/todo-item-/)).not.toBeInTheDocument();
    });

    it('фильтрует задачи по "active"', () => {
        const mockTodos = [
            { id: 1, label: 'First task', completed: false, timer: { minutes: 10, seconds: 0 } },
            { id: 2, label: 'Second task', completed: true, timer: { minutes: 5, seconds: 0 } },
        ];

        createMockStore({
            todos: mockTodos,
            filter: 'active' as const
        });

        render(<TodoList />);

        expect(screen.getByText('First task')).toBeInTheDocument();
        expect(screen.queryByTestId('Second task')).not.toBeInTheDocument();
    });

    it('фильтрует задачи по "completed"', () => {
        const mockTodos = [
            { id: 1, label: 'First task', completed: false, timer: { minutes: 10, seconds: 0 } },
            { id: 2, label: 'Second task', completed: true, timer: { minutes: 5, seconds: 0 } },
        ];

        createMockStore({
            todos: mockTodos,
            filter: 'completed' as const
        });

        render(<TodoList />);

        expect(screen.queryByTestId('First task')).not.toBeInTheDocument();
        expect(screen.getByText('Second task')).toBeInTheDocument();
    });

    it('показывает все задачи при фильтре "all"', () => {
        const mockTodos = [
            { id: 1, label: 'First task', completed: false, timer: { minutes: 10, seconds: 0 } },
            { id: 2, label: 'Second task', completed: true, timer: { minutes: 5, seconds: 0 } },
        ];

        createMockStore({
            todos: mockTodos,
            filter: 'all' as const
        });

        render(<TodoList />);

        expect(screen.getByText('First task')).toBeInTheDocument();
        expect(screen.getByText('Second task')).toBeInTheDocument();
    });
});