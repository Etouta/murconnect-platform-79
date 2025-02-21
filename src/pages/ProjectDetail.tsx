import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  Building, 
  MapPin, 
  Euro, 
  User, 
  Clock, 
  MessageSquare, 
  FileText, 
  Calendar,
  ChevronLeft
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageInput from "@/components/MessageInput";

const mockProject = {
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
  messages: [
    {
      id: 1,
      sender: "John Architect",
      role: "Architect",
      message: "The wall modification plans have been updated. Please review the latest changes.",
      timestamp: "2024-03-20 10:30 AM",
    },
    {
      id: 2,
      sender: "Sarah Engineer",
      role: "Engineer",
      message: "I've reviewed the structural calculations. We need to reinforce the support beams.",
      timestamp: "2024-03-20 11:15 AM",
    },
  ],
  timeline: [
    {
      id: 1,
      title: "Wall Verification",
      description: "Initial assessment of load-bearing wall structure",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 2,
      title: "Permit Processing",
      description: "Obtaining necessary permits from local authorities",
      date: "2024-03-20",
      status: "in-progress",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Structural Analysis Report",
      type: "PDF",
      size: "2.5 MB",
      date: "2024-03-18",
    },
    {
      id: 2,
      name: "Building Permit Application",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-03-19",
    },
  ],
};

const ProjectDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("timeline");
  const [selectedRecipient, setSelectedRecipient] = useState("");

  const handleContactClick = (role: string) => {
    setActiveTab("messages");
    setSelectedRecipient(role);
  };

  return (
    <div>
      <Link 
        to="/projects"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{mockProject.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {mockProject.address}
              </div>
              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4" />
                {mockProject.price.toLocaleString()}€
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {mockProject.client}
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            mockProject.status === "In Progress" 
              ? "bg-blue-100 text-blue-600"
              : "bg-yellow-100 text-yellow-600"
          }`}>
            {mockProject.status}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${mockProject.progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-gray-600">Contacter :</span>
          <div className="flex flex-wrap gap-2">
            {mockProject.team.map((role, index) => (
              <button
                key={index}
                onClick={() => handleContactClick(role)}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="timeline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              {mockProject.timeline.map((item, index) => (
                <div key={item.id} className="relative flex gap-6 pb-6">
                  {index !== mockProject.timeline.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-0 w-px bg-gray-200" />
                  )}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    item.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                  }`}>
                    {item.status === "completed" ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                        item.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{item.description}</p>
                    <p className="text-sm text-gray-500">Due: {item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="mt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockProject.messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{msg.sender}</span>
                      <span className="text-sm text-gray-500">{msg.role}</span>
                    </div>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-600">{msg.message}</p>
                </div>
              ))}
            </div>
            <MessageInput initialRecipient={selectedRecipient} />
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              {mockProject.documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
