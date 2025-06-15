import React, { forwardRef } from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  darkMode?: boolean;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ value, onChange, darkMode }, ref) => {
    return (
      <div ref={ref} className="h-full">
        <textarea
          className={`w-full h-full p-4 font-mono text-sm border-none outline-none resize-none transition-colors duration-300 ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-400'
              : 'bg-white text-black placeholder-gray-500'
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your markdown here..."
        />
      </div>
    );
  }
);

export default Editor;
