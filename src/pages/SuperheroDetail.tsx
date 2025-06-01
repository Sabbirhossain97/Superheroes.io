import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import PowerStats from "@/components/PowerStats";
import ThemeToggle from "@/components/ThemeToggle";
import { superheroes } from "@/data/superheroes";

const SuperheroDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const superhero = superheroes.find(hero => hero.slug === slug);

  if (!superhero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Superhero not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Heroes
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <img
                  src={superhero.images.lg}
                  alt={superhero.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
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
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Power Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Power Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <PowerStats powerstats={superhero.powerstats} />
              </CardContent>
            </Card>

            {/* Biography */}
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-medium">Full Name:</span> {superhero.biography.fullName}
                </div>
                <div>
                  <span className="font-medium">Aliases:</span> {superhero.biography.aliases.join(", ")}
                </div>
                <div>
                  <span className="font-medium">Place of Birth:</span> {superhero.biography.placeOfBirth}
                </div>
                <div>
                  <span className="font-medium">First Appearance:</span> {superhero.biography.firstAppearance}
                </div>
                <div>
                  <span className="font-medium">Publisher:</span> {superhero.biography.publisher}
                </div>
                <div>
                  <span className="font-medium">Alignment:</span> {superhero.biography.alignment}
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Physical Appearance</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Gender:</span> {superhero.appearance.gender}
                </div>
                <div>
                  <span className="font-medium">Race:</span> {superhero.appearance.race}
                </div>
                <div>
                  <span className="font-medium">Height:</span> {superhero.appearance.height.join(" / ")}
                </div>
                <div>
                  <span className="font-medium">Weight:</span> {superhero.appearance.weight.join(" / ")}
                </div>
                <div>
                  <span className="font-medium">Eye Color:</span> {superhero.appearance.eyeColor}
                </div>
                <div>
                  <span className="font-medium">Hair Color:</span> {superhero.appearance.hairColor}
                </div>
              </CardContent>
            </Card>

            {/* Work */}
            <Card>
              <CardHeader>
                <CardTitle>Work & Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-medium">Occupation:</span> {superhero.work.occupation}
                </div>
                <div>
                  <span className="font-medium">Base:</span> {superhero.work.base}
                </div>
                <div>
                  <span className="font-medium">Group Affiliation:</span> {superhero.connections.groupAffiliation}
                </div>
                <div>
                  <span className="font-medium">Relatives:</span> {superhero.connections.relatives}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;