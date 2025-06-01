import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import SuperheroCard from "@/components/SuperheroCard";
import ThemeToggle from "@/components/ThemeToggle";
import { superheroes } from "@/data/superheroes";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedAlignment, setSelectedAlignment] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedRace, setSelectedRace] = useState<string>("all");

  const publishers = useMemo(() => {
    return ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.publisher)))];
  }, [superheroes]);

  const alignments = useMemo(() => {
    return ["all", ...Array.from(new Set(superheroes.map(hero => hero.biography.alignment)))];
  }, [superheroes]);

  const genders = useMemo(() => {
    return ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.gender)))];
  }, [superheroes]);

  const races = useMemo(() => {
    return ["all", ...Array.from(new Set(superheroes.map(hero => hero.appearance.race)))];
  }, [superheroes]);


  const filteredSuperheroes = useMemo(() => {
    return superheroes.filter(hero => {
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
    });
  }, [superheroes, searchTerm, selectedPublisher, selectedAlignment, selectedGender, selectedRace]);

  const { displayedItems, hasMore, loading } = useInfiniteScroll({
    data: filteredSuperheroes,
    itemsPerPage: 20
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPublisher("all");
    setSelectedAlignment("all");
    setSelectedGender("all");
    setSelectedRace("all");
  };

  const hasActiveFilters = searchTerm || selectedPublisher !== "all" || selectedAlignment !== "all" || selectedGender !== "all" || selectedRace !== "all";

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
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="w-full xl:w-1/3">
            <Input
              id="searchbar"
              placeholder="Search superheroes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full xl:w-2/3">
            <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
              <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
                <SelectValue placeholder="Publisher" />
              </SelectTrigger>
              <SelectContent>
                {publishers
                  .filter(p => p !== "")
                  .map(publisher => (
                    <SelectItem key={publisher} value={publisher}>
                      {publisher === "all" ? "All Publishers" : publisher}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={selectedAlignment} onValueChange={setSelectedAlignment}>
              <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
                <SelectValue placeholder="Alignment" />
              </SelectTrigger>
              <SelectContent>
                {alignments.map(alignment => (
                  <SelectItem key={alignment} value={alignment}>
                    {alignment === "all" ? "All Alignments" : alignment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
                <SelectValue placeholder="Alignment" />
              </SelectTrigger>
              <SelectContent>
                {genders.map(gender => (
                  <SelectItem key={gender} value={gender}>
                    {gender === "all" ? "All Genders" : gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRace} onValueChange={setSelectedRace}>
              <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
                <SelectValue placeholder="Alignment" />
              </SelectTrigger>
              <SelectContent>
                {races.map(race => (
                  <SelectItem key={race} value={race}>
                    {race === "all" ? "All Races" : race}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-1"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

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
