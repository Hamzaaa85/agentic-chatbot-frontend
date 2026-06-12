"use client";

/* ═══════════════════════════════════════════════════════════
   MarkdownRenderer — Premium Formatted Text Display
   Uses react-markdown and remark-gfm.
   Features beautiful typography, custom icons, table handling,
   and modern styling for all markdown elements.
   ═══════════════════════════════════════════════════════════ */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ── Icons ──────────────────────────────────────────────────

function QuoteIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--color-primary)] opacity-60 absolute top-3 left-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="w-3 h-3 inline-block ml-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body text-[15px] leading-[1.8] text-gray-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ── Typography ──
          p: ({ children }) => (
            <p className="mb-4 last:mb-0 text-gray-700">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
          
          // ── Headings ──
          h1: ({ children }) => (
            <h1 className="flex items-center text-2xl font-extrabold mt-8 mb-4 text-gray-900 tracking-tight border-b border-gray-200 pb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-emerald-600">
                {children}
              </span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-7 mb-3 text-gray-900 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[var(--color-primary)] rounded-full"></div>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
              {children}
            </h3>
          ),

          // ── Lists ──
          ul: ({ children }) => (
            <ul className="mb-5 pl-6 list-none space-y-3 relative">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 pl-6 list-decimal marker:text-[var(--color-primary)] marker:font-bold space-y-3">
              {children}
            </ol>
          ),
          li: ({ children, className }) => {
            return (
              <li className={`relative pl-1 ${className || ""}`}>
                <span className="absolute -left-5 top-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
                <div className="text-gray-700">{children}</div>
              </li>
            );
          },

          // ── Links ──
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center text-[var(--color-primary)] font-medium hover:text-emerald-700 transition-colors duration-200"
            >
              <span className="underline underline-offset-4 decoration-emerald-200 group-hover:decoration-[var(--color-primary)] transition-all">
                {children}
              </span>
              <LinkIcon />
            </a>
          ),

          // ── Tables (Beautiful Styling as Cards) ──
          table: ({ children }) => (
            <div className="my-6 w-full flex flex-col gap-4">
              {children}
            </div>
          ),
          thead: () => null, // Hide headers for a cleaner list look
          tbody: ({ children }) => (
            <div className="flex flex-col gap-4 w-full">
              {children}
            </div>
          ),
          tr: ({ children }) => (
            <div className="bg-white rounded-xl border border-emerald-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] p-5 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 w-full flex flex-col gap-2 relative overflow-hidden group">
              <span className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-primary)] to-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity"></span>
              {children}
            </div>
          ),
          th: () => null,
          td: ({ children }) => (
            <div className="block text-gray-600 text-[14.5px] leading-relaxed first-of-type:font-bold first-of-type:text-[17px] first-of-type:text-gray-900 first-of-type:mb-1 first-of-type:tracking-tight">
              {children}
            </div>
          ),

          // ── Dividers ──
          hr: () => (
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="mx-4 text-gray-300">✦</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
          ),

          // ── Blockquotes ──
          blockquote: ({ children }) => (
            <blockquote className="relative my-6 px-6 py-4 pl-12 bg-emerald-50/50 border border-emerald-100 rounded-xl text-gray-700 italic shadow-sm">
              <QuoteIcon />
              <div className="relative z-10">{children}</div>
            </blockquote>
          ),

          // ── Code Blocks ──
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
              <div className="my-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-[#1e1e1e]">
                {/* Mac OS Style Header */}
                <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#404040]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {match?.[1] || "code"}
                  </div>
                </div>
                <pre className="p-5 overflow-x-auto text-[13.5px] leading-relaxed text-gray-100 font-mono">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code 
                className="bg-gray-100 text-[var(--color-primary)] px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-gray-200 mx-0.5" 
                {...props}
              >
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
