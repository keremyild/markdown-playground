import React, { forwardRef } from 'react';

interface PreviewProps {
  html: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ html }, ref) => {
  return (
    <div
      ref={ref}
      className="p-4 overflow-auto prose max-w-full h-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export default Preview;
