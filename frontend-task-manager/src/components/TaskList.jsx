import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h2 style={{color: '#fff'}}>Your Tasks</h2>
      <div className="d-flex flex-wrap">
        {tasks.map(task => (
          <Card key={task.id} className="m-2" style={{ width: '18rem' }}>
            <Card.Body>
              <Form.Check 
                type="checkbox"
                checked={task.complete}
                onChange={() => onToggleComplete(task.id)}
                label={
                  <Card.Title style={{ textDecoration: task.complete ? 'line-through' : 'none' }}>
                    {task.title}
                  </Card.Title>
                }
              />
              <Card.Text style={{ textDecoration: task.complete ? 'line-through' : 'none' }}>
                {task.description}
              </Card.Text>
              <Button variant="primary" onClick={() => onEdit(task)} className='btn'>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(task.id)} className='btn'>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
