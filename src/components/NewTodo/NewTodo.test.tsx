import { render, screen, fireEvent } from '@testing-library/react';
import { createMockStore, mockedUseTodoStore } from "../../test-utils/mock-store";
import { NewTodo } from './NewTodo';

describe('NewTodo', () => {
    let mockAddTodo: jest.Mock;
    let mockStore: ReturnType<typeof createMockStore>;

    beforeEach(() => {
        mockAddTodo = jest.fn();
        mockStore = createMockStore({
            addTodo: mockAddTodo
        });
        jest.clearAllMocks();
    });

    afterEach(() => {
        mockedUseTodoStore.mockClear();
    });

    it('рендерит форму с полями ввода', () => {
        render(<NewTodo />);

        expect(screen.getByLabelText('Task name')).toBeInTheDocument();
        expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
        expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    it('добавляет задачу при отправке формы', () => {
        render(<NewTodo />);

        fireEvent.change(screen.getByLabelText('Task name'), {
            target: { value: 'Новая задача' }
        });
        fireEvent.change(screen.getByLabelText('Minutes'), {
            target: { value: '5' }
        });
        fireEvent.change(screen.getByLabelText('Seconds'), {
            target: { value: '30' }
        });

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAddTodo).toHaveBeenCalledWith('Новая задача', 5, 30);
    });

    it('сбрасывает форму после добавления задачи', () => {
        render(<NewTodo />);

        const taskInput = screen.getByLabelText('Task name');
        const minutesInput = screen.getByLabelText('Minutes');
        const secondsInput = screen.getByLabelText('Seconds');

        fireEvent.change(taskInput, {
            target: { value: 'Новая задача' }
        });
        fireEvent.change(minutesInput, {
            target: { value: '5' }
        });
        fireEvent.change(secondsInput, {
            target: { value: '30' }
        });

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(taskInput).toHaveValue('');
        expect(minutesInput).toHaveValue(0);
        expect(secondsInput).toHaveValue(0);
    });

    it('добавляет задачу с нулевым временем по умолчанию', () => {
        render(<NewTodo />);

        fireEvent.change(screen.getByLabelText('Task name'), {
            target: { value: 'Задача без времени' }
        });
        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAddTodo).toHaveBeenCalledWith('Задача без времени', 0, 0);
    });

    it('валидирует числовые поля (минуты и секунды)', () => {
        render(<NewTodo />);

        const minutesInput = screen.getByLabelText('Minutes');
        const secondsInput = screen.getByLabelText('Seconds');

        expect(minutesInput).toHaveAttribute('min', '0');
        expect(secondsInput).toHaveAttribute('min', '0');
        expect(secondsInput).toHaveAttribute('max', '59');
    });

    it('обрабатывает граничные значения времени', () => {
        render(<NewTodo />);

        fireEvent.change(screen.getByLabelText('Task name'), {
            target: { value: 'Граничные значения' }
        });
        fireEvent.change(screen.getByLabelText('Minutes'), {
            target: { value: '999' }
        });
        fireEvent.change(screen.getByLabelText('Seconds'), {
            target: { value: '59' }
        });
        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAddTodo).toHaveBeenCalledWith('Граничные значения', 999, 59);
    });
});