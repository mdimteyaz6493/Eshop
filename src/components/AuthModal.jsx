import React, { useState } from 'react';
import LoginModal from '../components/LoginModal/LoginModal';
import RegisterModal from '../components/RegisterModal/RegisterModal';

const AuthModal = ({ isOpen, onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  if (!isOpen) return null; // 👈 Prevent rendering if modal is closed

  return (
    <>
      {showLogin ? (
        <LoginModal onSwitch={() => setShowLogin(false)} onClose={onClose} />
      ) : (
        <RegisterModal onSwitch={() => setShowLogin(true)} onClose={onClose} isOpen={isOpen} />
      )}
    </>
  );
};

export default AuthModal;
