import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks/useTodos";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { Todo, TodoFormData } from "../schemas/validation";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { data: todos = [], isLoading, error } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Create todo
  const handleCreateTodo = (data: TodoFormData) => {
    createTodo.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  // Update
  const handleUpdateTodo = (id: string, data: Partial<Todo>) => {
    updateTodo.mutate({ id, data });
  };

  // Delete
  const handleDeleteTodo = (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };

  // Edit
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  // Submit edit
  const handleUpdateTodoSubmit = (data: TodoFormData) => {
    if (editingTodo) {
      handleUpdateTodo(editingTodo._id, data);
      setEditingTodo(null);
      setShowForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: '#1a1a2e',
        fontFamily: 'poppins, sans-serif',
        color: '#ffffff',
        letterSpacing: '1px',
        padding: '2rem 0'
      }}
    >
      {/* HEADER */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <div 
          style={{
            width: '100%',
            maxWidth: '60rem',
            padding: '0 1rem'
          }}
        >
          <div 
            style={{
              border: '1px solid hsla(0, 0%, 65%, 0.158)',
              boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Task Manager
              </h1>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Stay organized, stay productive</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid hsla(0, 0%, 65%, 0.158)',
                fontSize: '0.9rem'
              }}>
                Welcome, <span style={{ fontWeight: 'bold' }}>{user?.name}</span>
              </div>
              <button
                onClick={logout}
                style={{
                  backgroundColor: '#0f3460',
                  color: '#ffffff',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  transition: 'all 0.1s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a2540';
                  e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0f3460';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 200px)'
        }}
      >
        <main 
          style={{
            width: '100%',
            maxWidth: '60rem',
            padding: '0 1rem'
          }}
        >
          {/* Stats */}
          {todos.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              {/* Total */}
              <div style={{
                border: '1px solid hsla(0, 0%, 65%, 0.158)',
                boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '1.25rem'
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.9, marginBottom: '0.5rem' }}>Total Tasks</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{todos.length}</p>
              </div>

              {/* Completed */}
              <div style={{
                border: '1px solid hsla(0, 0%, 65%, 0.158)',
                boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                padding: '1.25rem'
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.9, marginBottom: '0.5rem' }}>Completed</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{completedCount}</p>
              </div>

              {/* Pending */}
              <div style={{
                border: '1px solid hsla(0, 0%, 65%, 0.158)',
                boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: '#ea580c',
                color: '#ffffff',
                padding: '1.25rem'
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.9, marginBottom: '0.5rem' }}>Pending</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{pendingCount}</p>
              </div>
            </div>
          )}

          {/* Add Todo Button */}
          {!showForm ? (
            <div style={{ marginBottom: '2rem' }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  backgroundColor: '#0f3460',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  transition: 'all 0.1s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Add New Task
              </button>
            </div>
          ) : (
            <div style={{
              border: '1px solid hsla(0, 0%, 65%, 0.158)',
              boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {editingTodo ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    opacity: 0.7
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                >
                  ✕
                </button>
              </div>

              <TodoForm
                onSubmit={editingTodo ? handleUpdateTodoSubmit : handleCreateTodo}
                initialData={editingTodo || undefined}
                isEditing={!!editingTodo}
              />
            </div>
          )}

          {/* TODOS LIST */}
          {isLoading ? (
            <div style={{
              border: '1px solid hsla(0, 0%, 65%, 0.158)',
              boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '4rem',
              textAlign: 'center'
            }}>
              <p>Loading your tasks...</p>
            </div>
          ) : error ? (
            <div style={{
              padding: '2.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '0.5rem',
              color: '#fca5a5'
            }}>
              <p style={{ fontWeight: 'bold' }}>Error loading tasks</p>
            </div>
          ) : todos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {todos.map((todo, index) => (
                <div key={todo._id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <TodoItem
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              border: '1px solid hsla(0, 0%, 65%, 0.158)',
              boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '5rem',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No tasks yet</h3>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>Create your first task</p>
              <button 
                onClick={() => setShowForm(true)} 
                style={{
                  backgroundColor: '#0f3460',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  transition: 'all 0.1s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Create Your First Task
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
