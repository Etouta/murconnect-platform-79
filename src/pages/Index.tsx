
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Building, 
  Calendar, 
  User, 
  Users, 
  EuroIcon, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  LayoutGrid,
  Plus,
  X,
  ChevronDown,
  Maximize2,
  Minimize2
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { mockProjects, mockMessages, mockTimeline } from "@/mockData";
import { useState } from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = {
  activeProjects: mockProjects.filter(p => p.status === "In Progress").length,
  totalTeamMembers: [...new Set(mockProjects.flatMap(p => p.team))].length,
  upcomingDeadlines: mockProjects.filter(p => new Date(p.dueDate) > new Date()).length,
  totalRevenue: mockProjects.reduce((sum, p) => sum + p.price, 0),
  unreadMessages: mockMessages.filter(m => !m.read).length,
  completedProjects: mockTimeline.filter(t => t.status === "completed").length
};

const upcomingEvents = mockTimeline
  .filter(t => t.status !== "completed")
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  .slice(0, 5);

const latestUnreadMessages = mockMessages
  .filter(m => !m.read)
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .slice(0, 3);

const availableWidgets = {
  stats: {
    title: "Statistiques",
    minW: 1,
    minH: 1,
    w: 4,
    h: 1,
  },
  messages: {
    title: "Messages récents",
    minW: 1,
    minH: 2,
    w: 1,
    h: 2,
  },
  timeline: {
    title: "Échéances à venir",
    minW: 1,
    minH: 2,
    w: 1,
    h: 2,
  },
  projects: {
    title: "Projets récents",
    minW: 2,
    minH: 2,
    w: 2,
    h: 2,
  },
};

// Définir le type pour les éléments de la grille
type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const Index = () => {
  const { t } = useLanguage();
  const [activeWidgets, setActiveWidgets] = useState<LayoutItem[]>([
    { i: 'stats', x: 0, y: 0, w: 4, h: 1 },
    { i: 'messages', x: 0, y: 1, w: 1, h: 2 },
    { i: 'timeline', x: 1, y: 1, w: 1, h: 2 },
    { i: 'projects', x: 0, y: 3, w: 2, h: 2 },
  ]);
  const [collapsedWidgets, setCollapsedWidgets] = useState<string[]>([]);

  const toggleWidget = (widgetId: string) => {
    if (collapsedWidgets.includes(widgetId)) {
      setCollapsedWidgets(collapsedWidgets.filter(id => id !== widgetId));
    } else {
      setCollapsedWidgets([...collapsedWidgets, widgetId]);
    }
  };

  const addWidget = (widgetId: keyof typeof availableWidgets) => {
    if (!activeWidgets.find(w => w.i === widgetId)) {
      const widget = availableWidgets[widgetId];
      setActiveWidgets([
        ...activeWidgets,
        {
          i: widgetId,
          x: 0,
          y: Infinity,
          w: widget.w,
          h: widget.h,
        },
      ]);
    }
  };

  const removeWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(w => w.i !== widgetId));
  };

  const renderWidgetContent = (widgetId: string) => {
    switch (widgetId) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Projets actifs</p>
                  <p className="text-2xl font-semibold">{stats.activeProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <EuroIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Revenus totaux</p>
                  <p className="text-2xl font-semibold">{stats.totalRevenue.toLocaleString()}€</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Échéances à venir</p>
                  <p className="text-2xl font-semibold">{stats.upcomingDeadlines}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Messages non lus</p>
                  <p className="text-2xl font-semibold">{stats.unreadMessages}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="divide-y divide-gray-100">
            {latestUnreadMessages.map((message) => (
              <Link
                key={message.id}
                to="/messages"
                className="p-4 hover:bg-gray-50 block"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-50 rounded-full">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{message.sender}</p>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(message.timestamp), "dd MMM yyyy, HH:mm")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      case 'timeline':
        return (
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    event.status === "in-progress" 
                      ? "bg-blue-50" 
                      : event.status === "pending"
                      ? "bg-yellow-50"
                      : "bg-gray-50"
                  }`}>
                    <Clock className={`w-4 h-4 ${
                      event.status === "in-progress"
                        ? "text-blue-500"
                        : event.status === "pending"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Échéance : {format(new Date(event.dueDate), "dd MMM yyyy")}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    event.status === "in-progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {event.status === "in-progress" ? "En cours" : "En attente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'projects':
        return (
          <div className="divide-y divide-gray-100">
            {mockProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.client}
                      </div>
                      <div>{project.dueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <EuroIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{project.price.toLocaleString()}€</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t("welcome.back")}</h1>
          <p className="text-gray-600 mt-1">Voici un aperçu de vos projets et activités</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              <span>Ajouter un widget</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(availableWidgets).map(([id, widget]) => (
                <DropdownMenuItem
                  key={id}
                  onClick={() => addWidget(id as keyof typeof availableWidgets)}
                  disabled={activeWidgets.some(w => w.i === id)}
                >
                  {widget.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <LanguageSwitcher />
        </div>
      </div>

      <GridLayout
        className="layout"
        layout={activeWidgets}
        cols={4}
        rowHeight={200}
        width={1200}
        margin={[16, 16]}
        onLayoutChange={(layout) => setActiveWidgets(layout)}
        draggableHandle=".widget-header"
      >
        {activeWidgets.map((widget) => (
          <div
            key={widget.i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="widget-header p-4 border-b border-gray-100 flex items-center justify-between bg-white cursor-move">
              <h2 className="text-xl font-semibold">
                {availableWidgets[widget.i as keyof typeof availableWidgets].title}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWidget(widget.i)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  {collapsedWidgets.includes(widget.i) ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => removeWidget(widget.i)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className={`p-4 ${collapsedWidgets.includes(widget.i) ? 'hidden' : ''}`}>
              {renderWidgetContent(widget.i)}
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Index;
