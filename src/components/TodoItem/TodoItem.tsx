import React, {useState} from 'react'
import {ListGroup, Form, Button, Badge, InputGroup} from "react-bootstrap";
import { useTodoStore } from "../../store";
import { Todo } from '../../types/'
import { useTimer } from "../../hooks";

type TodoItemProps = {
    todo: Todo
}

export const TodoItem: React.FC<TodoItemProps> = ({todo}) => {
    const { deleteTodo, toggleTodo, toggleTimer, updateTodoLabel } = useTodoStore()
    const { isRunning } = useTimer(todo.id)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editLabel, setEditLabel] = useState('')

    const startEditing = () => {
        setEditingId(todo.id)
        setEditLabel(todo.label)
    }

    const saveEditing = () => {
        if(editLabel)updateTodoLabel(todo.id, editLabel)
        setEditingId(null)
        setEditLabel('')
    }

    const cancelEditing = () => {
        setEditingId(null)
        setEditLabel('')
    }

    const handelKeyPress = (evt: React.KeyboardEvent) => {
        if(evt.key === 'Enter'){
            saveEditing()
        } else if(evt.key === 'Escape'){
            cancelEditing()
        }
    }

    return(
        <ListGroup.Item
            key={todo.id}
            className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <Form.Check
                    type='checkbox'
                    checked={todo.completed}
                    onChange={()=>toggleTodo(todo.id)}
                    className='me-3'/>
                {editingId === todo.id ? (
                    <InputGroup size='sm'>
                        <Form.Control
                            type='text'
                            value={editLabel}
                            onChange={(evt) => setEditLabel(evt.target.value)}
                            onKeyDown={handelKeyPress}
                        />
                        <Button
                            variant='outline-success'
                            size='sm'
                            onClick={saveEditing}
                        >
                            Ok
                        </Button>
                        <Button
                            variant='outline-success'
                            size='sm'
                            onClick={cancelEditing}
                        >
                            Cancel
                        </Button>
                    </InputGroup>
                ) : (
                    <span className={todo.completed ? 'text-decoration-line-through text-muted' : ''}
                          onDoubleClick={startEditing}
                    >
                            {todo.label}
                        </span>
                )}
            </div>
            <div className='d-flex align-items-center'>
                <Button
                    variant={isRunning ? 'warning' : 'success'}
                    size='sm'
                    onClick={()=> toggleTimer(todo.id)}
                    className='me-1'
                    data-testid="play-pause-button"
                >
                    {isRunning? '⏸️' : '▶️'}
                </Button>
                <Badge bg='secondary' className='me-2'
                       style={{ minWidth: '50px' }}
                       translate="no"
                >
                    {todo.timer.minutes}:{todo.timer.seconds.toString().padStart(2, '0')}
                </Badge>

                {editingId !== todo.id && (
                    <>
                        <Button
                            data-testid="edit-button"
                            variant='outline-primary'
                            size='sm'
                            onClick={startEditing}
                            className='me-1'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </Button>
                        <Button
                            data-testid="delete-button"
                            variant='outline-danger'
                            size='sm'
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </Button>
                    </>
                )}
            </div>
        </ListGroup.Item>
    )
}