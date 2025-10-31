import React from 'react'
import { TodoItem } from "../TodoItem";
import { ListGroup } from "react-bootstrap";
import { useTodoStore } from "../../store";

export const TodoList = () => {
    const { todos, filter } = useTodoStore()

    const filteredTodos = todos.filter(todo => {
        if(filter === 'active') return !todo.completed
        if(filter === 'completed') return todo.completed
        return true
    })

    return (
        <ListGroup className='mt-3'>
            {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </ListGroup>
    )
}