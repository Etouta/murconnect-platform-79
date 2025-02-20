
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "in-progress" | "pending" | "blocked";
}

const mockTimeline: TimelineItem[] = [
  {
    id: 1,
    title: "Wall Verification",
    description: "Initial assessment of load-bearing wall structure",
    dueDate: "2024-03-15",
    status: "completed",
  },
  {
    id: 2,
    title: "Permit Processing",
    description: "Obtaining necessary permits from local authorities",
    dueDate: "2024-03-20",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Engineering Studies",
    description: "Detailed structural analysis and calculations",
    dueDate: "2024-04-01",
    status: "pending",
  },
  {
    id: 4,
    title: "Construction Phase",
    description: "Implementation of approved modifications",
    dueDate: "2024-04-15",
    status: "blocked",
  },
];

const getStatusColor = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-600";
    case "in-progress":
      return "bg-blue-100 text-blue-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "blocked":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusIcon = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5" />;
    case "in-progress":
    case "pending":
      return <Clock className="w-5 h-5" />;
    case "blocked":
      return <AlertCircle className="w-5 h-5" />;
    default:
      return null;
  }
};

const Timeline = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("timeline")}</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6">Project Timeline</h2>
        
        <div className="space-y-6">
          {mockTimeline.map((item, index) => (
            <div
              key={item.id}
              className="relative flex gap-6 pb-6"
            >
              {/* Timeline line */}
              {index !== mockTimeline.length - 1 && (
                <div className="absolute left-6 top-10 bottom-0 w-px bg-gray-200" />
              )}
              
              {/* Status indicator */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(item.status)}`}>
                    {item.status.replace("-", " ")}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
