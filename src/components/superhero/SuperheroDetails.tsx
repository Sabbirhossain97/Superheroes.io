import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PowerStats from "@/components/PowerStats";
import { Superhero } from "@/types/superhero";

interface SuperheroDetailsProps {
  superhero: Superhero;
}

const SuperheroDetails = ({ superhero }: SuperheroDetailsProps) => {
  return (
    <div className="space-y-6">
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
  );
};

export default SuperheroDetails; 