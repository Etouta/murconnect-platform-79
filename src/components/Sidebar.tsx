
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
  Circle,
  PlusCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const unreadMessages = 3; // Simulated unread messages count

  const links = [
    { icon: Home, label: "dashboard", path: "/" },
    { icon: FolderKanban, label: "projects", path: "/projects" },
    { icon: MessageSquare, label: "messages", path: "/messages", badge: unreadMessages },
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

        <div className="mb-6 p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                <select className="bg-transparent border-none p-0 text-sm">
                  <option value="online">En ligne</option>
                  <option value="busy">Occupé</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                location.pathname === link.path
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-gray-600 hover:text-gray-900"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{t(link.label)}</span>
              {link.badge && link.badge > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {link.badge}
                </span>
              )}
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
