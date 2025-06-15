'use client';

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@/app/components/Editor';
import Preview from '@/app/components/Preview';
import SampleSelector from '@/app/components/SampleSelector';
import ThemeToggle from '@/app/components/ThemeToggle';
import useIndexedDB from '@/app/hooks/useIndexedDB';
import { debounce } from 'lodash';

export default function Page() {
  const {
    saveSetting,
    getSetting,
    saveDocument,
    getDocument,
    testDB,
  } = useIndexedDB();

  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [markdown, setMarkdown] = useState(
    '# Welcome to Markdown Playground\nWrite your markdown on the left, see preview on the right.'
  );
  const [html, setHtml] = useState('');
  const [parser, setParser] = useState<any>(null);
  const [samples, setSamples] = useState<Record<string, string>>({});
  const [selectedSample, setSelectedSample] = useState('intro');
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (markdown.trim()) {
        saveDocument(markdown).catch(console.error);
      }
    }, 500);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [markdown, saveDocument]);

  useEffect(() => {
    getSetting('darkMode', false).then((saved) => setDarkMode(saved));
  }, [getSetting]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    testDB();
  }, [testDB]);

  useEffect(() => {
    async function loadParser() {
      const { unified } = await import('unified');
      const remarkParse = await import('remark-parse');
      const remarkRehype = await import('remark-rehype');
      const rehypeStringify = await import('rehype-stringify');
      const rehypeSanitize = await import('rehype-sanitize');

      setParser(() =>
        unified()
          .use(remarkParse.default)
          .use(remarkRehype.default)
          .use(rehypeSanitize.default)
          .use(rehypeStringify.default)
      );
    }
    loadParser();
  }, []);

  useEffect(() => {
    if (!parser) return;
    async function parse() {
      try {
        const file = await parser.process(markdown);
        setHtml(String(file));
      } catch {
        setHtml('<p>Error parsing markdown</p>');
      }
    }
    parse();
  }, [markdown, parser]);

  useEffect(() => {
    async function loadSamples() {
      try {
        const [intro, features, usage] = await Promise.all([
          fetch('/samples/intro.md').then((res) => res.text()),
          fetch('/samples/features.md').then((res) => res.text()),
          fetch('/samples/usage.md').then((res) => res.text()),
        ]);

        setSamples({ intro, features, usage });
      } catch (err) {
        console.error('Sample yüklenemedi', err);
      }
    }
    loadSamples();
  }, []);

  useEffect(() => {
    async function loadLastMarkdown() {
      const savedDoc = await getDocument();
      if (savedDoc) {
        setMarkdown(savedDoc);
      } else if (samples.intro) {
        setMarkdown(samples.intro);
        setSelectedSample('intro');
      }
    }
    loadLastMarkdown();
  }, [getDocument, samples]);

  useEffect(() => {
    if (samples[selectedSample]) {
      setMarkdown(samples[selectedSample]);
    }
  }, [selectedSample, samples]);

  useEffect(() => {
    saveDocument(markdown).catch(console.error);
  }, [markdown, saveDocument]);

  return (
    <div className="flex flex-col md:flex-row h-screen p-4">
      <div className="w-full md:w-1/2 md:pr-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <SampleSelector
            samples={samples}
            selected={selectedSample}
            onSelect={setSelectedSample}
            darkMode={darkMode}
          />
          <ThemeToggle darkMode={darkMode} onToggle={setDarkMode} saveSetting={saveSetting} />
        </div>

        <button
          className="p-2 mb-2 border rounded"
          onClick={() => toggleFullscreen(editorRef.current)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
        </button>

        <Editor ref={editorRef} value={markdown} onChange={setMarkdown} darkMode={darkMode} />
      </div>

      <div className="w-full md:w-1/2 overflow-auto border-l border-gray-300 dark:border-gray-700 flex flex-col">
        <button
          className="p-2 mb-2 border rounded"
          onClick={() => toggleFullscreen(previewRef.current)}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
        </button>

        <Preview ref={previewRef} html={html} />
      </div>
    </div>
  );
}
