
import { useLanguage } from "@/contexts/LanguageContext";
import MessageInput from "@/components/MessageInput";
import { Search, Mail, MailOpen } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const mockMessages = [
  {
    id: 1,
    sender: "John Architect",
    role: "Architect",
    projectId: 1,
    projectName: "15 Rue de la Paix",
    message: "The wall modification plans have been updated. Please review the latest changes.",
    timestamp: "2024-03-20T10:30:00",
    read: false,
  },
  {
    id: 2,
    sender: "Sarah Engineer",
    role: "Engineer",
    projectId: 1,
    projectName: "15 Rue de la Paix",
    message: "I've reviewed the structural calculations. We need to reinforce the support beams.",
    timestamp: "2024-03-20T11:15:00",
    read: true,
  },
  {
    id: 3,
    sender: "Marc Constructor",
    role: "Constructor",
    projectId: 2,
    projectName: "28 Avenue Victor Hugo",
    message: "Team is ready to start on the support beam reinforcement next week.",
    timestamp: "2024-03-20T14:20:00",
    read: false,
  }
];

const Messages = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const filteredMessages = mockMessages
    .filter(msg => {
      if (filter === "unread") return !msg.read;
      if (filter === "read") return msg.read;
      return true;
    })
    .filter(msg => 
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const unreadCount = mockMessages.filter(msg => !msg.read).length;

  const selectedMessageData = mockMessages.find(msg => msg.id === selectedMessage);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          {t("messages")}
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </h1>
      </div>

      <div className="flex gap-6 h-full bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Messages List */}
        <div className="w-1/3 border-r border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="p-2 border-b border-gray-100">
            <div className="flex gap-2">
              {["all", "unread", "read"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    filter === type
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg.id)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  selectedMessage === msg.id ? "bg-gray-50" : ""
                } ${!msg.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <MailOpen className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Mail className="w-4 h-4 text-primary" />
                    )}
                    <div>
                      <h3 className="font-medium">{msg.sender}</h3>
                      <p className="text-sm text-gray-500">{msg.projectName}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {format(new Date(msg.timestamp), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedMessageData ? (
            <>
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold">Project: {selectedMessageData.projectName}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>From: {selectedMessageData.sender}</span>
                  <span>•</span>
                  <span>{format(new Date(selectedMessageData.timestamp), "MMMM d, yyyy h:mm a")}</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-gray-600">{selectedMessageData.message}</p>
              </div>
              <MessageInput />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
