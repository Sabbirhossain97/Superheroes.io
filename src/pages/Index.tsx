import { useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import SuperheroCard from "@/components/SuperheroCard";
import ThemeToggle from "@/components/ThemeToggle";
import { superheroes } from "@/data/superheroes";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import FilterOptions from "@/components/FilterOptions";

// Pre-compute unique values for filters
const FILTER_OPTIONS = {
  publishers: ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.publisher)))],
  alignments: ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.alignment)))],
  genders: ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.gender)))],
  races: ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.race)))]
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedAlignment, setSelectedAlignment] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedRace, setSelectedRace] = useState<string>("all");

  // Memoize the filter function
  const filterHero = useCallback((hero: typeof superheroes[0]) => {
    const matchesSearch =
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.biography.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPublisher =
      selectedPublisher === "all" || hero.biography.publisher === selectedPublisher;

    const matchesAlignment =
      selectedAlignment === "all" || hero.biography.alignment === selectedAlignment;

    const matchesGender =
      selectedGender === "all" || hero.appearance.gender === selectedGender;

    const matchesRace =
      selectedRace === "all" || hero.appearance.race === selectedRace;

    return matchesSearch && matchesPublisher && matchesAlignment && matchesGender && matchesRace;
  }, [searchTerm, selectedPublisher, selectedAlignment, selectedGender, selectedRace]);

  // Memoize filtered superheroes
  const filteredSuperheroes = useMemo(() => {
    return superheroes.filter(filterHero);
  }, [filterHero]);

  const { displayedItems, hasMore, loading } = useInfiniteScroll({
    data: filteredSuperheroes,
    itemsPerPage: 20
  });

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedPublisher("all");
    setSelectedAlignment("all");
    setSelectedGender("all");
    setSelectedRace("all");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Superhero.io</h1>
              <p className="text-muted-foreground mt-1">Discover your favorite superheroes</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-10">
        <FilterOptions
          publishers={FILTER_OPTIONS.publishers}
          alignments={FILTER_OPTIONS.alignments}
          genders={FILTER_OPTIONS.genders}
          races={FILTER_OPTIONS.races}
          searchTerm={searchTerm}
          selectedPublisher={selectedPublisher}
          selectedAlignment={selectedAlignment}
          selectedGender={selectedGender}
          selectedRace={selectedRace}
          onSearchChange={setSearchTerm}
          onPublisherChange={setSelectedPublisher}
          onAlignmentChange={setSelectedAlignment}
          onGenderChange={setSelectedGender}
          onRaceChange={setSelectedRace}
          onClearFilters={clearFilters}
        />

        {/* Results info */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">
            Showing {displayedItems.length} of {filteredSuperheroes.length} superheroes
            {filteredSuperheroes.length !== superheroes.length && ` (filtered from ${superheroes.length} total)`}
          </span>
          {selectedPublisher !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Publisher: {selectedPublisher}
            </Badge>
          )}
          {selectedAlignment !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Alignment: {selectedAlignment}
            </Badge>
          )}
        </div>

        {/* Superhero Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedItems.map((superhero) => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading more superheroes...</span>
          </div>
        )}

        {/* No more data indicator */}
        {!hasMore && displayedItems.length > 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You've reached the end! 🦸‍♂️</p>
          </div>
        )}

        {/* No results */}
        {filteredSuperheroes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No superheroes found matching your criteria.</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
