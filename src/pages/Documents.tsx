
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Search, 
  FileText, 
  Filter,
  Calendar,
  Building,
  Users,
  Clock,
  ChevronDown 
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

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
  },
];

const Documents = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    project: "",
    stage: "",
    stakeholder: "",
  });

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProject = !filters.project || doc.project === filters.project;
    const matchesStage = !filters.stage || doc.stage === filters.stage;
    const matchesStakeholder = !filters.stakeholder || 
      doc.stakeholders.includes(filters.stakeholder);

    return matchesSearch && matchesProject && matchesStage && matchesStakeholder;
  });

  const uniqueProjects = [...new Set(mockDocuments.map(doc => doc.project))];
  const uniqueStages = [...new Set(mockDocuments.map(doc => doc.stage))];
  const uniqueStakeholders = [...new Set(mockDocuments.flatMap(doc => doc.stakeholders))];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("documents")}</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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

        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="font-medium">{doc.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{doc.type} • {doc.size}</span>
                    <span>•</span>
                    <span>{doc.project}</span>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
