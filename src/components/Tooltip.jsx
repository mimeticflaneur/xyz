import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ content }) {
  const [show, setShow] = useState(false);

  if (!content) return null;

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        className="inline-flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {show && (
        <div className="absolute z-50 w-72 p-4 mt-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl left-0 transform">
          <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {content.title}
          </div>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {content.description}
          </div>
          {/* Flecha */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}
