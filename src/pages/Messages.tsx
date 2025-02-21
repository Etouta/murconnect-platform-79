
import { useLanguage } from "@/contexts/LanguageContext";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import MessageInput from "@/components/MessageInput";
import { Search, Mail, MailOpen, Check, CheckAll } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const { t } = useLanguage();
  const { 
    messages, 
    totalUnreadMessages, 
    markAsRead, 
    markAllAsRead 
  } = useUnreadMessages();
  
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessage(messageId);
    markAsRead(messageId);
  };

  const filteredMessages = messages
    .filter(msg => {
      if (filter === "unread") return !msg.read;
      if (filter === "read") return msg.read;
      return true;
    })
    .filter(msg => 
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const selectedMessageData = messages.find(msg => msg.id === selectedMessage);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          {t("messages")}
          {totalUnreadMessages > 0 && (
            <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
              {totalUnreadMessages} non lus
            </span>
          )}
        </h1>
        {totalUnreadMessages > 0 && (
          <Button 
            variant="outline"
            onClick={markAllAsRead}
            className="flex items-center gap-2"
          >
            <CheckAll className="w-4 h-4" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="flex gap-6 h-full bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Messages List */}
        <div className="w-1/3 border-r border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher dans les conversations..."
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
                onClick={() => handleMessageSelect(msg.id)}
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
                <h2 className="font-semibold">Projet : {selectedMessageData.projectName}</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>De : {selectedMessageData.sender}</span>
                    <span>•</span>
                    <span>{format(new Date(selectedMessageData.timestamp), "MMMM d, yyyy h:mm a")}</span>
                  </div>
                  {selectedMessageData.read && (
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Check className="w-4 h-4" /> Lu
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-gray-600">{selectedMessageData.message}</p>
              </div>
              <MessageInput />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Sélectionnez un message pour le consulter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
