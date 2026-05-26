import Link from "next/link";
import { Car, Waves, Compass, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function FeaturedExperiences() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Contenu */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Explorez et profitez
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-[1.1]">
              Explorez le Sud
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-600 bg-clip-text text-transparent">
                à votre rythme
              </span>
            </h1>

            <p className="text-subtle text-base md:text-lg leading-relaxed max-w-lg">
              Trouvez votre moyen de transport idéal et découvrez les activités
              incontournables pour un séjour inoubliable.
            </p>

            {/* Activités */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <Car className="w-5 h-5 text-heading" />
                <div>
                  <p className="font-medium text-heading">
                    Location de véhicules
                  </p>
                  <p className="text-sm text-subtle">
                    À partir de 125 000 Ar/jour
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Waves className="w-5 h-5 text-heading" />
                <div>
                  <p className="font-medium text-heading">
                    Plages paradisiaques
                  </p>
                  <p className="text-sm text-subtle">
                    50+ plages à découvrir
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Compass className="w-5 h-5 text-heading" />
                <div>
                  <p className="font-medium text-heading">
                    Excursions guidées
                  </p>
                  <p className="text-sm text-subtle">
                    Dès 75 000 Ar
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button asChild size="lg" className="group">
                <Link href="/reservations">
                  Réservez un véhicule
                  <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/attractions">
                  Attractions
                  <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

{/* Flex Container vertical centré */}
<div className="flex flex-col gap-4 items-end md:items-center">
  {/* Ligne 1 */}
  <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center items-end md:relative md:left-[80px]">
    {/* Image 1 - Hot Air Balloon → voyage.webp */}
    <div className="relative rounded-3xl overflow-hidden bg-gray-200 w-[254px] h-[300px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <Image
        src="/voyage.webp"
        alt="Hot air balloon adventure"
        fill
        className="object-cover"
        sizes="254px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
    {/* Image 2 - Beach → plage.webp */}
    <div className="relative rounded-3xl overflow-hidden bg-gray-200 w-[340px] h-[306px] md:top-[46px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <Image
        src="/plage.webp"
        alt="Tropical beach paradise"
        fill
        className="object-cover"
        sizes="340px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Ligne 2 */}
  <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center md:relative md:-left-[12px]">
    {/* Image 3 - Dock/Pier → vehicule.jpg */}
    <div className="relative rounded-3xl overflow-hidden bg-gray-200 w-[354px] h-[286px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <Image
        src="/vehicule.jpg"
        alt="Luxury yacht experience"
        fill
        className="object-cover"
        sizes="354px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
    {/* Image 4 - Mountain Lake → paysage.webp */}
    <div className="relative rounded-3xl overflow-hidden bg-gray-200 w-[254px] h-[262px] md:top-[48px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <Image
        src="/paysage.webp"
        alt="Scenic waterfront view"
        fill
        className="object-cover"
        sizes="254px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
