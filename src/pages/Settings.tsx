
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>
      {/* Add settings content here */}
    </div>
  );
};

export default Settings;
