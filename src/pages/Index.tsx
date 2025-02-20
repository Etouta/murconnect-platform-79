
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Calendar, User, Users } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const mockProjects = [
  {
    id: 1,
    title: "15 Rue de la Paix",
    status: "In Progress",
    client: "Jean Dupont",
    date: "2024-03-15",
    team: ["Architect", "Engineer", "Constructor"],
  },
  // Add more mock projects
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("welcome.back")}</h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Projects</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Team Members</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Upcoming Deadlines</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold">{t("projects")}</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {mockProjects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {project.client}
                    </div>
                    <div>{project.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.team.map((member, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
