'use client';

import React from 'react';

interface SampleSelectorProps {
  samples: { [key: string]: string };
  selected: string;
  onSelect: (key: string) => void;
  darkMode?: boolean;
}

export default function SampleSelector({ samples, selected, onSelect, darkMode }: SampleSelectorProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label
        htmlFor="sample-select"
        className={`font-medium text-sm ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Sample:
      </label>
      <select
        id="sample-select"
        className={`border rounded px-3 py-2 text-sm outline-none transition-colors duration-300
          ${darkMode
            ? 'bg-gray-800 text-white border-gray-600 focus:border-gray-400'
            : 'bg-white text-black border-gray-300 focus:border-gray-500'
        }`}
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        {Object.keys(samples).map((key) => (
          <option
            key={key}
            value={key}
            className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
