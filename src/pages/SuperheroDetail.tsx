import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { superheroes } from "@/data/superheroes";
import SuperheroHeader from "@/components/superhero/SuperheroHeader";
import SuperheroImage from "@/components/superhero/SuperheroImage";
import SuperheroDetails from "@/components/superhero/SuperheroDetails";

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
      <SuperheroHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SuperheroImage
              superhero={superhero}
              getAlignmentColor={getAlignmentColor}
            />
          </div>
          <div className="lg:col-span-2">
            <SuperheroDetails superhero={superhero} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;