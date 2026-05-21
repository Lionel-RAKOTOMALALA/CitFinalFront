"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, User, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const { user, isSignedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Vérifier si on est sur la page d'accueil
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Ne gérer le scroll que sur la page d'accueil
    if (!isHomePage) {
      setIsScrolled(false);
      return;
    }

    // Vérifier la position de scroll au montage du composant
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Vérifier immédiatement au chargement
    checkScroll();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isHomePage && isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs shadow-sm shadow-orange-500/10"
          : isHomePage
          ? "bg-transparent border-white/10 dark:border-white/5"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      }`}
      style={{
        backdropFilter: isHomePage && isScrolled ? "blur(4px)" : "none",
      }}
    >
      {/* Gradient overlay pour effet moderne - uniquement sur la page d'accueil scrollée */}
      <div
        className={`absolute inset-0 bg-gradient-to-r 
    from-white-600/5 via-amber-600/5 to-yellow-600/5 
    dark:from-black/10 dark:via-gray-800/10 dark:to-black/10 
    pointer-events-none transition-opacity duration-300 ${
      isHomePage && isScrolled ? "opacity-100" : "opacity-0"
    }`}
      />

      <div className="container relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo à gauche */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="/cit-logo.png"
                  alt="Logo SouthBooking"
                  className="relative object-contain rounded-lg"
                  style={{ width: "80px" }}
                />
              </div>
            </Link>
          </div>

          {/* Navigation au centre */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-1 lg:space-x-2">
            <NavLink href="/hotels" isHomePage={isHomePage}>
              Hôtels
            </NavLink>
            <NavLink href="/restaurants" isHomePage={isHomePage}>
              Restaurants
            </NavLink>
            <NavLink href="/cars" isHomePage={isHomePage}>
              Location
            </NavLink>
            <NavLink href="/attractions" isHomePage={isHomePage}>
              Attractions
            </NavLink>
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className={`relative group hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-colors ${
                isHomePage && isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                  : isHomePage
                  ? "text-white hover:text-orange-300 dark:hover:text-orange-200"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              }`}
            >
              <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="sr-only">Rechercher</span>
            </Button>

            {!isSignedIn ? (
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className={`hover:bg-amber-500/20 dark:hover:bg-amber-500/30 transition-colors ${
                    isHomePage && isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                      : isHomePage
                      ? "text-white hover:text-amber-300 dark:hover:text-amber-200"
                      : "text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline-block">Connexion</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <span className={`hidden md:inline-block text-sm font-medium ${
                  isHomePage && !isScrolled ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}>
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  title="Se déconnecter"
                  className={`hover:bg-red-500/20 transition-colors ${
                    isHomePage && !isScrolled
                      ? "text-white hover:text-red-300"
                      : "text-gray-700 dark:text-gray-300 hover:text-red-500"
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}

            <Button className="hidden md:inline-flex relative group overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 dark:from-orange-700 dark:via-amber-700 dark:to-yellow-700 dark:hover:from-orange-600 dark:hover:via-amber-600 dark:hover:to-yellow-600 text-white font-semibold border-0 shadow-lg shadow-orange-500/50 dark:shadow-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/60 dark:hover:shadow-amber-500/50 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Réserver
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

// Composant NavLink avec effet moderne - couleur adaptative
function NavLink({
  href,
  children,
  isHomePage,
}: {
  href: string;
  children: React.ReactNode;
  isHomePage: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = pathname === href;

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(false);
      return;
    }

    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Vérifier immédiatement
    checkScroll();

    // Ajouter l'écouteur d'événement de scroll
    window.addEventListener("scroll", checkScroll);

    // Nettoyer l'écouteur lors du démontage
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHomePage]);

  return (
    <Link href={href} className="group relative px-3 py-2">
      <span
        className={`relative z-10 text-sm font-medium transition-colors ${
          isActive
            ? isHomePage && !isScrolled
              ? "text-white font-bold drop-shadow-lg"
              : "text-gray-900 dark:text-gray-100 font-bold"
            : isHomePage && isScrolled
            ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
            : isHomePage
            ? "text-white/90 group-hover:text-white drop-shadow-md"
            : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-yellow-500/20 rounded-lg transition-transform duration-200 ease-out ${
          isActive ? "scale-100" : "scale-0 group-hover:scale-100"
        }`}
      />
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r transition-all duration-300 ${
          isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
        } ${
          isHomePage && isScrolled
            ? "from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-500 dark:via-amber-500 dark:to-yellow-500 shadow-lg shadow-orange-500/30 dark:shadow-orange-500/50"
            : isHomePage
            ? "from-orange-400 via-amber-400 to-yellow-400 shadow-lg shadow-orange-500/50"
            : "from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-500 dark:via-amber-500 dark:to-yellow-500 shadow-lg shadow-orange-500/30 dark:shadow-orange-500/50"
        }`}
      />
    </Link>
  );
}
