
import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockMessages } from "@/mockData";

type Message = {
  id: number;
  sender: string;
  role: string;
  projectId: number;
  projectName: string;
  message: string;
  timestamp: string;
  read: boolean;
  isPinned?: boolean;
  attachments?: {
    id: number;
    name: string;
    type: string;
    url: string;
  }[];
};

type MessagesContextType = {
  messages: Message[];
  markAsRead: (messageId: number) => void;
  markAllAsRead: () => void;
  togglePin: (messageId: number) => void;
  totalUnreadMessages: number;
};

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState(mockMessages.map(msg => ({
    ...msg,
    isPinned: false,
    attachments: []
  })));

  const markAsRead = useCallback((messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setMessages(prevMessages =>
      prevMessages.map(msg => ({ ...msg, read: true }))
    );
  }, []);

  const togglePin = useCallback((messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
      )
    );
  }, []);

  const totalUnreadMessages = messages.filter(m => !m.read).length;

  return (
    <MessagesContext.Provider value={{
      messages,
      markAsRead,
      markAllAsRead,
      togglePin,
      totalUnreadMessages,
    }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};
