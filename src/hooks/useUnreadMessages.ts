
import { mockMessages, mockProjects } from "@/mockData";

export const useUnreadMessages = () => {
  const unreadMessages = mockMessages.filter(m => !m.read);
  const totalUnreadMessages = unreadMessages.length;

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
    totalUnreadMessages,
    getUnreadMessagesForProject,
    getUnreadMessagesForStatus,
    getLatestUnreadMessages,
    unreadMessages,
  };
};
