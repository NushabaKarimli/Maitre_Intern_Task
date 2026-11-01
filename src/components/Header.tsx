import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-logo">
        <svg className="logo-icon" width="24" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 17V1L6 10L11 1L16 10L21 1V17" stroke="#A37B3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="logo-text">maitre</span>
        <span className="admin-badge">ADMİN</span>
      </div>
      <div className="header-user">
        <span className="user-name">Nushaba Karimli</span>
        <div className="user-avatar">NK</div>
      </div>
    </header>
  );
};