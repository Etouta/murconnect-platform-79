import { useLanguage } from "@/contexts/LanguageContext";
import { Building, MapPin, Euro, User, Clock, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { mockProjects } from "@/mockData";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";

type ProjectStatus = "all" | "in_progress" | "blocked" | "archived";

const Projects = () => {
  const { t } = useLanguage();
  const { totalUnreadMessages, getUnreadMessagesForStatus } = useUnreadMessages();
  const [currentStatus, setCurrentStatus] = useState<ProjectStatus>("in_progress");
  const navigate = useNavigate();

  const handleNewProject = () => {
    toast({
      title: t("new.project"),
      description: t("project.created"),
    });
  };

  const handleMemberClick = (projectId: number, member: { role: string; name: string }) => {
    navigate(`/messages?project=${projectId}&to=${encodeURIComponent(member.name)}&role=${encodeURIComponent(member.role)}`);
  };

  const getFilteredProjects = (status: ProjectStatus) => {
    if (status === "all") return mockProjects;
    return mockProjects.filter(project => 
      project.status.toLowerCase().replace(" ", "_") === status
    );
  };

  const filteredProjects = getFilteredProjects(currentStatus);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200";
      case "blocked":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200";
      case "archived":
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("projects")}</h1>
          <p className="text-muted-foreground">
            {filteredProjects.length} {t("project.count")}
            {totalUnreadMessages > 0 && (
              <span className="ml-2 text-primary">
                ({totalUnreadMessages} {t("unread.messages")})
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{t("new.project")}</span>
        </button>
      </div>

      <Tabs
        defaultValue="in_progress"
        value={currentStatus}
        onValueChange={(value) => setCurrentStatus(value as ProjectStatus)}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="in_progress" className="relative">
            {t("project.filter.in_progress")}
            {getUnreadMessagesForStatus("in_progress") > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {getUnreadMessagesForStatus("in_progress")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="blocked" className="relative">
            {t("project.filter.blocked")}
            {getUnreadMessagesForStatus("blocked") > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {getUnreadMessagesForStatus("blocked")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all" className="relative">
            {t("project.filter.all")}
            {totalUnreadMessages > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {totalUnreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived" className="relative">
            {t("project.filter.archived")}
            {getUnreadMessagesForStatus("archived") > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {getUnreadMessagesForStatus("archived")}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{project.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(project.status)}`}>
                  {t(`project.status.${project.status.toLowerCase().replace(" ", "_")}`)}
                </span>
                {project.unreadMessages > 0 && (
                  <Link 
                    to="/messages" 
                    className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 text-sm rounded-full hover:bg-red-200 dark:hover:bg-red-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.unreadMessages} {t("unread.messages")}
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  <span>{project.price.toLocaleString()}€</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Due: {project.dueDate}
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.team.map((member, index) => (
                  <div key={index} className="space-y-1">
                    <button
                      onClick={() => handleMemberClick(project.id, member)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                    >
                      {t(member.role.toLowerCase())}
                    </button>
                    <div className="text-sm text-gray-600 dark:text-gray-400 px-3">
                      <div>{member.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {member.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
