import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Superhero } from "@/types/superhero";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuperheroCardProps {
  superhero: Superhero;
  addToCompare: (hero: Superhero) => void
}

const SuperheroCard = ({ superhero, addToCompare }: SuperheroCardProps) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case "good":
        return "bg-green-500";
      case "bad":
        return "bg-red-500";
      case "neutral":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => navigate(`/superhero/${superhero.slug}`)}
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg relative">
          <img
            src={superhero.image.url}
            alt={superhero.name}
            className={`${imageLoading ? 'blur-xl' : 'blur-0'} w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
          />
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(superhero);
            }}
            className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-2 right-2"
          >
            <GitCompareArrows className="h-10 w-10" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {superhero.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {superhero.biography.fullName}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              {/* {`Publisher: ${superhero.biography.publisher}`} */}
              {superhero.biography.publisher === "Unknown" ? `Publisher: ${superhero.biography.publisher}` : `${superhero.biography.publisher}`}
            </Badge>
            <Badge className={getAlignmentColor(superhero.biography.alignment)}>
              {superhero.biography.alignment}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Race:</span> {superhero.appearance.race}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperheroCard;
