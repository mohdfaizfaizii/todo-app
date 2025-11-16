import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoFormData } from '../schemas/validation';

import { Todo } from '../schemas/validation';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  initialData?: TodoFormData | Todo;
  isEditing?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData, isEditing = false }) => {
  // Convert Todo to TodoFormData if needed
  const formData: TodoFormData | undefined = initialData
    ? {
        title: initialData.title,
        description: initialData.description || undefined,
      }
    : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: formData
  });

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="title" style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Task Title
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="What needs to be done?"
          style={{
            width: '100%',
            padding: '14.5px',
            color: '#ffffff',
            outline: 'none',
            backgroundColor: '#9191911f',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 500,
            letterSpacing: '0.8px',
            fontSize: '15px',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 16px 1px rgba(0, 0, 0, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.title && (
          <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {errors.title.message}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="description" style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Description <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal', textTransform: 'none' }}>(Optional)</span>
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Add more details about this task..."
          style={{
            width: '100%',
            padding: '14.5px',
            color: '#ffffff',
            outline: 'none',
            backgroundColor: '#9191911f',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 500,
            letterSpacing: '0.8px',
            fontSize: '15px',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            boxSizing: 'border-box',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 16px 1px rgba(0, 0, 0, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.description && (
          <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {errors.description.message}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flex: 1,
            backgroundColor: '#0f3460',
            color: '#ffffff',
            padding: '13px',
            borderRadius: '5px',
            outline: 'none',
            fontSize: '16px',
            letterSpacing: '1px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.1s ease-in-out',
            border: 'none',
            opacity: isSubmitting ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;