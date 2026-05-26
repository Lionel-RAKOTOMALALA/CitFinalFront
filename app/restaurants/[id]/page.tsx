"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Clock, ChefHat, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const restaurantData = {
  id: "1",
  name: "Le Jardin Tropical",
  location: "Centre-ville, Région Sud",
  cuisine: "Française",
  rating: 4.6,
  reviews: 89,
  priceRange: "€€€",
  images: [
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
  ],
  openingHours: { open: "18:00", close: "23:00" },
  specialties: ["Bouillabaisse", "Coq au vin", "Tarte Tatin"],
  features: ["Terrasse", "Parking", "Réservation recommandée", "Vue panoramique", "Accès handicapé"],
  description: "Découvrez une expérience culinaire inoubliable au cœur de la ville. Notre chef étoilé prépare des plats traditionnels français avec une touche moderne, en utilisant uniquement des ingrédients locaux de saison. Profitez de notre magnifique terrasse pour un dîner romantique ou un repas d'affaires.",
  menus: [
    {
      title: "Menu Découverte",
      price: 65,
      description: "Une introduction parfaite à notre cuisine en 3 services.",
      items: ["Amuse-bouche", "Entrée au choix", "Plat principal au choix", "Dessert du moment"]
    },
    {
      title: "Menu Dégustation",
      price: 95,
      description: "Un voyage gastronomique complet en 6 services.",
      items: ["Amuse-bouche", "Deux entrées", "Poisson", "Viande", "Sélection de fromages", "Dessert"]
    }
  ]
};

export default function RestaurantDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary text-primary-foreground">{restaurantData.cuisine}</Badge>
              <span className="text-muted-foreground font-medium">{restaurantData.priceRange}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurantData.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{restaurantData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{restaurantData.rating}</span>
                <span>({restaurantData.reviews} avis)</span>
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
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={restaurantData.images[selectedImage]}
                  alt={restaurantData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {restaurantData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${restaurantData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="menus">Menus</TabsTrigger>
                <TabsTrigger value="features">Détails</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{restaurantData.description}</p>
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Ouvert aujourd'hui : {restaurantData.openingHours.open} - {restaurantData.openingHours.close}</span>
                    </div>
                    <h4 className="font-semibold mb-3">Spécialités du chef :</h4>
                    <ul className="space-y-2">
                      {restaurantData.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChefHat className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span className="text-muted-foreground">{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="menus" className="space-y-4">
                {restaurantData.menus.map((menu, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{menu.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{menu.description}</p>
                          <ul className="space-y-2">
                            {menu.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{menu.price}€</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Caractéristiques et services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {restaurantData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
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
                    <CardTitle>Avis des clients</CardTitle>
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
                          <span className="font-medium">Client satisfait</span>
                          <span className="text-sm text-muted-foreground">• Il y a 1 mois</span>
                        </div>
                        <p className="text-muted-foreground">
                          Excellent repas ! Le cadre est magnifique et le service est très attentionné. Les plats étaient délicieux de l'entrée au dessert. Je recommande vivement la bouillabaisse.
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
                <CardTitle className="text-2xl">Réserver une table</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Heure</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Nombre de personnes</label>
                  <select 
                    className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5 personnes</option>
                    <option value="6">6+ personnes</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full" size="lg">
                    Confirmer la réservation
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Une confirmation vous sera envoyée par email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
