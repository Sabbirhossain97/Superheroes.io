import { useState, createContext, ReactNode, useContext } from 'react';
import { Superhero } from '@/types/superhero';
import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
} from "@/components/ui/toast"

interface CompareContextType {
    compareList: Superhero[];
    setCompareList: React.Dispatch<React.SetStateAction<Superhero[]>>
    addToCompare: (hero: Superhero) => void;
    clearCompareList: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [compareList, setCompareList] = useState<Superhero[]>([]);
    const [open, setOpen] = useState(false);
    const [existAlert, setExistAlert] = useState(false);
    const [isCompareDeleted, setIsCompareDeleted] = useState(false);

    const addToCompare = (hero: Superhero) => {
        const exists = compareList.some(item => item.id === hero.id);
        if (exists) {
            setExistAlert(true)
            return
        }
        if (compareList.length > 1) {
            setOpen(true)
            return
        }
        setCompareList(prev =>
            prev.some(item => item.id === hero.id) ? prev : [...prev, hero]
        );
    };

    const clearCompareList = () => {
        setCompareList([]);
        setIsCompareDeleted(true)
    };

    return (
        <CompareContext.Provider
            value={{ compareList, setCompareList, addToCompare, clearCompareList }}
        >
            {children}
            <Toast open={open} onOpenChange={setOpen}>
                <div className="grid gap-1">
                    <ToastTitle>Error</ToastTitle>
                    <ToastDescription>You can't compare more than 2</ToastDescription>
                </div>
                <ToastClose />
            </Toast>
            <Toast open={existAlert} onOpenChange={setExistAlert}>
                <div className="grid gap-1">
                    <ToastTitle>Error</ToastTitle>
                    <ToastDescription>Item already exists!</ToastDescription>
                </div>
                <ToastClose />
            </Toast>
            <Toast open={isCompareDeleted} onOpenChange={setIsCompareDeleted}>
                <div className="grid gap-1">
                    <ToastTitle>Success</ToastTitle>
                    <ToastDescription>Compare list deleted!</ToastDescription>
                </div>
                <ToastClose />
            </Toast>
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
};


