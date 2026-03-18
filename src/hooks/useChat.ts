import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { chatService } from '../services';

interface UseChatState {
  messages: ChatMessage[];
  quickReplies: string[];
  isLoading: boolean;
  error: Error | null;
}

interface UseChatResult extends UseChatState {
  sendMessage: (content: string) => Promise<void>;
  handleQuickReply: (reply: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatResult {
  const [state, setState] = useState<UseChatState>({
    messages: [
      {
        id: '1',
        type: 'assistant',
        content:
          "Great progress today! You've logged 1,847 calories across 4 meals. How are you feeling after lunch?",
        timestamp: new Date(),
      },
    ],
    quickReplies: chatService.getInitialQuickReplies(),
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      quickReplies: [],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await chatService.sendMessage(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        quickReplies: response.quickReplies || [],
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          err instanceof Error ? err : new Error('Failed to send message'),
      }));
    }
  }, []);

  const handleQuickReply = useCallback(
    async (reply: string) => {
      await sendMessage(reply);
    },
    [sendMessage]
  );

  const clearMessages = useCallback(() => {
    setState({
      messages: [],
      quickReplies: chatService.getInitialQuickReplies(),
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    handleQuickReply,
    clearMessages,
  };
}
