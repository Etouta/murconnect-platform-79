
import { useLanguage } from "@/contexts/LanguageContext";

const Documents = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("documents")}</h1>
      {/* Add documents content here */}
    </div>
  );
};

export default Documents;
