
import { useLanguage } from "@/contexts/LanguageContext";
import MessageInput from "@/components/MessageInput";
import { Search } from "lucide-react";
import { useState } from "react";

const mockMessages = [
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
  }
];

const Messages = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("messages")}</h1>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="p-2 border-b border-gray-100">
            <div className="flex gap-2">
              {["all", "unread", "archived"].map((type) => (
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
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{msg.sender}</h3>
                    <p className="text-sm text-gray-500">{msg.role}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {msg.timestamp}
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
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold">Project: 15 Rue de la Paix</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
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
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Messages;
