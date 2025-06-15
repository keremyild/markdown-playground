import React, { useRef, useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null); // div olduğu için HTMLDivElement
  const previewRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [markdown, setMarkdown] = useState<string>(
    '# Welcome to Markdown Playground\nWrite your markdown on the left, see preview on the right.'
  );
  const [html, setHtml] = useState<string>('');

  // Fullscreen toggle fonksiyonu
  const toggleFullscreen = (element: HTMLElement | null) => {
    if (!element) return;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  // fullscreen değişimini takip et
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Markdown → HTML (placeholder)
  useEffect(() => {
    setHtml(markdown.replace(/\n/g, '<br />')); // Satır sonlarını <br /> yapıyor
  }, [markdown]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col md:flex-1 border-r border-gray-300">
        <button
          className="p-2 m-2 border rounded"
          onClick={() => toggleFullscreen(editorRef.current)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
        </button>
        <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
      </div>

      <div className="flex flex-col md:flex-1">
        <button
          className="p-2 m-2 border rounded"
          onClick={() => toggleFullscreen(previewRef.current)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
        </button>
        <Preview ref={previewRef} html={html} />
      </div>
    </div>
  );
}
