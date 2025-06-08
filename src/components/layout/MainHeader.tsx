import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";


function MainHeader({ compareList }) {
    const navigate = useNavigate();

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Superheroes.io</h1>
                        <p className="text-muted-foreground mt-1">Discover your favorite superheroes</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/compare")}
                            className="gap-2 h-9"
                        >
                            <GitCompareArrows />
                            Compare {compareList.length > 0 && `(${compareList.length})`}
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default MainHeader