"use client";

import { useState } from "react";
import { Search, Filter, Star, MapPin, Users, Fuel, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const cars = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    type: 'SUV 4x4',
    year: 2021,
    seats: 7,
    transmission: 'Manuelle',
    fuelType: 'Diesel',
    pricePerDay: 600000,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    features: ['Climatisation', 'Galerie de toit', 'Bluetooth', 'Roue de secours'],
    rating: 4.9,
    reviews: 215,
    available: true
  },
  {
    id: '2',
    brand: 'Nissan',
    model: 'Patrol',
    type: 'SUV 4x4',
    year: 2020,
    seats: 5,
    transmission: 'Automatique',
    fuelType: 'Diesel',
    pricePerDay: 675000,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
    features: ['Climatisation', 'Treuil', 'Bluetooth', 'Réservoir sup.'],
    rating: 4.8,
    reviews: 156,
    available: true
  },
  {
    id: '3',
    brand: 'Renault',
    model: 'Duster 4WD',
    type: 'SUV Compact',
    year: 2023,
    seats: 5,
    transmission: 'Manuelle',
    fuelType: 'Essence',
    pricePerDay: 325000,
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg',
    features: ['Climatisation', 'Garde au sol élevée', 'Bluetooth', 'USB'],
    rating: 4.6,
    reviews: 98,
    available: true
  },
  {
    id: '4',
    brand: 'Hyundai',
    model: 'H1 Staria',
    type: 'Minibus',
    year: 2022,
    seats: 9,
    transmission: 'Manuelle',
    fuelType: 'Diesel',
    pricePerDay: 475000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    features: ['Climatisation bi-zone', 'Vaste coffre', 'Bluetooth'],
    rating: 4.7,
    reviews: 112,
    available: false
  }
];

const carTypes = ['SUV 4x4', 'SUV Compact', 'Minibus', 'Économique', 'Citadine'];
const transmissionTypes = ['Automatique', 'Manuelle'];
const fuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-heading leading-tight">
              Location de&nbsp;
              <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Voitures
              </span>
            </h1>
            <p className="text-subtle max-w-2xl mt-4 text-center text-sm md:text-base px-4">
              Trouvez la voiture idéale pour affronter les pistes et routes de Madagascar
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-[80px] rounded-2xl shadow-card border border-border/40 bg-card">
              <CardHeader className="p-4 pb-2">
                <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtres
                </h3>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Rechercher</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Marque ou modèle..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Car Types */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Type de véhicule</label>
                  <div className="space-y-3">
                    {carTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <label htmlFor={type} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Transmission</label>
                  <div className="space-y-3">
                    {transmissionTypes.map((transmission) => (
                      <div key={transmission} className="flex items-center space-x-2">
                        <Checkbox
                          id={transmission}
                          checked={selectedTransmission.includes(transmission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTransmission([...selectedTransmission, transmission]);
                            } else {
                              setSelectedTransmission(selectedTransmission.filter(t => t !== transmission));
                            }
                          }}
                        />
                        <label htmlFor={transmission} className="text-sm">
                          {transmission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Carburant</label>
                  <div className="space-y-3">
                    {fuelTypes.map((fuel) => (
                      <div key={fuel} className="flex items-center space-x-2">
                        <Checkbox
                          id={fuel}
                          checked={selectedFuel.includes(fuel)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFuel([...selectedFuel, fuel]);
                            } else {
                              setSelectedFuel(selectedFuel.filter(f => f !== fuel));
                            }
                          }}
                        />
                        <label htmlFor={fuel} className="text-sm">
                          {fuel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  Appliquer les filtres
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <p className="text-subtle text-sm md:text-base">
                {cars.length} véhicules trouvés
              </p>
              <select className="border border-border bg-background text-foreground rounded-md px-3 py-2 text-sm">
                <option>Trier par prix</option>
                <option>Trier par note</option>
                <option>Trier par marque</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {cars.map((car) => (
                <Card
                  key={car.id}
                  className={`group w-full sm:w-[270px] border border-border/40 overflow-hidden rounded-2xl shadow-card bg-card ${!car.available ? "opacity-60" : ""}`}
                >
                  <div className="relative overflow-hidden w-full aspect-square">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge
                      className={`absolute top-3 left-3 text-primary-foreground ${car.available ? "bg-success" : "bg-destructive"}`}
                    >
                      {car.available ? "Disponible" : "Indisponible"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-xs"
                    >
                      {car.type}
                    </Badge>
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <Link href={car.available ? `/cars/${car.id}` : "#"}>
                      <h3 className="font-semibold text-base md:text-lg line-clamp-1 hover:underline cursor-pointer">
                        {car.brand} {car.model}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {car.year} • {car.type}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 pb-2">
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 shrink-0" />
                        <span>{car.seats} pl.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{car.fuelType}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{car.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter
                    className="p-4 pt-2 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    style={{ borderTop: "dashed 2px rgba(145 158 171 / 20%)" }}
                  >
                    <div>
                      <span className="font-bold text-lg">{car.pricePerDay.toLocaleString()} Ar</span>
                      <span className="text-muted-foreground text-sm"> / jour</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{car.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({car.reviews} avis)
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}