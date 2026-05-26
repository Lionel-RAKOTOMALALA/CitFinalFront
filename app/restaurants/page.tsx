"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Star, MapPin, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const restaurants = [
  {
    id: "1",
    name: "La Varangue",
    location: "Antaninarenina, Antananarivo",
    cuisine: "Malgache & Française",
    rating: 4.8,
    reviews: 245,
    priceRange: "35 000 Ar",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    openingHours: { open: "12:00", close: "22:00" },
    specialties: ["Zébu braisé", "Foie gras de Madagascar", "Camaron flambé"],
    features: ["Terrasse", "Jardin", "Collection d'antiquités", "Réservation recommandée"],
  },
  {
    id: "2",
    name: "Le Pily Pily",
    location: "Andilana, Nosy Be",
    cuisine: "Fruits de mer",
    rating: 4.9,
    reviews: 189,
    priceRange: "85 000 Ar",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    openingHours: { open: "18:00", close: "23:00" },
    specialties: ["Langouste grillée", "Carpaccio d'espadon", "Crabe de mangrove"],
    features: ["Vue panoramique", "Sur un promontoire", "Coucher de soleil exceptionnel"],
  },
  {
    id: "3",
    name: "Le Mad Zébu",
    location: "Belo sur Tsiribihina",
    cuisine: "Traditionnelle",
    rating: 4.7,
    reviews: 112,
    priceRange: "15 000 Ar",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    openingHours: { open: "11:30", close: "21:00" },
    specialties: ["Romazava", "Ravitoto", "Filet de zébu aux baies roses"],
    features: ["Étape incontournable", "Produits locaux", "Ambiance conviviale"],
  },
  {
    id: "4",
    name: "Kudéta",
    location: "Anosy, Antananarivo",
    cuisine: "Fusion",
    rating: 4.6,
    reviews: 156,
    priceRange: "45 000 Ar",
    image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
    openingHours: { open: "18:30", close: "23:30" },
    specialties: ["Ceviche de tilapia", "Magret de canard au miel de litchi", "Tiramisu à la vanille de Mada"],
    features: ["Lounge bar", "Musique live", "Cadre chic et branché"],
  },
];

const cuisineTypes = [
  "Malgache & Française",
  "Fruits de mer",
  "Traditionnelle",
  "Fusion",
  "Italienne",
  "Asiatique",
];
const featureOptions = [
  "Terrasse",
  "Vue mer",
  "Parking",
  "Bar à cocktails",
  "Musique live",
  "Cheminée",
];
const sortOptions = [
  { value: "rating", label: "Trier par note" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name", label: "Trier par nom" },
];

const priceToNumber = (p: string) => parseInt(p.replace(/[^0-9]/g, '')) || 0; // "35 000 Ar" → 35000

function getOpenStatus(hours: { open: string; close: string }) {
  const now = new Date();
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes;
  return {
    isOpen,
    label: isOpen ? `Ferme à ${hours.close}` : `Ouvre à ${hours.open}`,
  };
}

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  const activeFilterCount = selectedCuisines.length + selectedFeatures.length;

  const filtered = useMemo(() => {
    let list = [...restaurants];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.specialties.some((s) => s.toLowerCase().includes(q)) ||
          r.cuisine.toLowerCase().includes(q),
      );
    }

    if (selectedCuisines.length > 0) {
      list = list.filter((r) => selectedCuisines.includes(r.cuisine));
    }

    if (selectedFeatures.length > 0) {
      list = list.filter((r) =>
        selectedFeatures.every((f) =>
          r.features.some((rf) => rf.toLowerCase().includes(f.toLowerCase())),
        ),
      );
    }

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc")
        return priceToNumber(a.priceRange) - priceToNumber(b.priceRange);
      if (sortBy === "price-desc")
        return priceToNumber(b.priceRange) - priceToNumber(a.priceRange);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [searchTerm, selectedCuisines, selectedFeatures, sortBy]);

  function resetFilters() {
    setSearchTerm("");
    setSelectedCuisines([]);
    setSelectedFeatures([]);
    setSortBy("rating");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-heading leading-tight">
              Découvrez les Meilleurs&nbsp;
              <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Restaurants
              </span>
            </h1>
            <p className="text-subtle max-w-2xl mt-4 text-center text-sm md:text-base px-4">
              Savourez la gastronomie locale de Madagascar dans nos restaurants sélectionnés
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filtres */}
          <div className="lg:col-span-1">
            <Card className="sticky top-[80px] rounded-2xl shadow-card border border-border/40 bg-card">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtres
                    {activeFilterCount > 0 && (
                      <Badge className="rounded-full text-[10px] h-5 min-w-5 flex items-center justify-center px-1.5">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      <X className="h-3 w-3" /> Réinitialiser
                    </button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2 space-y-6">
                {/* Recherche */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rechercher
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nom, cuisine..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Cuisines */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Type de cuisine
                  </label>
                  <div className="space-y-2.5">
                    {cuisineTypes.map((cuisine) => {
                      const count = restaurants.filter(
                        (r) => r.cuisine === cuisine,
                      ).length;
                      return (
                        <div
                          key={cuisine}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`cuisine-${cuisine}`}
                              checked={selectedCuisines.includes(cuisine)}
                              onCheckedChange={() =>
                                setSelectedCuisines(
                                  toggleItem(selectedCuisines, cuisine),
                                )
                              }
                            />
                            <label
                              htmlFor={`cuisine-${cuisine}`}
                              className="text-sm cursor-pointer select-none"
                            >
                              {cuisine}
                            </label>
                          </div>
                          {count > 0 && (
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {count}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Caractéristiques
                  </label>
                  <div className="space-y-2.5">
                    {featureOptions.map((feature) => {
                      const count = restaurants.filter((r) =>
                        r.features.some((f) =>
                          f.toLowerCase().includes(feature.toLowerCase()),
                        ),
                      ).length;
                      return (
                        <div
                          key={feature}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={() =>
                                setSelectedFeatures(
                                  toggleItem(selectedFeatures, feature),
                                )
                              }
                            />
                            <label
                              htmlFor={`feature-${feature}`}
                              className="text-sm cursor-pointer select-none"
                            >
                              {feature}
                            </label>
                          </div>
                          {count > 0 && (
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {count}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grille restaurants */}
          <div className="lg:col-span-3">
            {/* Barre résultats + tri */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-subtle text-sm">
                  <span className="font-medium text-foreground">
                    {filtered.length}
                  </span>{" "}
                  restaurant
                  {filtered.length !== 1 ? "s" : ""} trouvé
                  {filtered.length !== 1 ? "s" : ""}
                </p>
                {/* Tags filtres actifs */}
                {selectedCuisines.map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="text-xs rounded-full gap-1 cursor-pointer"
                    onClick={() =>
                      setSelectedCuisines(toggleItem(selectedCuisines, c))
                    }
                  >
                    {c} <X className="h-2.5 w-2.5" />
                  </Badge>
                ))}
                {selectedFeatures.map((f) => (
                  <Badge
                    key={f}
                    variant="secondary"
                    className="text-xs rounded-full gap-1 cursor-pointer"
                    onClick={() =>
                      setSelectedFeatures(toggleItem(selectedFeatures, f))
                    }
                  >
                    {f} <X className="h-2.5 w-2.5" />
                  </Badge>
                ))}
              </div>
              <select
                className="border border-border bg-background text-foreground rounded-md px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* État vide */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-muted-foreground mb-4">
                  Aucun restaurant ne correspond à vos filtres.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {filtered.map((restaurant) => {
                const { isOpen, label } = getOpenStatus(
                  restaurant.openingHours,
                );
                return (
                  <Card
                    key={restaurant.id}
                    className="group w-full sm:w-[270px] border border-border/40 overflow-hidden rounded-2xl bg-card hovder:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="relative overflow-hidden w-full aspect-video">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between">
                        <Badge className="bg-black/55  text-white border-0 rounded-full text-xs font-medium tracking-wide">
                          {/* {restaurant.priceRange} */}
                        </Badge>
                        <Badge className="bg-white/90 text-gray-800 border-0 rounded-full text-xs font-medium">
                          {restaurant.cuisine}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/55 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs font-medium">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {restaurant.rating}
                        <span className="opacity-70 text-[11px]">
                          ({restaurant.reviews})
                        </span>
                      </div>
                    </div>

                    <CardHeader className="p-4 pb-2">
                      <h3 className="font-medium text-base truncate">
                        {restaurant.name}
                      </h3>
                      <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {restaurant.location}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full flex-shrink-0",
                            isOpen ? "bg-green-500" : "bg-red-500",
                          )}
                        />
                        {isOpen ? "Ouvert" : "Fermé"} · {label}
                      </div>
                    </CardHeader>

                    <Separator />

                    <CardFooter className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground tracking-wide">
                        {restaurant.priceRange}
                      </span>

                      <Button
                        asChild
                        size="sm"
                        className="rounded-full shrink-0 gap-1"
                      >
                        <Link href={`/restaurants/${restaurant.id}`}>
                          Réserver <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
