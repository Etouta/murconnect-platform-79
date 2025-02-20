
import { mockProjects } from "@/mockData";

export const useUnreadMessages = () => {
  const totalUnreadMessages = mockProjects.reduce((sum, project) => sum + project.unreadMessages, 0);

  const getUnreadMessagesForProject = (projectId: number) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project?.unreadMessages || 0;
  };

  const getUnreadMessagesForStatus = (status: string) => {
    return mockProjects
      .filter(p => status === "all" ? true : p.status.toLowerCase().replace(" ", "_") === status)
      .reduce((sum, project) => sum + project.unreadMessages, 0);
  };

  return {
    totalUnreadMessages,
    getUnreadMessagesForProject,
    getUnreadMessagesForStatus,
  };
};
