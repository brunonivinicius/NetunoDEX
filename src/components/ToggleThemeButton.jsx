import { useTheme } from '../contexts/ThemeContext';
import { MoonFilled, SunFilled } from '@ant-design/icons';

const ToggleThemeButton = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <button onClick={toggleTheme}>
      {currentTheme === 'light' ? <MoonFilled /> : <SunFilled />}
    </button>
  );
};

export default ToggleThemeButton;
