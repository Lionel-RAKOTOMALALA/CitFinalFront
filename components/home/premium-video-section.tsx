import Link from "next/link";
import { Play, ArrowUpRight, Video, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoTours = [
  {
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    title: "Oceanfront Paradise Resort",
    description: "Experience luxury with stunning ocean views",
    duration: "8 min",
    rating: "4.9",
    isFeatured: true,
  },
  {
    image: "https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg",
    title: "Tropical Haven Hotel",
    description: "Immerse yourself in tropical elegance",
    duration: "6 min",
    rating: "4.8",
  },
  {
    image: "https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg",
    title: "Sunrise Beachfront",
    description: "Wake up to paradise every morning",
    duration: "7 min",
    rating: "4.9",
  },
];

export function PremiumVideoSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Video className="w-3.5 h-3.5" />
                Visites Premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C252E] dark:text-white leading-[1.1]">
              Découvrez en
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-600 bg-clip-text text-transparent">
                vidéo HD premium
              </span>
            </h2>

            <p className="text-[#637381] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
              Explorez 10 hôtels de luxe avec des visites complètes des chambres en moins de 10 minutes. Découvrez votre futur séjour avant de réserver.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button asChild size="lg" className="group">
                <Link href="/premium">
                  Voir les visites premium
                  <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white">
                  10+
                </div>
                <div className="text-sm text-[#637381] dark:text-gray-400 mt-1">
                  Hôtels en vidéo
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white">
                  HD
                </div>
                <div className="text-sm text-[#637381] dark:text-gray-400 mt-1">
                  Qualité vidéo
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white">
                  10min
                </div>
                <div className="text-sm text-[#637381] dark:text-gray-400 mt-1">
                  Durée moyenne
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Video tours grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 lg:gap-6">
              {/* Featured video */}
              <div className="group relative" style={{ animationDelay: '0ms' }}>
                <div className="relative bg-background border border-border/40 dark:border-none rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 dark:bg-[#101826] group-hover:-translate-y-1">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl" />
                  </div>

                  <div className="relative">
                    {/* Video thumbnail */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img 
                        src={videoTours[0].image}
                        alt={videoTours[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                          <Play className="h-7 w-7 text-white fill-white ml-1" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-medium">
                          Premium
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {videoTours[0].duration}
                        </span>
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{videoTours[0].rating}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {videoTours[0].title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {videoTours[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                {videoTours.slice(1).map((video, index) => (
                  <div 
                    key={index} 
                    className="group relative"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="relative bg-background border border-border/40 dark:border-none rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 dark:bg-[#101826] group-hover:-translate-y-1">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl" />
                      </div>

                      <div className="relative">
                        {/* Video thumbnail */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={video.image}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Play button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                              <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                            </div>
                          </div>

                          {/* Duration badge */}
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {video.duration}
                            </span>
                          </div>

                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{video.rating}</span>
                            </div>
                            <h3 className="text-base font-bold mb-1">
                              {video.title}
                            </h3>
                            <p className="text-white/90 text-xs line-clamp-1">
                              {video.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}