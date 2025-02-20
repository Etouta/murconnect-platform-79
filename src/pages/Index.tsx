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
  Minimize2,
  History,
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
import { useUnreadMessages } from "@/hooks/useUnreadMessages";

const stats = {
  activeProjects: mockProjects.filter(p => p.status === "In Progress").length,
  totalTeamMembers: [...new Set(mockProjects.flatMap(p => p.team.map(t => t.name)))].length,
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

const mockActions = [
  { id: 1, user: "Jean Dupont", action: "A modifié le plan", project: "15 Rue de la Paix", timestamp: "2024-03-20T10:30:00" },
  { id: 2, user: "Marie Martin", action: "A ajouté un commentaire", project: "28 Avenue Victor Hugo", timestamp: "2024-03-20T11:15:00" },
  { id: 3, user: "Paul Bernard", action: "A mis à jour le statut", project: "42 Boulevard Haussmann", timestamp: "2024-03-20T14:20:00" },
];

const mockAppointments = [
  { id: 1, title: "Visite de chantier", date: "2024-03-25", time: "10:00", project: "15 Rue de la Paix" },
  { id: 2, title: "Réunion client", date: "2024-03-26", time: "14:30", project: "28 Avenue Victor Hugo" },
  { id: 3, title: "Inspection finale", date: "2024-03-28", time: "09:00", project: "42 Boulevard Haussmann" },
];

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
    w: 2,
    h: 2,
  },
  timeline: {
    title: "Échéances à venir",
    minW: 1,
    minH: 2,
    w: 2,
    h: 2,
  },
  projects: {
    title: "Projets récents",
    minW: 2,
    minH: 2,
    w: 2,
    h: 2,
  },
  actions: {
    title: "Historique des actions",
    minW: 2,
    minH: 2,
    w: 2,
    h: 2,
  },
  calendar: {
    title: "Calendrier des RDV",
    minW: 2,
    minH: 2,
    w: 2,
    h: 2,
  },
};

type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const Index = () => {
  const { t } = useLanguage();
  const { totalUnreadMessages } = useUnreadMessages();
  const [activeWidgets, setActiveWidgets] = useState<LayoutItem[]>([
    { i: 'stats', x: 0, y: 0, w: 12, h: 2 },
    { i: 'messages', x: 0, y: 2, w: 4, h: 4 },
    { i: 'timeline', x: 4, y: 2, w: 4, h: 4 },
    { i: 'projects', x: 8, y: 2, w: 4, h: 4 },
    { i: 'actions', x: 0, y: 6, w: 6, h: 4 },
    { i: 'calendar', x: 6, y: 6, w: 6, h: 4 },
  ]);
  const [collapsedWidgets, setCollapsedWidgets] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

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
            {totalUnreadMessages > 0 && (
              <div className="p-4 text-center">
                <Link
                  to="/messages"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Voir tous les messages ({totalUnreadMessages})
                </Link>
              </div>
            )}
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
      case 'actions':
        return (
          <div className="divide-y divide-gray-100">
            {mockActions.map((action) => (
              <div key={action.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <History className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.user}</p>
                    <p className="text-sm text-gray-600">{action.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">{action.project}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-500">
                        {format(new Date(action.timestamp), "dd MMM yyyy, HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'calendar':
        return (
          <div className="divide-y divide-gray-100">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <Calendar className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.title}</p>
                    <p className="text-sm text-gray-600">{appointment.project}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">
                        {format(new Date(appointment.date), "dd MMM yyyy")}
                      </p>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
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
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              isEditing 
                ? 'bg-primary text-white border-primary hover:bg-primary-hover'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{isEditing ? 'Terminer l\'édition' : 'Éditer les widgets'}</span>
          </button>
          {isEditing && (
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
          )}
          <LanguageSwitcher />
        </div>
      </div>

      <GridLayout
        className="layout"
        layout={activeWidgets}
        cols={12}
        rowHeight={100}
        width={window.innerWidth - 64}
        margin={[16, 16]}
        onLayoutChange={(layout) => isEditing && setActiveWidgets(layout)}
        isDraggable={isEditing}
        isResizable={isEditing}
        draggableHandle=".widget-header"
        maxRows={20}
      >
        {activeWidgets.map((widget) => (
          <div
            key={widget.i}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div 
              className={`widget-header p-4 border-b border-gray-100 flex items-center justify-between bg-white ${
                isEditing ? 'cursor-move' : ''
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {availableWidgets[widget.i as keyof typeof availableWidgets].title}
              </h2>
              {isEditing && (
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
                    className="p-1 hover:bg-red-100 rounded-lg text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div 
              className={`p-4 transition-all ${
                collapsedWidgets.includes(widget.i) ? 'hidden' : ''
              } ${
                isEditing ? 'opacity-75' : ''
              }`}
            >
              {renderWidgetContent(widget.i)}
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Index;
