import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { registerSchema, RegisterFormData } from '../schemas/validation';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending, error } = useRegister();

  const getErrorMessage = (): string => {
    if (!error) return '';
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An error occurred';
  };

  const errorMessage = getErrorMessage();
  
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: '#1a1a2e',
        fontFamily: 'poppins, sans-serif',
        color: '#ffffff',
        letterSpacing: '1px'
      }}
    >
      {/* Register Container */}
      <div 
        style={{
          position: 'relative',
          width: '22.2rem'
        }}
      >
        {/* Circle One - Top Left */}
        <div 
          style={{
            width: '8rem',
            height: '8rem',
            background: '#0f3460',
            borderRadius: '50%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            transform: 'translate(-45%, -45%)'
          }}
        />

        {/* Form Container */}
        <div 
          style={{
            border: '1px solid hsla(0, 0%, 65%, 0.158)',
            boxShadow: '0 0 36px 1px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: '2rem',
            position: 'relative'
          }}
        >
          <h1 style={{ fontSize: '2.5rem', opacity: 0.6, marginBottom: '1rem', textAlign: 'center' }}>
            Get Started
          </h1>
          <p style={{ 
            textAlign: 'center', 
            opacity: 0.8, 
            marginBottom: '2rem',
            fontSize: '0.9rem'
          }}>
            Create your account and start organizing
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...registerForm('name')}
              type="text"
              placeholder="FULL NAME"
              style={{
                display: 'block',
                padding: '14.5px',
                width: '100%',
                margin: '2rem 0',
                color: '#ffffff',
                outline: 'none',
                backgroundColor: '#9191911f',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 500,
                letterSpacing: '0.8px',
                fontSize: '15px',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 16px 1px rgba(0, 0, 0, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.name && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '-1.5rem', marginBottom: '1rem' }}>
                {errors.name.message}
              </p>
            )}

            <input
              {...registerForm('email')}
              type="email"
              placeholder="EMAIL ADDRESS"
              style={{
                display: 'block',
                padding: '14.5px',
                width: '100%',
                margin: '2rem 0',
                color: '#ffffff',
                outline: 'none',
                backgroundColor: '#9191911f',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 500,
                letterSpacing: '0.8px',
                fontSize: '15px',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 16px 1px rgba(0, 0, 0, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '-1.5rem', marginBottom: '1rem' }}>
                {errors.email.message}
              </p>
            )}

            <input
              {...registerForm('password')}
              type="password"
              placeholder="PASSWORD"
              style={{
                display: 'block',
                padding: '14.5px',
                width: '100%',
                margin: '2rem 0',
                color: '#ffffff',
                outline: 'none',
                backgroundColor: '#9191911f',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 500,
                letterSpacing: '0.8px',
                fontSize: '15px',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 16px 1px rgba(0, 0, 0, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.password && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '-1.5rem', marginBottom: '1rem' }}>
                {errors.password.message}
              </p>
            )}

            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderLeft: '4px solid #ef4444',
                color: '#fca5a5',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                backgroundColor: '#0f3460',
                color: '#ffffff',
                display: 'block',
                padding: '13px',
                borderRadius: '5px',
                outline: 'none',
                fontSize: '18px',
                letterSpacing: '1.5px',
                fontWeight: 'bold',
                width: '100%',
                cursor: isPending ? 'not-allowed' : 'pointer',
                marginBottom: '2rem',
                transition: 'all 0.1s ease-in-out',
                border: 'none',
                opacity: isPending ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isPending ? "Creating account..." : "CREATE ACCOUNT"}
            </button>

            <div style={{
              textAlign: 'center',
              opacity: 0.6
            }}>
              <Link 
                to="/login" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Circle Two - Bottom Right */}
        <div 
          style={{
            width: '8rem',
            height: '8rem',
            background: '#0f3460',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -1,
            transform: 'translate(45%, 45%)'
          }}
        />
      </div>
    </div>
  );
};

export default Register;