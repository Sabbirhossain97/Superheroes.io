import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Superhero } from "@/types/superhero";

interface SuperheroImageProps {
  superhero: Superhero;
  getAlignmentColor: (alignment: string) => string;
}

const SuperheroImage = ({ superhero, getAlignmentColor }: SuperheroImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card>
      <CardContent className="p-0 relative">
        <div className="w-full h-96 relative">
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-t-lg" />
          )}
          <img
            src={superhero.image.url}
            alt={superhero.name}
            loading="lazy"
            className={`w-full h-96 object-cover rounded-t-lg transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{superhero.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {superhero.biography.fullName}
          </p>
          <div className="flex gap-2 mb-4">
            <Badge variant="outline">{superhero.biography.publisher}</Badge>
            <Badge className={getAlignmentColor(superhero.biography.alignment)}>
              {superhero.biography.alignment}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperheroImage; 