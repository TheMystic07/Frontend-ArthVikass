//@ts-nocheck
'use client';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { marked } from 'marked';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderMessage = (content) => {
    const htmlContent = marked(content);
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 h-[100%] mx-auto stretch overflow-scroll">
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'Vikass: '}
          {renderMessage(m.content)}
        </div>
      ))}
      <div ref={chatEndRef} />
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-2xl p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white">
        <input
          className="w-full"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
