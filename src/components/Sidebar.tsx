
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, onCollapsedChange }: SidebarProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { totalUnreadMessages } = useUnreadMessages();

  const links = [
    { icon: Home, label: "dashboard", path: "/" },
    { icon: FolderKanban, label: "projects", path: "/projects" },
    { icon: MessageSquare, label: "messages", path: "/messages", badge: totalUnreadMessages },
    { icon: FileText, label: "documents", path: "/documents" },
    { icon: Calendar, label: "timeline", path: "/timeline" },
    { icon: Settings, label: "settings", path: "/settings" },
  ];

  return (
    <aside 
      className={`
        ${isCollapsed ? 'w-16' : 'w-64'}
        h-screen bg-white border-r border-gray-200 fixed left-0 top-0 
        transition-all duration-300 z-30 overflow-hidden
        flex flex-col
      `}
    >
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-4">
          <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
            <Building className="w-8 h-8 text-primary shrink-0" />
            <span className={`font-semibold text-xl transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
              MurConnect
            </span>
          </div>

          <div className={`mb-6 pb-4 border-b border-gray-200 ${isCollapsed ? 'px-0 flex justify-center' : ''}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <Avatar className="ring-2 ring-primary/10">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
                <h3 className="font-medium">John Doe</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                  <select className="bg-transparent border-none p-0 text-sm cursor-pointer hover:text-gray-900 transition-colors">
                    <option value="online">En ligne</option>
                    <option value="busy">Occupé</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative
                  group hover:bg-gray-50
                  ${location.pathname === link.path
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "text-gray-600 hover:text-gray-900"
                  } ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <link.icon className={`w-5 h-5 shrink-0 transition-transform ${
                  !isCollapsed && location.pathname === link.path ? 'scale-110' : ''
                }`} />
                <span className={`transition-opacity duration-300 font-medium ${
                  isCollapsed ? 'opacity-0 w-0 overflow-hidden' : ''
                }`}>
                  {t(link.label)}
                </span>
                {link.badge && link.badge > 0 && (
                  <span className={`
                    bg-red-500 text-white text-xs px-2 py-1 rounded-full
                    ${isCollapsed 
                      ? 'absolute -top-1 -right-1' 
                      : 'absolute right-3 top-1/2 -translate-y-1/2'
                    }
                  `}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className={`p-4 border-t border-gray-200 mt-auto ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button className={`
          flex items-center gap-3 px-3 py-2.5 w-full
          text-gray-600 hover:text-gray-900 hover:bg-gray-50
          rounded-lg transition-colors
          ${isCollapsed ? 'justify-center' : ''}
        `}>
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={`transition-opacity duration-300 font-medium ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
            {t("logout")}
          </span>
        </button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 bg-white border shadow-sm hover:bg-gray-100"
        onClick={() => onCollapsedChange(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </aside>
  );
};

export default Sidebar;
