
import { useLanguage } from "@/contexts/LanguageContext";

const Timeline = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("timeline")}</h1>
      {/* Add timeline content here */}
    </div>
  );
};

export default Timeline;
