import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { 
      title, 
      description, 
      complete: task ? task.complete : false 
    };

    if (task) {
      axios.put(`http://localhost:3000/tasks/${task.id}`, newTask)
        .then(() => {
          onSave();
          handleClose();
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3000/tasks', newTask)
        .then(() => {
          onSave();
          handleClose();
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-3'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
