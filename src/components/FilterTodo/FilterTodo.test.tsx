import { render, screen, fireEvent } from '@testing-library/react';
import { createMockStore } from "../../test-utils/mock-store";
import { FilterTodo } from './FilterTodo';

describe('FilterTodo', () => {
    let mockSetFilter: jest.Mock;

    beforeEach(() => {
        mockSetFilter = jest.fn();
        jest.clearAllMocks();
    });

    it('Рендер всех кнопок фильтрации', () => {
        createMockStore({setFilter: mockSetFilter});

        render(<FilterTodo/>);

        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('Установка фильтра на "Все" при нажатии кнопки', () => {
        createMockStore({setFilter: mockSetFilter});

        render(<FilterTodo/>);

        fireEvent.click(screen.getByText('All'));
        expect(mockSetFilter).toHaveBeenCalledWith('all');
    });

    it('Установка фильтра на "Активные" при нажатии кнопки', () => {
        createMockStore({setFilter: mockSetFilter});

        render(<FilterTodo/>);

        fireEvent.click(screen.getByText('Active'));
        expect(mockSetFilter).toHaveBeenCalledWith('active');
    });

    it('Установка фильтра на "Завершенные" при нажатии кнопки', () => {
        createMockStore({setFilter: mockSetFilter});

        render(<FilterTodo/>);

        fireEvent.click(screen.getByText('Completed'));
        expect(mockSetFilter).toHaveBeenCalledWith('completed');
    });
})