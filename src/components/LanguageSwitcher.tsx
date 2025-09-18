import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/useI18n";

export const LanguageSwitcher = () => {
  const { lang, setLang, t } = useI18n();
  const toggle = () => setLang(lang === "en" ? "ml" : "en");
  return (
    <div className="fixed top-2 right-2 z-50">
      <Button size="sm" variant="outline" onClick={toggle}>
        {t("lang.switch")}:{" "}
        {lang === "en" ? t("lang.english") : t("lang.malayalam")}
      </Button>
    </div>
  );
};
