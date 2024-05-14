'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicializa o tema com a preferência salva no localStorage ou com o sistema preferido
  const [theme, setTheme] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')
      : 'light',
  );

  // Função para alternar o tema
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(currentTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
