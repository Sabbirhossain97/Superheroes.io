import { Progress } from "@/components/ui/progress";
import { PowerStats as PowerStatsType } from "@/types/superhero";

interface PowerStatsProps {
  powerstats: PowerStatsType;
}

const PowerStats = ({ powerstats }: PowerStatsProps) => {
  const stats = [
    { name: "Intelligence", value: powerstats.intelligence, color: "bg-blue-500" },
    { name: "Strength", value: powerstats.strength, color: "bg-red-500" },
    { name: "Speed", value: powerstats.speed, color: "bg-yellow-500" },
    { name: "Durability", value: powerstats.durability, color: "bg-green-500" },
    { name: "Power", value: powerstats.power, color: "bg-purple-500" },
    { name: "Combat", value: powerstats.combat, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Power Statistics</h3>
      {stats.map((stat) => (
        <div key={stat.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{stat.name}</span>
            <span className="text-sm text-muted-foreground">{stat.value}/100</span>
          </div>
          <Progress value={stat.value} className="h-2" indicatorClassName={stat.color} />
        </div>
      ))}
    </div>
  );
};

export default PowerStats;
