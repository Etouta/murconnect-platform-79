
import { mockMessages, mockProjects } from "@/mockData";
import { useState, useCallback } from "react";

export const useUnreadMessages = () => {
  const [messages, setMessages] = useState(mockMessages);
  const unreadMessages = messages.filter(m => !m.read);
  const totalUnreadMessages = unreadMessages.length;

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

  const getUnreadMessagesForProject = (projectId: number) => {
    return unreadMessages.filter(m => m.projectId === projectId).length;
  };

  const getUnreadMessagesForStatus = (status: string) => {
    const projectIds = mockProjects
      .filter(p => status === "all" ? true : p.status.toLowerCase().replace(" ", "_") === status)
      .map(p => p.id);
    
    return unreadMessages.filter(m => projectIds.includes(m.projectId)).length;
  };

  const getLatestUnreadMessages = (limit: number = 3) => {
    return unreadMessages
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  };

  return {
    messages,
    unreadMessages,
    totalUnreadMessages,
    getUnreadMessagesForProject,
    getUnreadMessagesForStatus,
    getLatestUnreadMessages,
    markAsRead,
    markAllAsRead,
  };
};
