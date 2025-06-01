
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SuperheroCard from "@/components/SuperheroCard";
import ThemeToggle from "@/components/ThemeToggle";
import { superheroes } from "@/data/superheroes";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedAlignment, setSelectedAlignment] = useState<string>("all");

  // Get unique publishers and alignments
  const publishers = ["all", ...new Set(superheroes.map(hero => hero.biography.publisher))];
  const alignments = ["all", ...new Set(superheroes.map(hero => hero.biography.alignment))];

  // Filter superheroes based on search term, publisher, and alignment
  const filteredSuperheroes = superheroes.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hero.biography.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublisher = selectedPublisher === "all" || hero.biography.publisher === selectedPublisher;
    const matchesAlignment = selectedAlignment === "all" || hero.biography.alignment === selectedAlignment;
    
    return matchesSearch && matchesPublisher && matchesAlignment;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Superhero Database</h1>
              <p className="text-muted-foreground mt-1">Discover your favorite superheroes</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search superheroes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Publisher" />
              </SelectTrigger>
              <SelectContent>
                {publishers.map(publisher => (
                  <SelectItem key={publisher} value={publisher}>
                    {publisher === "all" ? "All Publishers" : publisher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedAlignment} onValueChange={setSelectedAlignment}>
              <SelectTrigger className="w-48">
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
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">
            Showing {filteredSuperheroes.length} of {superheroes.length} superheroes
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
          {filteredSuperheroes.map((superhero) => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </div>

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
