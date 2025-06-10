import { useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import SuperheroCard from "@/components/superhero/SuperheroCard";
import { superheroes } from "@/data/superheroes";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import FilterOptions from "@/components/filters/FilterOptions";
import ScrollToTop from "@/components/helpers/ScrollToTop";
import MainHeader from "@/components/layout/MainHeader";
import { useCompare } from "@/components/context/CompareContext";

const FILTER_OPTIONS = {
  publishers: ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.publisher)))],
  alignments: ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.alignment)))],
  genders: ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.gender)))],
  races: ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.race)))]
};

const Index = () => {
  const { compareList, addToCompare } = useCompare();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedAlignment, setSelectedAlignment] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedRace, setSelectedRace] = useState<string>("all");

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
      <MainHeader compareList={compareList} />

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
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-6">
          <span className="text-sm order-2 md:order-1 text-muted-foreground">
            Showing {displayedItems.length} of {filteredSuperheroes.length} superheroes
            {filteredSuperheroes.length !== superheroes.length && ` (filtered from ${superheroes.length} total)`}
          </span>
          <div className="flex flex-wrap justify-center sm:flex-nowrap gap-2 order-1 md:order-2">
            {selectedPublisher !== "all" && (
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Publisher: {selectedPublisher}
              </Badge>
            )}
            {selectedAlignment !== "all" && (
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Alignment: {selectedAlignment}
              </Badge>
            )}
            {selectedGender !== "all" && (
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Gender: {selectedGender}
              </Badge>
            )}
            {selectedRace !== "all" && (
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                Race: {selectedRace}
              </Badge>
            )}
          </div>
        </div>

        {/* Superhero Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedItems.map((superhero) => (
            <SuperheroCard key={superhero.id} superhero={superhero} addToCompare={addToCompare} />
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
      <ScrollToTop />
    </div>
  );
};

export default Index;
