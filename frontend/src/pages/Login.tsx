import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, LoginFormData } from "../schemas/validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending, error } = useLogin();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: () => navigate("/"),
    });
  };

  const getErrorMessage = () => {
    if (!error) return "";
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An error occurred";
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
      {/* Login Container */}
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
            LOGIN
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...registerForm("email")}
              type="email"
              placeholder="USERNAME"
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
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {errors.email.message}
              </p>
            )}

            <input
              {...registerForm("password")}
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
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {errors.password.message}
              </p>
            )}

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
              {isPending ? "Signing in..." : "SUBMIT"}
            </button>

            <div style={{
              margin: '1rem 0',
              display: 'flex',
              justifyContent: 'space-between',
              opacity: 0.6
            }}>
              <Link to="/register" style={{ textDecoration: 'none', color: '#ffffff' }}>
                REGISTER
              </Link>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#ffffff' }}>
                FORGOT PASSWORD
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

export default Login;
