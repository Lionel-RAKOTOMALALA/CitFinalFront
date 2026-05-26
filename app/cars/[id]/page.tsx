"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Star, Users, Fuel, Settings, Heart, Share2, Check, MapPin, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const carData = {
  id: '1',
  brand: 'Toyota',
  model: 'Corolla',
  type: 'Économique',
  year: 2023,
  seats: 5,
  transmission: 'Automatique',
  fuelType: 'Hybride',
  pricePerDay: 45,
  images: [
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    'https://images.pexels.com/photos/3354515/pexels-photo-3354515.jpeg'
  ],
  features: ['Climatisation', 'GPS intégré', 'Bluetooth', 'Ports USB', 'Régulateur de vitesse', 'Caméra de recul', 'Apple CarPlay / Android Auto'],
  rating: 4.5,
  reviews: 89,
  available: true,
  description: "La Toyota Corolla est la voiture idéale pour vos déplacements en ville comme sur autoroute. Économique, fiable et très confortable, elle offre un espace généreux pour les passagers et les bagages. Profitez de ses équipements modernes et de sa motorisation hybride pour un trajet agréable, silencieux et respectueux de l'environnement.",
  specs: {
    engine: "1.8L Hybride",
    power: "122 ch",
    doors: "5 portes",
    luggage: "2 grandes valises, 1 petite",
    consumption: "4.5L / 100km"
  }
};

export default function CarDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Aéroport International');

  // Calculate days for the demo
  const calculateTotal = () => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const days = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-background">{carData.type}</Badge>
              <Badge className={carData.available ? "bg-success" : "bg-destructive text-white"}>
                {carData.available ? "Disponible" : "Indisponible"}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{carData.brand} {carData.model} <span className="text-muted-foreground font-normal text-2xl">{carData.year}</span></h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{carData.rating}</span>
                <span>({carData.reviews} avis)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={carData.images[selectedImage]}
                  alt={`${carData.brand} ${carData.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {carData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${carData.brand} ${carData.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Users className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">{carData.seats} Places</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Settings className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">{carData.transmission}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Fuel className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">{carData.fuelType}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Info className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium">{carData.specs.doors}</span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="features">Équipements</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de ce véhicule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{carData.description}</p>
                    <h4 className="font-semibold mb-3">Spécifications techniques :</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Moteur</span>
                        <span className="font-medium">{carData.specs.engine}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Puissance</span>
                        <span className="font-medium">{carData.specs.power}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Capacité bagages</span>
                        <span className="font-medium">{carData.specs.luggage}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Consommation mixte</span>
                        <span className="font-medium">{carData.specs.consumption}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Équipements inclus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {carData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-success shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Avis des locataires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                            ))}
                          </div>
                          <span className="font-medium">Conducteur vérifié</span>
                          <span className="text-sm text-muted-foreground">• Il y a 3 semaines</span>
                        </div>
                        <p className="text-muted-foreground">
                          Voiture en excellent état, très propre et économique grâce à son moteur hybride. Parfaite pour explorer la région. La prise en charge a été rapide et sans accroc.
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl">Location</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">{carData.pricePerDay}€</span>
                  <span className="text-muted-foreground">/ jour</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Lieu de prise en charge</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select 
                      className="w-full border rounded-md pl-9 pr-3 py-2 bg-background text-foreground h-10"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    >
                      <option value="Aéroport International">Aéroport International</option>
                      <option value="Gare Centrale">Gare Centrale</option>
                      <option value="Centre-ville">Agence Centre-ville</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Retrait</label>
                    <Input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Retour</label>
                    <Input
                      type="date"
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Prix de base ({days} jours)</span>
                    <span>{carData.pricePerDay * days}€</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Assurance standard</span>
                    <span>Inclus</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Taxes (20%)</span>
                    <span>{Math.round(carData.pricePerDay * days * 0.2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{Math.round(carData.pricePerDay * days * 1.2)}€</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" disabled={!carData.available}>
                  {carData.available ? "Réserver ce véhicule" : "Actuellement indisponible"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 mt-2">
                  <Check className="h-3 w-3" /> Kilométrage illimité inclus
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
