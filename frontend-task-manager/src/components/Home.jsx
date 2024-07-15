import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = () => {
    fetchTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(error => console.error(error));
  };

  const handleToggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      axios.put(`http://localhost:3000/tasks/${id}`, { ...task, complete: !task.complete })
        .then(() => fetchTasks())
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="main-container">
      <Button variant="primary mt-3" onClick={() => {
        setCurrentTask(null);
        setShowModal(true);
      }}>Add Task</Button>
      <TaskForm
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setCurrentTask(null);
        }}
        task={currentTask}
        onSave={handleSave}
      />
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default Home;
