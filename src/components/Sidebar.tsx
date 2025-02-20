
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Building,
  Calendar,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  FolderKanban,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const links = [
    { icon: Home, label: "dashboard", path: "/" },
    { icon: FolderKanban, label: "projects", path: "/projects" },
    { icon: MessageSquare, label: "messages", path: "/messages" },
    { icon: FileText, label: "documents", path: "/documents" },
    { icon: Calendar, label: "timeline", path: "/timeline" },
    { icon: Settings, label: "settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Building className="w-8 h-8 text-primary" />
          <span className="font-semibold text-xl">MurConnect</span>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-gray-600 hover:text-gray-900"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{t(link.label)}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:text-gray-900 hover:bg-muted rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
