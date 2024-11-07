import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Input, DatePicker } from 'antd';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]); // Task list loaded from the database
    const [isModalVisible, setIsModalVisible] = useState(false); // Controls modal visibility
    const [newTask, setNewTask] = useState({ title: '', dueDate: '' }); // New task data

    // Load tasks from the database on initial load
    useEffect(() => {
        axios.get('http://localhost:3000/tasks')
            .then(response => {
                setTasks(response.data); // Set tasks to the response from the server
            })
            .catch(error => {
                console.error("There was an error loading the tasks!", error);
            });
    }, []);

    // Show the modal to add a new task
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Close the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Add a new task, sending it to the backend and updating the list
    const handleAddTask = () => {
        axios.post('http://localhost:5000/tasks', {
            title: newTask.title,
            due_date: newTask.dueDate,
            status: 'Todo'
        })
        .then(response => {
            setTasks([...tasks, response.data]); // Add the new task from response to the list
            setNewTask({ title: '', dueDate: '' }); // Reset the new task input
            setIsModalVisible(false); // Close the modal
        })
        .catch(error => {
            console.error("There was an error adding the task!", error);
        });
    };

    // Handle deleting a task
    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                console.error("There was an error deleting the task!", error);
            });
    };

    // Toggle task status between Todo and Done
    const toggleTaskStatus = (id) => {
        axios.put(`http://localhost:5000/tasks/${id}/toggle`)
            .then(() => {
                setTasks(tasks.map(task => 
                    task.id === id ? { ...task, status: task.status === 'Todo' ? 'Done' : 'Todo' } : task
                ));
            })
            .catch(error => {
                console.error("There was an error toggling the task status!", error);
            });
    };

    return (
        <div className="ToDoList" style={{ marginLeft: '10px' }}>
            <h1>My work 🎯</h1>
            <div>
                {tasks.map(task => (
                    <ToDoItem 
                        key={task.id} 
                        title={task.title} 
                        dueDate={task.due_date}
                        status={task.status}
                        onDelete={() => handleDeleteTask(task.id)}
                        onToggle={() => toggleTaskStatus(task.id)}
                    />
                ))}
            </div>
            <div style={{ marginTop: '5px' }}>
                <PlusCircleOutlined style={{ fontSize: '20px', color: '#d1453b' }} onClick={showModal} /> Add Task
            </div>

            {/* Modal for adding a new task */}
            <Modal
                title="Add New Task"
                visible={isModalVisible}
                onOk={handleAddTask}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <DatePicker
                    style={{ width: '100%' }}
                    onChange={(date, dateString) => setNewTask({ ...newTask, dueDate: dateString })}
                />
            </Modal>
        </div>
    );
};

export default ToDoList;
