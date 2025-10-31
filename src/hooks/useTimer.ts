import { useEffect, useRef } from 'react';
import { useTodoStore } from "../store";

export const useTimer = (todoId: number) => {
    const intervalRef = useRef<number | null>(null);
    const { todos, updateTimer } = useTodoStore();

    const todo = todos.find(t => t.id === todoId);
    const isRunning = todo?.isRunning || false;

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                updateTimer(todoId);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, todoId, updateTimer]);

    return { isRunning };
};