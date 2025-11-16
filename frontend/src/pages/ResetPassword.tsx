import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useResetPassword } from '../hooks/useAuth';
import { resetPasswordSchema, ResetPasswordFormData } from '../schemas/validation';

const ResetPassword: React.FC = () => {
  const { resettoken } = useParams<{ resettoken: string }>();
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!resettoken) {
      return;
    }

    resetPassword(
      { token: resettoken, data },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  const getErrorMessage = () => {
    if (!error) return '';
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An error occurred';
  };

  const errorMessage = getErrorMessage();

  if (!resettoken) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0b0e27] to-[#090f33] px-6 py-10">
        <div className="w-full max-w-md relative z-20">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10">
            <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 rounded-lg">
              <p className="font-semibold">Invalid Reset Token</p>
              <p className="text-sm mt-2">No reset token provided in the URL.</p>
            </div>
            <Link
              to="/forgot-password"
              className="block text-center mt-4 text-gray-400 hover:text-gray-200 transition"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
      {/* Reset Password Container */}
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
            RESET PASSWORD
          </h1>

          <p style={{
            color: '#ffffff',
            fontSize: '0.875rem',
            textAlign: 'center',
            marginBottom: '2rem',
            opacity: 0.8
          }}>
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '0.5rem',
                opacity: 0.8
              }}>
                NEW PASSWORD:
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter new password"
                style={{
                  display: 'block',
                  padding: '14.5px',
                  width: '100%',
                  margin: '0.5rem 0',
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
              {errors.password && (
                <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '0.5rem',
                opacity: 0.8
              }}>
                CONFIRM PASSWORD:
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm new password"
                style={{
                  display: 'block',
                  padding: '14.5px',
                  width: '100%',
                  margin: '0.5rem 0',
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
              {errors.confirmPassword && (
                <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* API Error */}
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

            {/* Submit Button */}
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
              {isPending ? 'Resetting...' : 'RESET PASSWORD'}
            </button>

            {/* Back to Login Link */}
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

export default ResetPassword;

