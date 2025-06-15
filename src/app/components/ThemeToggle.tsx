'use client';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: (value: boolean) => void;
  saveSetting: (key: string, value: any) => Promise<void>;
}

const ThemeToggle = ({ darkMode, onToggle, saveSetting }: ThemeToggleProps) => {
  const toggleTheme = () => {
    const newValue = !darkMode;
    onToggle(newValue);
    saveSetting('darkMode', newValue);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2"
    >
      {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;
