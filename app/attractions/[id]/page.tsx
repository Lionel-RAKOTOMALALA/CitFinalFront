"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Clock, Users, Heart, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const attractionData = {
  id: '1',
  title: 'Découverte des Lémuriens à Andasibe',
  location: 'Parc National d\'Andasibe-Mantadia, Madagascar',
  duration: 'Demi-journée (4-5 heures)',
  groupSize: 'Petit groupe (max 6 personnes)',
  price: 225000,
  images: [
    'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg',
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
    'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg',
    'https://images.pexels.com/photos/1325125/pexels-photo-1325125.jpeg'
  ],
  category: 'Nature',
  rating: 4.9,
  reviews: 324,
  difficulty: 'Facile',
  includes: ['Guide naturaliste certifié', 'Droits d\'entrée du parc', 'Transfert depuis votre hôtel à Andasibe', 'Bouteille d\'eau'],
  description: "Partez à la rencontre de la faune endémique de Madagascar dans la forêt tropicale d'Andasibe. Vous partirez à la recherche du plus grand lémurien de l'île, l'Indri Indri, célèbre pour son chant impressionnant qui résonne dans la forêt. Vous observerez également diverses espèces d'oiseaux, de caméléons et d'orchidées rares. Une immersion totale dans la riche biodiversité malgache.",
  itinerary: [
    { time: "07:30", activity: "Prise en charge à votre hôtel à Andasibe et transfert vers l'entrée du parc" },
    { time: "08:00", activity: "Rencontre avec votre guide, briefing et début de la marche dans la forêt" },
    { time: "09:00", activity: "Observation du chant de l'Indri Indri, le plus grand des lémuriens" },
    { time: "10:30", activity: "Découverte de la flore endémique (orchidées, fougères arborescentes) et d'autres lémuriens" },
    { time: "11:30", activity: "Fin de la visite du parc principal et pause rafraîchissement" },
    { time: "12:00", activity: "Retour à votre hébergement" }
  ]
};

export default function AttractionDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState('2');

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary text-primary-foreground">{attractionData.category}</Badge>
              <Badge variant="outline" className={
                attractionData.difficulty === "Facile" ? "text-success border-success/30" : 
                attractionData.difficulty === "Modéré" ? "text-warning border-warning/30" : "text-destructive border-destructive/30"
              }>
                {attractionData.difficulty}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{attractionData.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{attractionData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{attractionData.rating}</span>
                <span>({attractionData.reviews} avis)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{attractionData.duration}</span>
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
                  src={attractionData.images[selectedImage]}
                  alt={attractionData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {attractionData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${attractionData.title} ${index + 1}`}
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
                <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                <TabsTrigger value="included">Inclus</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de cette activité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{attractionData.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Durée</p>
                          <p className="text-sm text-muted-foreground">{attractionData.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Taille du groupe</p>
                          <p className="text-sm text-muted-foreground">{attractionData.groupSize}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Déroulement de l'activité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                      {attractionData.itinerary.map((step, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                            <span className="text-xs font-bold">{step.time}</span>
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border/50 bg-card shadow-sm">
                            <p className="text-sm">{step.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="included" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ce qui est inclus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {attractionData.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-success shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Avis des participants</CardTitle>
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
                          <span className="font-medium">Aventurier du dimanche</span>
                          <span className="text-sm text-muted-foreground">• Il y a 2 semaines</span>
                        </div>
                        <p className="text-muted-foreground">
                          Une expérience incroyable ! Le guide était très professionnel et rassurant pour les débutants. Nous avons vu énormément de poissons colorés et même une tortue. À recommander absolument.
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
                <CardTitle className="text-2xl">Réserver</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">{attractionData.price.toLocaleString()} Ar</span>
                  <span className="text-muted-foreground">/ personne</span>
                </div>
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
                  <label className="text-sm font-medium mb-1 block">Nombre de billets</label>
                  <select 
                    className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                  >
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5 personnes</option>
                  </select>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{attractionData.price.toLocaleString()} Ar x {tickets} personnes</span>
                    <span>{(attractionData.price * parseInt(tickets || '0')).toLocaleString()} Ar</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{(attractionData.price * parseInt(tickets || '0')).toLocaleString()} Ar</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Réserver des places
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Annulation gratuite jusqu'à 48h avant l'activité
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
