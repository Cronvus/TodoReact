import { render, screen, fireEvent } from '@testing-library/react';
import { createMockStore } from "../../test-utils/mock-store";
import { TodoItem } from "./TodoItem";

const mockTodo = {
    id: 1,
    label: 'Тестовая задача',
    completed: false,
    timer: { minutes: 5, seconds: 0 },
    isRunning: false
}
describe('TodoItem', () => {
    let mockToggleTodo: jest.Mock;
    let mockDeleteTodo: jest.Mock;
    let mockToggleTimer: jest.Mock;
    let mockUpdateTodoLabel: jest.Mock;

    beforeEach(() => {
        mockToggleTodo = jest.fn();
        mockDeleteTodo = jest.fn();
        mockToggleTimer = jest.fn();
        mockUpdateTodoLabel = jest.fn();

        createMockStore({
            toggleTodo: mockToggleTodo,
            deleteTodo: mockDeleteTodo,
            toggleTimer: mockToggleTimer,
            updateTodoLabel: mockUpdateTodoLabel
        });

        jest.clearAllMocks();
    });

    it('рендерит задачу с правильным текстом', () => {
        render(<TodoItem todo={mockTodo} />);

        expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
        expect(screen.getByText('5:00')).toBeInTheDocument();
    });

    it('отображает чекбокс с правильным состоянием', () => {
        render(<TodoItem todo={mockTodo} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('вызывает toggleTodo при клике на чекбокс', () => {
        render(<TodoItem todo={mockTodo} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockToggleTodo).toHaveBeenCalledWith(1);
    });

    it('вызывает deleteTodo при клике на кнопку удаления', () => {
        render(<TodoItem todo={mockTodo} />);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(mockDeleteTodo).toHaveBeenCalledWith(1);
    });

    it('вызывает toggleTimer при клике на кнопку таймера', () => {
        render(<TodoItem todo={mockTodo} />);

        const timerButton = screen.getByText('▶️');
        fireEvent.click(timerButton);

        expect(mockToggleTimer).toHaveBeenCalledWith(1);
    });


    it('переходит в режим редактирования при двойном клике', () => {
        render(<TodoItem todo={mockTodo} />);

        const taskText = screen.getByText('Тестовая задача');
        fireEvent.doubleClick(taskText);

        expect(screen.getByDisplayValue('Тестовая задача')).toBeInTheDocument();
        expect(screen.getByText('Ok')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('сохраняет изменения при нажатии Enter', () => {
        render(<TodoItem todo={mockTodo} />);


        fireEvent.doubleClick(screen.getByText('Тестовая задача'));


        const input = screen.getByDisplayValue('Тестовая задача');
        fireEvent.change(input, { target: { value: 'Новый текст' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockUpdateTodoLabel).toHaveBeenCalledWith(1, 'Новый текст');
    });

    it('отменяет редактирование при нажатии Escape', () => {
        render(<TodoItem todo={mockTodo} />);


        fireEvent.doubleClick(screen.getByText('Тестовая задача'));


        const input = screen.getByDisplayValue('Тестовая задача');
        fireEvent.change(input, { target: { value: 'Новый текст' } });
        fireEvent.keyDown(input, { key: 'Escape' });


        expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
        expect(mockUpdateTodoLabel).not.toHaveBeenCalled();
    });

    it('перечеркивает текст завершенной задачи', () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(<TodoItem todo={completedTodo} />);

        const taskText = screen.getByText('Тестовая задача');
        expect(taskText).toHaveClass('text-decoration-line-through');
    });

    it('отображает кнопку редактирования когда не в режиме редактирования', () => {
        render(<TodoItem todo={mockTodo} />);

        expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });

});