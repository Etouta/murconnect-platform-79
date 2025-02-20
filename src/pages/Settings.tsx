
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  Bell, 
  Globe, 
  Monitor, 
  Moon,
  Mail,
  MessageSquare,
  Calendar,
  Shield,
  Smartphone,
  Clock,
  Euro
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    darkMode: false,
    messageNotifications: true,
    calendarNotifications: true,
    currency: "EUR",
    timezone: "Europe/Paris",
  });

  const handleSettingChange = (key: keyof typeof settings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>

      <div className="space-y-6">
        {/* Langue */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5" />
            Langue
          </h2>
          <Select
            value={language}
            onValueChange={(value: "fr" | "en") => setLanguage(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Label htmlFor="email-notifications">Notifications par email</Label>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gray-500" />
                <Label htmlFor="push-notifications">Notifications push</Label>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <Label htmlFor="message-notifications">Notifications de messages</Label>
              </div>
              <Switch
                id="message-notifications"
                checked={settings.messageNotifications}
                onCheckedChange={(checked) => handleSettingChange('messageNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Label htmlFor="calendar-notifications">Notifications de calendrier</Label>
              </div>
              <Switch
                id="calendar-notifications"
                checked={settings.calendarNotifications}
                onCheckedChange={(checked) => handleSettingChange('calendarNotifications', checked)}
              />
            </div>
          </div>
        </div>

        {/* Apparence */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5" />
            Apparence
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-gray-500" />
              <Label htmlFor="dark-mode">Mode sombre</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>
        </div>

        {/* Préférences régionales */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5" />
            Préférences régionales
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-gray-500" />
                <Label htmlFor="currency">Devise</Label>
              </div>
              <Select
                value={settings.currency}
                onValueChange={(value) => handleSettingChange('currency', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner la devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar ($)</SelectItem>
                  <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <Label htmlFor="timezone">Fuseau horaire</Label>
              </div>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleSettingChange('timezone', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner le fuseau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/London">Londres (UTC)</SelectItem>
                  <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
