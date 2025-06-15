'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@/app/components/Editor';
import Preview from '@/app/components/Preview';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Page() {
  const [markdown, setMarkdown] = useState('# Hello Markdown!');
  const [html, setHtml] = useState('');
  const [parser, setParser] = useState<any>(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 border-r border-gray-300">
        <Editor value={markdown} onChange={setMarkdown} />
      </div>
      <div className="w-full md:w-1/2 overflow-auto">
        <Preview html={html} />
      </div>
    </div>
  );
}
