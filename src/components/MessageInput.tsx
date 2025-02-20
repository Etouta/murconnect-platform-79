
import { Send, Paperclip } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Send message:", message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-lg border border-gray-200 p-3 h-[100px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-primary transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
