import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useAuth';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../schemas/validation';

const ForgotPassword: React.FC = () => {
  const { mutate: forgotPassword, isPending, error, isSuccess } = useForgotPassword();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data, {
      onSuccess: (response) => {
        if (response.resetToken && response.resetUrl) {
          setResetToken(response.resetToken);
          setResetUrl(response.resetUrl);
        }
      },
    });
  };

  const getErrorMessage = () => {
    if (!error) return '';
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An error occurred';
  };

  const errorMessage = getErrorMessage();

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
      {/* Forgot Password Container */}
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
          <h1 style={{ fontSize: '2.5rem', opacity: 0.6, marginBottom: '2rem', textAlign: 'center' }}>
            FORGOT PASSWORD
          </h1>

          {isSuccess && !resetToken ? (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                borderLeft: '4px solid #22c55e',
                color: '#86efac',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Check your email!</p>
                <p style={{ fontSize: '0.875rem' }}>
                  If that email exists, a password reset link has been sent.
                </p>
              </div>
              <Link
                to="/login"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#ffffff',
                  opacity: 0.6,
                  fontSize: '0.9rem',
                  marginTop: '1rem'
                }}
              >
                Back to Login
              </Link>
            </div>
          ) : isSuccess && resetToken ? (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderLeft: '4px solid #3b82f6',
                color: '#93c5fd',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Password reset token generated!</p>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  In development mode, you can use this token to reset your password:
                </p>
                <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.75rem',
                  borderRadius: '0.25rem',
                  wordBreak: 'break-all',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  marginBottom: '1rem'
                }}>
                  {resetToken}
                </div>
                {resetUrl && (
                  <Link
                    to={`/reset-password/${resetToken}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '0.5rem',
                      backgroundColor: '#0f3460',
                      color: '#ffffff',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      transition: 'all 0.1s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0a2540';
                      e.currentTarget.style.boxShadow = '0 0 10px 1px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0f3460';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Go to Reset Password Page
                  </Link>
                )}
              </div>
              <Link
                to="/login"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#ffffff',
                  opacity: 0.6,
                  fontSize: '0.9rem',
                  marginTop: '1rem'
                }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p style={{
                color: '#ffffff',
                fontSize: '0.875rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                opacity: 0.8
              }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <input
                {...register('email')}
                type="email"
                placeholder="EMAIL"
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
                {isPending ? 'Sending...' : 'SEND RESET LINK'}
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
                  Back to Login
                </Link>
              </div>
            </form>
          )}
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

export default ForgotPassword;

