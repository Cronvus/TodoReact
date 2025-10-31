import React, {useState} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { NewTodoFormData } from "../../types/";
import { useTodoStore } from '../../store'


export const NewTodo = () => {
    const [formData, setFormData] = useState<NewTodoFormData>({
        text: '',
        timer: {minutes: 0, seconds: 0},
    })

    const addTodo = useTodoStore(state => state.addTodo)


    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault()
        addTodo(formData.text, formData.timer.minutes, formData.timer.seconds)
        setFormData({
            text: '',
            timer: {minutes: 0, seconds: 0},
        })
    }
    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            text: evt.target.value
        }))
    }
    const handleMinutesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            timer: {
                ...prev.timer,
                minutes: Number(evt.target.value)
            }
        }))
    }
    const handleSecondsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            timer: {
                ...prev.timer,
                seconds: Number(evt.target.value)
            }
        }))
    }


    return(
        <Form onSubmit={handleSubmit} className='p-3 border rounded'>
            <Row className='align-items-center'>
                <Col md={5}>
                    <Form.Group>
                        <Form.Label htmlFor='task-name'>Task name</Form.Label>
                        <Form.Control
                            id='task-name'
                        type='text'
                        value={formData.text}
                        onChange={handleTextChange}
                        placeholder='Enter task name...'
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label htmlFor='Minutes'>Minutes</Form.Label>
                        <Form.Control
                            id='Minutes'
                            type='number'
                            value={formData.timer.minutes}
                            onChange={handleMinutesChange}
                            min='0'
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label htmlFor='Seconds'>Seconds</Form.Label>
                        <Form.Control
                            id='Seconds'
                            type='number'
                            value={formData.timer.seconds}
                            onChange={handleSecondsChange}
                            min='0'
                            max='59'
                        />
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Form.Label>Add</Form.Label>
                    <Button aria-label="Add task" variant='primary' type='submit' className='w-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}