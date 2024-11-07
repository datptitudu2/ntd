import React from 'react';
import './style.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoItem = ({ title, dueDate, status, onDelete, onToggle }) => {
    return (
        <div className="ToDoItem">
            <input type="checkbox" checked={status === 'Done'} onChange={onToggle} />
            <div className='ItemContent'>
                <p className='Title'>{title}</p>
                <p className='DueDate'>{dueDate}</p>
            </div>
            <div className='Action'>
                <EditOutlined />
                <DeleteOutlined onClick={onDelete} />
            </div>
        </div>
    );
}

export default ToDoItem;
