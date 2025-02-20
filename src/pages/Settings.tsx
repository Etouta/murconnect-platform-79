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
  Euro,
  User,
  Lock,
  Trash2,
  UserCog,
  Eye,
  AlertTriangle,
  Download,
  Upload,
  Palette
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Profile settings
    username: "JohnDoe",
    email: "john@example.com",
    fullName: "John Doe",
    bio: "Architecte passionné",
    profileVisibility: "public",
    newsletter: true,
    twoFactorAuth: false,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    messageNotifications: true,
    calendarNotifications: true,
    marketingNotifications: false,
    eventReminders: true,

    // Appearance
    darkMode: false,
    fontSize: "medium",
    colorTheme: "blue",

    // Privacy & Security
    profilePrivacy: "public",
    showEmail: true,
    showPhone: false,
    activityStatus: true,

    // Regional
    currency: "EUR",
    timezone: "Europe/Paris",
    dateFormat: "DD/MM/YYYY",
    measurementUnit: "metric"
  });

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Notification de mise à jour
    toast({
      title: "Paramètre mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simuler un upload
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès.",
      });
    }
  };

  const handleExportData = () => {
    // Simuler l'export des données
    toast({
      title: "Export des données",
      description: "Vos données ont été exportées avec succès.",
    });
  };

  const handleDeleteAccount = () => {
    // Simuler la suppression du compte
    toast({
      title: "Suppression du compte",
      description: "Cette action est irréversible. Contactez le support pour plus d'informations.",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>

      <div className="space-y-6">
        {/* Profil */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil
            </h2>
            <Button onClick={() => navigate("/edit-profile")}>
              Modifier le profil
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div>
                <h3 className="font-semibold">{settings.fullName}</h3>
                <p className="text-sm text-muted-foreground">{settings.email}</p>
              </div>
            </div>
          </div>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Label htmlFor="newsletter">Newsletter</Label>
              </div>
              <Switch
                id="newsletter"
                checked={settings.newsletter}
                onCheckedChange={(checked) => handleSettingChange('newsletter', checked)}
              />
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" />
            Sécurité
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <Label htmlFor="2fa">Double authentification</Label>
              </div>
              <Switch
                id="2fa"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
          </div>
        </div>

        {/* Vie privée */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5" />
            Confidentialité
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCog className="w-4 h-4 text-gray-500" />
                <Label htmlFor="profile-visibility">Visibilité du profil</Label>
              </div>
              <Select
                value={settings.profilePrivacy}
                onValueChange={(value) => handleSettingChange('profilePrivacy', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choisir la visibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Privé</SelectItem>
                  <SelectItem value="contacts">Contacts uniquement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Apparence */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5" />
            Apparence
          </h2>
          <div className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <Label htmlFor="theme">Thème</Label>
              </div>
              <Select
                value={settings.colorTheme}
                onValueChange={(value) => handleSettingChange('colorTheme', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choisir le thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Bleu</SelectItem>
                  <SelectItem value="green">Vert</SelectItem>
                  <SelectItem value="purple">Violet</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <Globe className="w-4 h-4 text-gray-500" />
                <Label htmlFor="language">Langue</Label>
              </div>
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

        {/* Gestion du compte */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Gestion du compte
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-gray-500" />
                <span>Exporter mes données</span>
              </div>
              <Button variant="outline" onClick={handleExportData}>
                Exporter
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Supprimer mon compte</span>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
