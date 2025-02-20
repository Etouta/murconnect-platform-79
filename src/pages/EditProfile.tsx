import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, CreditCard, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PaymentWizard = () => {
  const [step, setStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const { toast } = useToast();

  const handleChange = (key: keyof typeof paymentDetails, value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Moyen de paiement mis à jour",
      description: "Vos informations de paiement ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      {step === 1 && (
        <>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardHolder">Titulaire de la carte</Label>
              <Input
                id="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={(e) => handleChange('cardHolder', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={(e) => handleChange('cardNumber', e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)}>Suivant</Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="space-y-4">
            <div>
              <Label htmlFor="expiryDate">Date d'expiration</Label>
              <Input
                id="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                maxLength={3}
                value={paymentDetails.cvv}
                onChange={(e) => handleChange('cvv', e.target.value)}
                placeholder="123"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Retour
            </Button>
            <Button onClick={handleSubmit}>Enregistrer</Button>
          </div>
        </>
      )}
    </div>
  );
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+33 6 12 34 56 78",
    bio: "Architecte passionné",
    company: "Architecture Studio",
    position: "Architecte principal",
    address: "15 rue de la Paix, 75002 Paris",
    website: "www.johndoe-architecte.fr",
  });

  const handleChange = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
    navigate("/settings");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre photo a été mise à jour avec succès.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/settings")}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Modifier le profil</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Photo de profil</h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="flex items-center gap-2 text-primary hover:text-primary-hover">
                  <Upload className="w-4 h-4" />
                  <span>Changer la photo</span>
                </div>
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <p className="text-sm text-muted-foreground mt-1">
                JPG, GIF ou PNG. 1MB max.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
          
          <div>
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Moyens de paiement</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Carte principale
                </CardTitle>
                <CardDescription>
                  Gérez vos informations de paiement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  ●●●● ●●●● ●●●● 4242
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Modifier le moyen de paiement</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Modifier le moyen de paiement</DialogTitle>
                      <DialogDescription>
                        Mettez à jour vos informations de paiement en toute sécurité.
                      </DialogDescription>
                    </DialogHeader>
                    <PaymentWizard />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informations professionnelles</h2>
          
          <div>
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              value={profile.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              value={profile.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/settings")}
          >
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
