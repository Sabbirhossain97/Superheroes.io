import { useState } from "react"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import EmptyCompareAlert from "./EmptyCompareAlert";
import CompareAddWarning from "./CompareAddWarning";

function MainHeader({ compareList }) {
    const [open, setOpen] = useState(false);
    const [warningAlert, setWarningAlert] = useState(false)
    const navigate = useNavigate();

    const handlenavigate = () => {
        if(compareList.length === 0) {
            setOpen(true);
            return
        }
        if (compareList.length === 1) {
            setWarningAlert(true);
            return
        }
        navigate("/compare")
    }

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl hidden sm:block font-bold text-foreground">Superheroes.io</h1>
                        <h1 className="text-3xl block sm:hidden font-bold text-foreground">🦸‍♂️</h1>
                        <p className="text-muted-foreground mt-1 hidden sm:block">Discover your favorite superheroes</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={handlenavigate}
                            className="gap-2 h-9"
                        >
                            <GitCompareArrows />
                            Compare {compareList.length > 0 && `(${compareList.length})`}
                        </Button>
                        <ThemeToggle />
                    </div>
                    <EmptyCompareAlert
                        open={open}
                        setOpen={setOpen}
                    />
                    <CompareAddWarning
                        warningAlert={warningAlert}
                        setWarningAlert={setWarningAlert}
                    />
                </div>
            </div>
        </header>
    )
}

export default MainHeader