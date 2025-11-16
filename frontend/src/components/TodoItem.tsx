import React from 'react';
import { Todo } from '../schemas/validation';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onEdit }) => {
  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  return (
    <div style={{
      border: '1px solid hsla(0, 0%, 65%, 0.158)',
      boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '1.5rem',
      borderLeft: `4px solid ${todo.completed ? 'rgba(255, 255, 255, 0.3)' : '#0f3460'}`,
      opacity: todo.completed ? 0.7 : 1,
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }}
    onMouseEnter={(e) => {
      if (!todo.completed) {
        e.currentTarget.style.boxShadow = '0 0 36px 1px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 0 36px 1px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: 0 }}>
          {/* Checkbox */}
          <div style={{ marginTop: '0.25rem', flexShrink: 0 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              style={{
                width: '1.5rem',
                height: '1.5rem',
                cursor: 'pointer',
                borderRadius: '0.25rem',
                accentColor: '#0f3460'
              }}
            />
          </div>
          
          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                lineHeight: '1.4',
                color: todo.completed ? 'rgba(255, 255, 255, 0.5)' : '#ffffff',
                textDecoration: todo.completed ? 'line-through' : 'none',
                margin: 0
              }}>
                {todo.title}
              </h3>
            </div>
            {todo.description && (
              <p style={{
                color: todo.completed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                marginTop: '0.5rem',
                marginBottom: '1rem',
                lineHeight: '1.6',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.description}
              </p>
            )}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 500
            }}>
              <span>{new Date(todo.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={() => onEdit(todo)}
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              color: '#60a5fa',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;