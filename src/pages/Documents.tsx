import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Search, 
  FileText, 
  Filter,
  Calendar,
  Building,
  Pin,
  Flag,
  MessageSquare,
  ChevronDown,
  Bell,
  BellOff 
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { mockProjects } from "@/mockData";

const mockDocuments = [
  {
    id: 1,
    title: "Structural Analysis Report",
    type: "PDF",
    size: "2.5 MB",
    date: "2024-03-18T14:30:00",
    project: "15 Rue de la Paix",
    projectId: 1,
    author: "John Architect",
    stage: "Planning",
    stakeholders: ["Architect", "Engineer"],
    isPinned: false,
    isFlagged: false,
  },
  {
    id: 2,
    title: "Building Permit Application",
    type: "PDF",
    size: "1.8 MB",
    date: "2024-03-19T09:15:00",
    project: "15 Rue de la Paix",
    projectId: 1,
    author: "Sarah Engineer",
    stage: "Permitting",
    stakeholders: ["Architect", "Engineer", "City Official"],
    isPinned: false,
    isFlagged: false,
  },
  {
    id: 3,
    title: "Construction Timeline",
    type: "PDF",
    size: "1.2 MB",
    date: "2024-03-20T11:45:00",
    project: "28 Avenue Victor Hugo",
    projectId: 2,
    author: "Marc Constructor",
    stage: "Execution",
    stakeholders: ["Constructor", "Project Manager"],
    isPinned: false,
    isFlagged: false,
  },
];

const Documents = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"current" | "all">("current");
  const [projectNotifications, setProjectNotifications] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    project: "",
    stage: "",
    stakeholder: "",
  });
  const [documents, setDocuments] = useState(mockDocuments);

  const handlePin = (docId: number) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, isPinned: !doc.isPinned } : doc
      )
    );
    toast({
      description: "Document status updated",
    });
  };

  const handleFlag = (docId: number) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, isFlagged: !doc.isFlagged } : doc
      )
    );
    toast({
      description: "Document flagged for review",
    });
  };

  const handleMessageTo = (projectId: number, recipientRole: string) => {
    navigate(`/messages?project=${projectId}&role=${encodeURIComponent(recipientRole)}`);
  };

  const getProjectStatus = (projectName: string) => {
    const project = mockProjects.find(p => p.title === projectName);
    return project?.status || "Unknown";
  };

  const toggleProjectNotifications = (project: string) => {
    setProjectNotifications(prev => ({
      ...prev,
      [project]: !prev[project]
    }));
    toast({
      description: `Notifications ${projectNotifications[project] ? 'disabled' : 'enabled'} for ${project}`,
    });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProject = !filters.project || doc.project === filters.project;
    const matchesStage = !filters.stage || doc.stage === filters.stage;
    const matchesStakeholder = !filters.stakeholder || 
      doc.stakeholders.includes(filters.stakeholder);
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "current" && getProjectStatus(doc.project) === "In Progress");

    return matchesSearch && matchesProject && matchesStage && matchesStakeholder && matchesTab;
  });

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.project]) {
      acc[doc.project] = [];
    }
    acc[doc.project].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  const uniqueProjects = [...new Set(documents.map(doc => doc.project))];
  const uniqueStages = [...new Set(documents.map(doc => doc.stage))];
  const uniqueStakeholders = [...new Set(documents.flatMap(doc => doc.stakeholders))];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("documents")}</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button
              variant={activeTab === "current" ? "default" : "outline"}
              onClick={() => setActiveTab("current")}
            >
              En cours
            </Button>
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
            >
              Tous les projets
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.project}
            onChange={(e) => setFilters(f => ({ ...f, project: e.target.value }))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Projects</option>
            {uniqueProjects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>

          <select
            value={filters.stage}
            onChange={(e) => setFilters(f => ({ ...f, stage: e.target.value }))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Stages</option>
            {uniqueStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>

          <select
            value={filters.stakeholder}
            onChange={(e) => setFilters(f => ({ ...f, stakeholder: e.target.value }))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Stakeholders</option>
            {uniqueStakeholders.map(stakeholder => (
              <option key={stakeholder} value={stakeholder}>{stakeholder}</option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedDocuments).map(([project, docs]) => (
            <div key={project} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link 
                    to={`/projects/${mockProjects.find(p => p.title === project)?.id}`}
                    className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors"
                  >
                    {project}
                  </Link>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    getProjectStatus(project) === "In Progress" 
                      ? "bg-green-100 text-green-600" 
                      : getProjectStatus(project) === "Blocked"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {getProjectStatus(project)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleProjectNotifications(project)}
                  className={projectNotifications[project] ? "text-primary" : ""}
                >
                  {projectNotifications[project] ? (
                    <Bell className="w-4 h-4" />
                  ) : (
                    <BellOff className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="space-y-4">
                {docs.map((doc) => (
                  <div 
                    key={doc.id}
                    className={`flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors ${
                      doc.isPinned ? 'bg-primary/5 border-primary/20' : ''
                    } ${doc.isFlagged ? 'border-l-4 border-l-yellow-500' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{doc.type} • {doc.size}</span>
                          <span>•</span>
                          <span>{doc.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {doc.stage}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(doc.date), "MMM d, yyyy h:mm a")}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePin(doc.id)}
                          className={doc.isPinned ? "text-primary" : ""}
                        >
                          <Pin className={`w-4 h-4 ${doc.isPinned ? "fill-primary" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleFlag(doc.id)}
                          className={doc.isFlagged ? "text-yellow-500" : ""}
                        >
                          <Flag className={`w-4 h-4 ${doc.isFlagged ? "fill-yellow-500" : ""}`} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {doc.stakeholders.map((stakeholder) => (
                              <DropdownMenuItem
                                key={stakeholder}
                                onClick={() => handleMessageTo(doc.projectId, stakeholder)}
                              >
                                Message {stakeholder}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
