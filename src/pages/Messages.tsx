
import { useLanguage } from "@/contexts/LanguageContext";

const Messages = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("messages")}</h1>
      {/* Add message content here */}
    </div>
  );
};

export default Messages;
