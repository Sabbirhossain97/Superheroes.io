
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SuperheroCard from "@/components/SuperheroCard";
import { superheroes, publishers } from "@/data/superheroes";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("all");
  const [selectedAlignment, setSelectedAlignment] = useState("all");

  const filteredHeroes = useMemo(() => {
    return superheroes.filter((hero) => {
      const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hero.biography.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPublisher = selectedPublisher === "all" || hero.biography.publisher === selectedPublisher;
      const matchesAlignment = selectedAlignment === "all" || hero.biography.alignment === selectedAlignment;
      
      return matchesSearch && matchesPublisher && matchesAlignment;
    });
  }, [searchTerm, selectedPublisher, selectedAlignment]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPublisher("all");
    setSelectedAlignment("all");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-2">Superhero Database</h1>
          <p className="text-center text-muted-foreground">
            Discover amazing superheroes and their incredible powers
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Heroes</label>
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Publisher</label>
              <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
                <SelectTrigger>
                  <SelectValue placeholder="All Publishers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Publishers</SelectItem>
                  {publishers.map((publisher) => (
                    <SelectItem key={publisher} value={publisher}>
                      {publisher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Alignment</label>
              <Select value={selectedAlignment} onValueChange={setSelectedAlignment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Alignments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alignments</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="bad">Bad</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredHeroes.length} of {superheroes.length} heroes
          </p>
        </div>

        {/* Hero Grid */}
        {filteredHeroes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHeroes.map((hero) => (
              <SuperheroCard key={hero.id} superhero={hero} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No heroes found</p>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
