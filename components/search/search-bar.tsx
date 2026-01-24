"use client";

import { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function SearchBarHero() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalGuests = adults + children;
  const guestsText = `${totalGuests} voyageur${totalGuests > 1 ? "s" : ""}`;

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, adults, children });
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto backdrop-blur-md rounded-2xl p-6 md:p-8"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-end">
        {/* Location */}
        <div className="flex flex-1 items-center gap-3 pb-3">
          <MapPin className="w-6 h-6 text-white/70" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Où allez-vous ?"
            className="bg-transparent text-white placeholder-white/60 w-full text-lg border-none focus:outline-none focus:ring-0"
          />
        </div>

        {/* Separator */}
        <div className="hidden md:block h-12 w-px bg-white/20"></div>

        {/* Check-in */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-1 items-center gap-3 pb-3 text-left">
              <Calendar className="w-6 h-6 text-white/70" />
              <span
                className={cn(
                  "text-lg",
                  checkIn ? "text-white" : "text-white/60"
                )}
              >
                {checkIn
                  ? format(checkIn, "dd MMM yyyy", { locale: fr })
                  : "Arrivée"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <CalendarComponent
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              locale={fr}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Separator */}
        <div className="hidden md:block h-12 w-px bg-white/20"></div>

        {/* Check-out */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-1 items-center gap-3 pb-3 text-left">
              <Calendar className="w-6 h-6 text-white/70" />
              <span
                className={cn(
                  "text-lg",
                  checkOut ? "text-white" : "text-white/60"
                )}
              >
                {checkOut
                  ? format(checkOut, "dd MMM yyyy", { locale: fr })
                  : "Départ"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <CalendarComponent
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              locale={fr}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Separator */}
        <div className="hidden md:block h-12 w-px bg-white/20"></div>

        {/* Guests */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-1 items-center gap-3 pb-3 text-left">
              <Users className="w-6 h-6 text-white/70" />
              <span className="text-lg text-white">{guestsText}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-6 p-4">
              {/* Adults */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Adultes</div>
                  <div className="text-sm text-muted-foreground">Âge 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-medium">{adults}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setAdults(adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Enfants</div>
                  <div className="text-sm text-muted-foreground">Âge 0-12</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {children}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setChildren(children + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search */}
        <button
          onClick={handleSearch}
          className="h-14 w-14 shrink-0 rounded-xl  bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 flex items-center justify-center transition-all"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
