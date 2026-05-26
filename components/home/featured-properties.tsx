import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const featuredProperties = [
  {
    id: 1,
    name: "Andilana Beach Resort",
    location: "Nosy Be",
    rating: 4.8,
    reviews: 342,
    price: 1250000,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    discount: true,
    availability: 3,
  },
  {
    id: 2,
    name: "Carlton Hotel",
    location: "Antananarivo",
    rating: 4.7,
    reviews: 512,
    price: 850000,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    discount: false,
    availability: 5,
  },
  {
    id: 3,
    name: "Princesse Bora Lodge",
    location: "Île Sainte-Marie",
    rating: 4.9,
    reviews: 203,
    price: 1550000,
    image: "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg",
    discount: true,
    availability: 1,
  },
  {
    id: 4,
    name: "Le Relais de la Reine",
    location: "Parc de l'Isalo",
    rating: 4.6,
    reviews: 168,
    price: 650000,
    image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg",
    discount: false,
    availability: 8,
  },
];

export function FeaturedProperties() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-heading leading-tight">
            Hôtels &nbsp;
            <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              incontournables
            </span>
          </h2>
          <p className="text-subtle max-w-2xl mt-4 text-center text-sm md:text-base px-4">
            Nos hôtels sélectionnés pour vous offrent le confort et
            l'emplacement idéals pour un séjour inoubliable dans le Sud !
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-10">
          {featuredProperties.slice(0, 4).map((property) => (
            <Card
              key={property.id}
              className="group w-full sm:w-[270px] border border-border/40 overflow-hidden rounded-2xl shadow-card bg-card"
            >
              <div className="relative overflow-hidden w-full aspect-square">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {property.discount && (
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
                  {property.availability} rooms left
                </Badge>
              </div>

              <CardHeader className="p-4 pb-2">
                <Link href={`/hotels/${property.id}`}>
                  <h3 className="font-semibold text-base md:text-lg line-clamp-1 hover:underline cursor-pointer">
                    {property.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm">
                  {property.location}
                </p>
              </CardHeader>

              <CardFooter
                className="p-4 pt-2 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                style={{ borderTop: "dashed 2px rgba(145 158 171 / 20%)" }}
              >
                <div>
                  <span className="font-bold text-lg">{property.price.toLocaleString()} Ar</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / nuit
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({property.reviews} avis)
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/hotels">
              Voir tous
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
