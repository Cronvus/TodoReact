import React from 'react'
import { useTodoStore } from '../../store'
import {Button, ButtonGroup } from "react-bootstrap";


export const FilterTodo = () => {
    const { filter, setFilter, clearCompleted, todos } = useTodoStore()

    const completedCount = todos.filter(todo => todo.completed).length

    return (
        <>
        <ButtonGroup className='w-100'>
            <Button
            variant={filter === 'all' ? 'primary' : 'outline-primary'}
            onClick={()=>setFilter('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'primary' : 'outline-primary'}
                onClick={()=>setFilter('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'primary' : 'outline-primary'}
                onClick={()=>setFilter('completed')}
            >
                Completed
            </Button>
        </ButtonGroup>
    {completedCount > 0 &&(
            <Button
            variant='outline-danger'
            size='sm'
            onClick={clearCompleted}
            className='w-100'
            >
                Clear Completed
            </Button>
    )}
        </>
    )
}