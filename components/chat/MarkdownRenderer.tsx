/* ═══════════════════════════════════════════════════════════
   MarkdownRenderer — Formatted Text Display
   Uses react-markdown and remark-gfm to render LLM responses safely.
   Applies consistent styling to markdown elements (lists, bold, etc).
   ═══════════════════════════════════════════════════════════ */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body text-[15px] leading-[1.7]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 last:mb-0 text-[var(--color-text-primary)]">
              {children}
            </p>
          ),
          
          // Bold/Italic
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
          
          // Lists
          ul: ({ children }) => (
            <ul className="mb-5 pl-6 list-disc marker:text-gray-400 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 pl-6 list-decimal marker:text-gray-500 marker:font-medium space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          
          // Links
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--color-primary)] font-medium hover:underline underline-offset-4 decoration-[0.5px]"
            >
              {children}
            </a>
          ),
          
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900 leading-snug">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-7 mb-3 text-gray-900 leading-snug">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mt-6 mb-3 text-gray-900 leading-snug">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold mt-5 mb-2 text-gray-900">
              {children}
            </h4>
          ),

          // Dividers (Horizontal Rules)
          hr: () => <hr className="my-6 border-t border-gray-300/80" />,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--color-primary)] bg-[var(--color-gray-50)] px-4 py-2 mb-5 italic text-gray-700 rounded-r-md">
              {children}
            </blockquote>
          ),

          // Code
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
              <div className="my-5 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <div className="bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  {match?.[1] || "code"}
                </div>
                <pre className="p-4 overflow-x-auto text-sm text-gray-800">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono border border-gray-200" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
