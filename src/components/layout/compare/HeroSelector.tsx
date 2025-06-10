import { Superhero } from "@/types/superhero";
import { useState } from "react";
import { superheroes } from "@/data/superheroes";
import {  Search, CircleCheck} from 'lucide-react';
import { Input } from '@/components/ui/input';

export const HeroSelector: React.FC<{
    currentHero: Superhero;
    currentList: Superhero[];
    setCurrentList: React.Dispatch<React.SetStateAction<Superhero[]>>;
    position: number;
}> = ({ currentHero, currentList, setCurrentList, position }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHero, setSelectedHero] = useState(currentHero);
    let disabledHeroId = currentList.filter((_, index) => index !== position)[0].id

    const onSelect = (hero: Superhero) => {
        setSelectedHero(hero);
        setCurrentList(currentList => {
            const newList = [...currentList];
            newList[position] = hero;
            return newList;
        });
    }

    const filteredHeroes = superheroes.filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()));


    return (
        <div className="dark:bg-gray-900/10 px-2 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold dark:text-white">
                        Select Hero #{position + 1}
                    </h3>
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search superheroes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-3 pr-4 py-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
            </div>
            <div className="mt-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredHeroes.map((hero) => (
                        <button
                            key={hero.id}
                            onClick={() => {
                                onSelect(hero);
                            }}
                            disabled={hero.id === disabledHeroId}
                            className={`
                                ${hero.id === selectedHero.id ? "border-green-500 hover:border-green-400" : "border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"} 
                                ${hero.id === disabledHeroId ? 'cursor-not-allowed border-gray-500 opacity-30' : ""}
                                 flex relative items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 text-left border `}
                        >
                            <img
                                src={hero.image.url}
                                alt={hero.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                            />
                            {hero.id === selectedHero.id && <CircleCheck className='absolute text-green-500 top-1 right-1' />}
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold dark:text-white truncate">{hero.name}</div>
                                <div className="text-sm text-gray-700 dark:text-gray-400 truncate">{hero.biography.publisher}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredHeroes.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No heroes found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};