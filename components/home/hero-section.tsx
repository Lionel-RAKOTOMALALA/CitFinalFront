import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBarHero } from "@/components/search/search-bar";

export function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[8] before:bg-gradient-to-b before:from-transparent before:to-black before:to-[75%]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://zone-ui.vercel.app/assets/images/travel/travel-large-1.webp"
          alt="Plage tropicale avec palmiers"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center min-h-screen px-4 py-20"
        style={{ justifyContent: "end" }}
      >
        {/* Title */}
        <h1
          className="text-white text-5xl leading-tight md:text-6xl lg:text-5xl font-bold mb-8 text-center max-w-4xl"
          style={{ marginTop: "34px" }}
        >
          Découvrez les Meilleures <br />
          Destinations du Sud
        </h1>

        {/* Info Pills */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-medium text-sm drop-shadow-md">
              Expériences authentiques
            </span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="font-medium text-sm drop-shadow-md">
              Avis voyageurs vérifiés
            </span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-medium text-sm drop-shadow-md">
              Réservations sécurisées
            </span>
          </div>
        </div>

        {/* CTA Button */}

        <Link href="/hotels">
          <Button
            size="lg"
            className="relative group overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 text-white px-8 py-6 text-lg font-semibold rounded-lg mb-16 shadow-lg shadow-orange-500/50 transition-all duration-300  hover:scale-105 border-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Trouver un Hôtel
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </Link>
        {/* Search Bar */}
        <SearchBarHero />
      </div>
    </div>
  );
}
