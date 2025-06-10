import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useCallback } from "react";
import { debounce } from "lodash";

interface FilterOptionsProps {
  publishers: string[];
  alignments: string[];
  genders: string[];
  races: string[];
  searchTerm: string;
  selectedPublisher: string;
  selectedAlignment: string;
  selectedGender: string;
  selectedRace: string;
  onSearchChange: (value: string) => void;
  onPublisherChange: (value: string) => void;
  onAlignmentChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onRaceChange: (value: string) => void;
  onClearFilters: () => void;
}

const FilterOptions = ({
  publishers,
  alignments,
  genders,
  races,
  searchTerm,
  selectedPublisher,
  selectedAlignment,
  selectedGender,
  selectedRace,
  onSearchChange,
  onPublisherChange,
  onAlignmentChange,
  onGenderChange,
  onRaceChange,
  onClearFilters,
}: FilterOptionsProps) => {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 300),
    [onSearchChange]
  );

  const hasActiveFilters =
    searchTerm ||
    selectedPublisher !== "all" ||
    selectedAlignment !== "all" ||
    selectedGender !== "all" ||
    selectedRace !== "all";

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="w-full xl:w-1/3">
        <Input
          id="searchbar"
          placeholder="Search superheroes..."
          defaultValue={searchTerm}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full xl:w-2/3">
        <Select value={selectedPublisher} onValueChange={onPublisherChange}>
          <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
            <SelectValue placeholder="Publisher" />
          </SelectTrigger>
          <SelectContent>
            {publishers
              .filter((p) => p !== "")
              .map((publisher) => (
                <SelectItem key={publisher} value={publisher}>
                  {publisher === "all" ? "All Publishers" : publisher}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={selectedAlignment} onValueChange={onAlignmentChange}>
          <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
            <SelectValue placeholder="Alignment" />
          </SelectTrigger>
          <SelectContent>
            {alignments.map((alignment) => (
              <SelectItem key={alignment} value={alignment}>
                {alignment === "all" ? "All Alignments" : alignment}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedGender} onValueChange={onGenderChange}>
          <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender === "all" ? "All Genders" : gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedRace} onValueChange={onRaceChange}>
          <SelectTrigger className="[@media(max-width:500px)]:w-full w-1/3 md:w-48">
            <SelectValue placeholder="Race" />
          </SelectTrigger>
          <SelectContent>
            {races.map((race) => (
              <SelectItem key={race} value={race}>
                {race === "all" ? "All Races" : race}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterOptions; 