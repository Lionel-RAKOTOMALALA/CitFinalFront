"use client";

import { useState } from "react";
import { Search, Filter, Star, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const attractions = [
  {
    id: '1',
    title: 'Découverte des Lémuriens à Andasibe',
    location: 'Parc National d\'Andasibe-Mantadia',
    duration: 'Demi-journée',
    groupSize: 'Petit groupe (max 6)',
    price: 225000,
    image: 'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg',
    category: 'Nature',
    rating: 4.9,
    reviews: 324,
    difficulty: 'Facile',
    includes: ['Guide du parc', 'Droits d\'entrée', 'Transport local']
  },
  {
    id: '2',
    title: 'Allée des Baobabs au Coucher du Soleil',
    location: 'Morondava',
    duration: '3 heures',
    groupSize: 'Tous publics',
    price: 125000,
    image: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg',
    category: 'Découverte',
    rating: 4.8,
    reviews: 512,
    difficulty: 'Facile',
    includes: ['Transport aller-retour', 'Rafraîchissements', 'Arrêt photo']
  },
  {
    id: '3',
    title: 'Excursion en Pirogue sur les Pangalanes',
    location: 'Manakara / Tamatave',
    duration: 'Journée complète',
    groupSize: 'Jusqu\'à 8 personnes',
    price: 325000,
    image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg',
    category: 'Aventure',
    rating: 4.7,
    reviews: 189,
    difficulty: 'Modéré',
    includes: ['Piroguier', 'Déjeuner pique-nique', 'Visites de villages']
  },
  {
    id: '4',
    title: 'Trekking dans le Massif de l\'Isalo',
    location: 'Parc National de l\'Isalo, Ranohira',
    duration: '6-8 heures',
    groupSize: 'Petit groupe (max 10)',
    price: 275000,
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
    category: 'Randonnée',
    rating: 4.8,
    reviews: 276,
    difficulty: 'Difficile',
    includes: ['Guide agréé', 'Déjeuner', 'Taxes de parc']
  }
];

const categories = ['Aventure', 'Culture', 'Détente', 'Gastronomie', 'Nature', 'Découverte', 'Randonnée'];
const difficulties = ['Facile', 'Modéré', 'Difficile'];

export default function AttractionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-heading leading-tight">
              Attractions &nbsp;
              <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Expériences
              </span>
            </h1>
            <p className="text-subtle max-w-2xl mt-4 text-center text-sm md:text-base px-4">
              Découvrez des activités uniques et la beauté de Madagascar
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
                      placeholder="Activité ou lieu..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Catégories</label>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium mb-4 block">Difficulté</label>
                  <div className="space-y-3">
                    {difficulties.map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDifficulties([...selectedDifficulties, difficulty]);
                            } else {
                              setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
                            }
                          }}
                        />
                        <label htmlFor={difficulty} className="text-sm">
                          {difficulty}
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

          {/* Attractions Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <p className="text-subtle text-sm md:text-base">
                {attractions.length} expériences trouvées
              </p>
              <select className="border border-border bg-background text-foreground rounded-md px-3 py-2 text-sm">
                <option>Trier par popularité</option>
                <option>Trier par prix</option>
                <option>Trier par note</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {attractions.map((attraction) => (
                <Card
                  key={attraction.id}
                  className="group w-full sm:w-[270px] border border-border/40 overflow-hidden rounded-2xl shadow-card bg-card"
                >
                  <div className="relative overflow-hidden w-full aspect-square">
                    <img
                      src={attraction.image}
                      alt={attraction.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 bg-primary text-primary-foreground"
                    >
                      {attraction.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-xs ${
                        attraction.difficulty === "Facile"
                          ? "text-success"
                          : attraction.difficulty === "Modéré"
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {attraction.difficulty}
                    </Badge>
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <Link href={`/attractions/${attraction.id}`}>
                      <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:underline cursor-pointer">
                        {attraction.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {attraction.location}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 pb-2">
                    <div className="grid grid-cols-1 gap-2 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>{attraction.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{attraction.groupSize}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {attraction.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter
                    className="p-4 pt-2 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    style={{ borderTop: "dashed 2px rgba(145 158 171 / 20%)" }}
                  >
                    <div>
                      <span className="font-bold text-lg">{attraction.price.toLocaleString()} Ar</span>
                      <span className="text-muted-foreground text-sm"> / personne</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{attraction.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({attraction.reviews} avis)
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