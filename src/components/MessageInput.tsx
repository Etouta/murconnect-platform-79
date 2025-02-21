
import { Send, Paperclip, Lock, Globe2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const projectTeam = ["Architect", "Engineer", "Constructor"]; // This should come from props in a real app

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && recipient) {
      console.log("Send message:", {
        message,
        recipient,
        isPrivate,
      });
      setMessage("");
      setRecipient("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border-t">
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1">
          <Select
            value={recipient}
            onValueChange={setRecipient}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un destinataire" />
            </SelectTrigger>
            <SelectContent>
              {projectTeam.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Switch
              id="private-mode"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
            <Label htmlFor="private-mode" className="flex items-center gap-1">
              {isPrivate ? (
                <>
                  <Lock className="w-4 h-4" />
                  Privé
                </>
              ) : (
                <>
                  <Globe2 className="w-4 h-4" />
                  Public
                </>
              )}
            </Label>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 resize-none rounded-lg border border-gray-200 p-3 h-[100px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            disabled={!recipient || !message.trim()}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
