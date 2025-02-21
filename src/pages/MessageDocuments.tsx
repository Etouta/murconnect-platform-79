
import { useParams, useNavigate } from "react-router-dom";
import { useMessages } from "@/contexts/MessagesContext";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessageDocuments = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const { messages } = useMessages();
  const message = messages.find(m => m.id === Number(messageId));
  
  if (!message) {
    return <div>Message non trouvé</div>;
  }

  return (
    <div className="h-full">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Documents de la discussion</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-2">Projet : {message.projectName}</h2>
          <p className="text-gray-600">De : {message.sender}</p>
        </div>

        {message.attachments && message.attachments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="p-4 border border-gray-200 rounded-lg flex items-start justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-sm text-gray-500">{attachment.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Aucun document n'est attaché à cette discussion
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDocuments;
