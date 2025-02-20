
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, MapPin, Euro, User, Clock, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const mockProjects = [
  {
    id: 1,
    title: "15 Rue de la Paix",
    address: "Paris 75002",
    price: 25000,
    status: "In Progress",
    client: "Jean Dupont",
    dueDate: "2024-04-15",
    progress: 65,
    team: ["Architect", "Engineer", "Constructor"],
    description: "Load-bearing wall modification for open space concept",
    unreadMessages: 2,
  },
  {
    id: 2,
    title: "28 Avenue Victor Hugo",
    address: "Lyon 69006",
    price: 18500,
    status: "Pending",
    client: "Marie Martin",
    dueDate: "2024-05-01",
    progress: 30,
    team: ["Architect", "Engineer"],
    description: "Structural reinforcement for wall removal",
    unreadMessages: 1,
  },
];

const Projects = () => {
  const { t } = useLanguage();

  const handleNewProject = () => {
    toast({
      title: "Nouveau projet",
      description: "La création d'un nouveau projet a été initiée",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("projects")}</h1>
        <button
          onClick={handleNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Nouveau projet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{project.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === "In Progress" 
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {project.status}
                </span>
                {project.unreadMessages > 0 && (
                  <Link 
                    to="/messages" 
                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full hover:bg-red-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.unreadMessages} messages non lus
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-600">
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
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Due: {project.dueDate}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.team.map((role, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {role}
                  </span>
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
