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
    name: "Oceanfront Paradise Resort",
    location: "Coastal Bay",
    rating: 4.8,
    reviews: 128,
    price: 199,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    discount: true,
    availability: 3,
  },
  {
    id: 2,
    name: "Tropical Haven Hotel & Spa",
    location: "Palm Beach",
    rating: 4.7,
    reviews: 96,
    price: 159,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    discount: false,
    availability: 5,
  },
  {
    id: 3,
    name: "Sunrise Beachfront Suites",
    location: "Crystal Shores",
    rating: 4.9,
    reviews: 203,
    price: 259,
    image:
      "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg",
    discount: true,
    availability: 1,
  },
  {
    id: 4,
    name: "Urban Luxury Downtown Hotel",
    location: "City Center",
    rating: 4.6,
    reviews: 168,
    price: 179,
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-[#1C252E] dark:text-white leading-tight">
            Hôtels &nbsp;
            <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              incontournables
            </span>
          </h2>
          <p className="text-[#637381] max-w-2xl mt-4 text-center text-sm md:text-base px-4">
            Nos hôtels sélectionnés pour vous offrent le confort et
            l'emplacement idéals pour un séjour inoubliable dans le Sud !
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-10">
          {featuredProperties.slice(0, 4).map((property) => (
            <Card
              key={property.id}
              className="group w-full sm:w-[270px] border-none overflow-hidden rounded-2xl
             shadow-[0_0_2px_0_rgba(145,158,171,0.2),0_12px_24px_-4px_rgba(145,158,171,0.12)]
             dark:shadow-none"
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
                  <span className="font-bold text-lg">${property.price}</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / night
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
