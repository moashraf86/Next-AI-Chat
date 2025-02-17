"use client";

import { useChat } from "ai/react";
import clsx from "clsx";
import Markdown from "react-markdown";
import { useState } from "react";

export default function Chat() {
  const [isThinking, setIsThinking] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onResponse: () => {
      setIsThinking(false);
    },
  });

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsThinking(true);
    handleSubmit(e);
  };

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
          <blockquote className="block mb-6 border-l-2 border-l-muted pl-4 text-muted-foreground">
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
    return <Markdown>{content}</Markdown>;
  };

  return (
    <div className="flex flex-col w-full max-w-lg py-24 mx-auto stretch">
      {messages.map((m) => (
        <div
          key={m.id}
          className={clsx(
            "mb-4",
            m.role === "assistant" && "markdown",
            m.role === "user" && "flex justify-end"
          )}
        >
          <div
            className={clsx(
              m.role === "user" && "py-2 px-3 bg-muted rounded-lg"
            )}
          >
            {processMessage(m.content)}
          </div>
        </div>
      ))}

      {isThinking && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
          <div className="text-sm text-zinc-500">AI is thinking...</div>
        </div>
      )}

      <form
        onSubmit={handleChatSubmit}
        className="fixed bottom-0 w-full max-w-lg p-2 mb-8 "
      >
        <input
          className="w-full bg-background flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
