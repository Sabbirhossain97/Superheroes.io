import { useState, createContext, ReactNode, useContext } from 'react';
import { Superhero } from '@/types/superhero';

interface CompareContextType {
    compareList: Superhero[];
    addToCompare: (hero: Superhero) => void;
    removeFromCompare: (id: number) => void;
    clearCompareList: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [compareList, setCompareList] = useState<Superhero[]>([]);

    const addToCompare = (hero: Superhero) => {
        if(compareList.length > 1){
            alert("You can't compare more than 2 superheroes")
        }
        setCompareList(prev =>
            prev.some(item => item.id === hero.id) ? prev : [...prev, hero]
        );
    };

    const removeFromCompare = (id: number) => {
        setCompareList(prev => prev.filter(item => item.id !== id));
    };

    const clearCompareList = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider
            value={{ compareList, addToCompare, removeFromCompare, clearCompareList }}
        >
            {children}
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


