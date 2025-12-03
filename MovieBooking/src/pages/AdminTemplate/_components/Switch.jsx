import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Switch = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle-switch"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className={`sun-icon ${theme === 'light' ? 'active' : ''}`} />
      <Moon className={`moon-icon ${theme === 'dark' ? 'active' : ''}`} />
    </button>
  );
};

export default Switch;