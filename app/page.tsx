"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: (response) => console.log(response),
  });

  // Function to process messages and render them accordingly
  const processMessage = (content: string) => {
    const thinkMatch = content.match(/<think>(.*?)<\/think>/s);
    if (thinkMatch) {
      const thoughtContent = thinkMatch[1];
      const remainingContent = content
        .replace(/<think>.*?<\/think>/s, "")
        .trim();
      return (
        <>
          <blockquote className="block italic mb-6 border-l border-l-gray-600 pl-4">
            {thoughtContent.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </blockquote>
          {remainingContent && (
            <Markdown className="markdown whitespace-pre-wrap">
              {remainingContent}
            </Markdown>
          )}
        </>
      );
    }
    return <Markdown className="whitespace-pre-wrap">{content}</Markdown>;
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="mb-4">
          <div className="font-bold mb-2">
            {m.role === "user" ? "User: " : "AI: "}
          </div>
          {processMessage(m.content)}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
