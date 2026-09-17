import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  min-width: 100px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background: var(--primary-blue);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #2563eb;
    }
  }

  &.secondary {
    background: white;
    color: var(--primary-blue);
    border: 1px solid var(--primary-blue);

    &:hover:not(:disabled) {
      background: #f0f4fa;
    }
  }

  &.success {
    background: var(--success-green);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #2e9950;
    }
  }

  &.danger {
    background: #CC1717;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #a11212;
    }
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  ...props 
}) => {
  return (
    <StyledButton 
      className={variant}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </StyledButton>
  );
};

export default Button; 