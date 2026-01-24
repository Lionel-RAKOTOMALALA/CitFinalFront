"use client";

import { useState } from "react";
import { Search, Filter, Star, MapPin, ChevronRight, Wifi, Waves, Sparkles, UtensilsCrossed, ParkingCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const hotels = [
  {
    id: '1',
    name: 'Oceanfront Paradise Resort',
    location: 'Coastal Bay',
    rating: 4.8,
    reviews: 128,
    price: 199,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    amenities: ['WiFi', 'Piscine', 'Spa', 'Restaurant'],
    availableRooms: 3,
    discount: true,
  },
  {
    id: '2',
    name: 'Tropical Haven Hotel & Spa',
    location: 'Palm Beach',
    rating: 4.7,
    reviews: 96,
    price: 159,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    amenities: ['WiFi', 'Piscine', 'Spa'],
    availableRooms: 5,
    discount: false,
  },
  {
    id: '3',
    name: 'Sunrise Beachfront Suites',
    location: 'Crystal Shores',
    rating: 4.9,
    reviews: 203,
    price: 259,
    image: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg',
    amenities: ['WiFi', 'Piscine', 'Spa', 'Restaurant', 'Parking'],
    availableRooms: 1,
    discount: true,
  },
  {
    id: '4',
    name: 'Urban Luxury Downtown Hotel',
    location: 'Centre-ville',
    rating: 4.6,
    reviews: 168,
    price: 179,
    image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg',
    amenities: ['WiFi', 'Restaurant', 'Parking'],
    availableRooms: 8,
    discount: false,
  },
  {
    id: '5',
    name: 'Urban Luxury Downtown Hotel',
    location: 'Centre-ville',
    rating: 4.6,
    reviews: 168,
    price: 179,
    image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg',
    amenities: ['WiFi', 'Restaurant', 'Parking'],
    availableRooms: 8,
    discount: false,
  },
  {
    id: '6',
    name: 'Urban Luxury Downtown Hotel',
    location: 'Centre-ville',
    rating: 4.6,
    reviews: 168,
    price: 179,
    image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg',
    amenities: ['WiFi', 'Restaurant', 'Parking'],
    availableRooms: 8,
    discount: false,
  },
];

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-4 w-4" />,
    Piscine: <Waves className="h-4 w-4" />,
    Spa: <Sparkles className="h-4 w-4" />,
    Restaurant: <UtensilsCrossed className="h-4 w-4" />,
    Parking: <ParkingCircle className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-[#1C252E] dark:text-white leading-tight">
              Trouvez Votre &nbsp;
              <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Hôtel Parfait
              </span>
            </h1>
            <p className="text-[#637381] max-w-2xl mt-4 text-center text-sm md:text-base px-4">
              Découvrez notre sélection d'hôtels de luxe dans la région Sud
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-[80px] border-none rounded-2xl shadow-[0_0_2px_0_rgba(145,158,171,0.2),0_12px_24px_-4px_rgba(145,158,171,0.12)] dark:shadow-none">
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
                      placeholder="Nom ou lieu..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Prix par nuit: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Équipements</label>
                  <div className="space-y-3">
                    {['WiFi', 'Piscine', 'Spa', 'Restaurant', 'Parking'].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            } else {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            }
                          }}
                        />
                        <label htmlFor={amenity} className="text-sm cursor-pointer">
                          {amenity}
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

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <p className="text-[#637381] text-sm md:text-base">
                {hotels.length} hôtels trouvés
              </p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Trier par prix</option>
                <option>Trier par note</option>
                <option>Trier par nom</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="group w-full sm:w-[270px] border-none overflow-hidden rounded-2xl
                   shadow-[0_0_2px_0_rgba(145,158,171,0.2),0_12px_24px_-4px_rgba(145,158,171,0.12)]
                   dark:shadow-none"
                >
                  <div className="relative overflow-hidden w-full aspect-square">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {hotel.discount && (
                      <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 bg-primary text-primary-foreground"
                      >
                        Special
                      </Badge>
                    )}

                    <Badge
                      variant="outline"
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-xs"
                    >
                      {hotel.availableRooms} rooms left
                    </Badge>
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-1 hover:underline cursor-pointer">
                      {hotel.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {hotel.location}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 pb-2">
                    <div className="flex flex-wrap gap-3">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="text-muted-foreground/60">
                          {amenityIcons[amenity]}
                        </div>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-xs text-muted-foreground/60 font-medium">
                          +{hotel.amenities.length - 4}
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter
                    className="p-4 pt-2 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    style={{ borderTop: "dashed 2px rgba(145 158 171 / 20%)" }}
                  >
                    <div>
                      <span className="font-bold text-lg">${hotel.price}</span>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        / night
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({hotel.reviews} avis)
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