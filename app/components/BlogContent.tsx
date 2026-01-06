"use client";

import SafeContent from './SafeContent';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg prose-invert max-w-none prose-headings:text-[#c1dedc] prose-p:text-[#ffecc6] prose-a:text-[#ffecc6] hover:prose-a:opacity-80 prose-strong:text-[#ffecc6] prose-em:text-[#ffecc6] prose-li:text-[#ffecc6]">
      <SafeContent content={content} />
    </div>
  );
}
