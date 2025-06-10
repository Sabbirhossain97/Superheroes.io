import { useCompare } from '@/components/context/CompareContext'
import SuperheroHeader from '@/components/superhero/SuperheroHeader';
import { Shield, Users, RotateCcw, MapPin, Calendar, Briefcase, Heart, Eye, Zap, Target, Activity, Gauge, Trash2, Sword } from 'lucide-react';
import { PowerStats } from '@/types/superhero';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ComparisonRow } from '@/components/layout/compare/ComparisonRow';
import { SectionHeader } from '@/components/layout/compare/SectionHeader';
import { HeroSelector } from '@/components/layout/compare/HeroSelector';
import { PowerBar } from '@/components/layout/compare/PowerBar';
import { AlignmentBadge } from '@/components/layout/compare/AlignmentBadge';
import { PublisherBadge } from '@/components/layout/compare/PublisherBadge';

function Compare() {
    const { compareList, setCompareList, clearCompareList } = useCompare();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 620);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClearCompare = () => {
        clearCompareList()
        navigate("/")
    }

    const getHighestStat = (stat: keyof PowerStats) => {
        const values = compareList.map(hero => hero.powerstats[stat]);
        const maxValue = Math.max(...values);
        return values.map(value => value === maxValue);
    };

    const powerStats: Array<{ key: keyof PowerStats; label: string; color: string; icon: React.ReactNode }> = [
        { key: 'intelligence', label: 'Intelligence', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: <Target className="w-4 h-4" /> },
        { key: 'strength', label: 'Strength', color: 'bg-gradient-to-r from-red-500 to-orange-500', icon: <Zap className="w-4 h-4" /> },
        { key: 'speed', label: 'Speed', color: 'bg-gradient-to-r from-yellow-500 to-amber-500', icon: <Activity className="w-4 h-4" /> },
        { key: 'durability', label: 'Durability', color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: <Shield className="w-4 h-4" /> },
        { key: 'power', label: 'Power', color: 'bg-gradient-to-r from-purple-500 to-violet-500', icon: <Gauge className="w-4 h-4" /> },
        { key: 'combat', label: 'Combat', color: 'bg-gradient-to-r from-orange-500 to-red-500', icon: <Sword className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-background relative">
            <SuperheroHeader />
            <Button
                variant="outline"
                onClick={handleClearCompare}
                className="gap-2 h-9 fixed z-[1000] bottom-4 right-6"
            >
                <Trash2 />
                Delete compare list
            </Button>
            <div className="container mx-auto px-4 py-8">
                <h1 className='text-4xl text-center font-semibold leading-none tracking-tight'>Comparison</h1>
            </div>

            <div className="container mx-auto px-4 py-8">
                <nav className={`container flex gap-10 justify-between backdrop-blur-md px-4 py-4 fixed top-0 left-0 right-0 z-[1000] transition-transform ${show ? 'visible' : 'hidden'}`}>
                    <div className="md:flex flex-col hidden px-20 items-center space-y-4">
                        <div className="text-center">
                            <div className="text-xl font-bold text-white mb-1"></div>
                        </div>
                    </div>
                    {compareList.map((hero) => (
                        <div key={hero.id} className="flex flex-col px-8 sm:px-16 md:px-24 items-center space-y-4">
                            <div className="relative hidden md:block">
                                <img
                                    src={hero.image.url}
                                    alt={hero.name}
                                    className="w-32 h-32 rounded-md md:rounded-full shadow-xl object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <div className="text-xl whitespace-nowrap font-bold dark:text-white mb-1">{hero.name}</div>

                            </div>
                        </div>
                    ))}
                </nav>
                <div className="backdrop-blur-sm rounded-2xl shadow-2xl border overflow-x-auto">
                    <table className="divide-y dark:divide-gray-700">
                        <thead>
                            <tr className="dark:bg-gray-900/80">
                                <th className="px-6 py-6 text-left hidden md:table-row text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">
                                    {""}
                                </th>
                                {compareList.map((hero, index) => (
                                    <th key={hero.id} className="sm:px-10 py-6 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="relative">
                                                <img
                                                    src={hero.image.url}
                                                    alt={hero.name}
                                                    className="w-32 h-32 rounded-full lg:min-w-72 lg:max-w-96 lg:h-96 md:rounded-md shadow-xl object-cover"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold dark:text-white mb-1">{hero.name}</div>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="gap-2 h-9"
                                                        >
                                                            <RotateCcw />
                                                            Change
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader className='hidden'>
                                                            <DialogTitle>Are you sure?</DialogTitle>
                                                        </DialogHeader>
                                                        <HeroSelector
                                                            currentHero={hero}
                                                            currentList={compareList}
                                                            setCurrentList={setCompareList}
                                                            position={index}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="dark:bg-gray-900/40 divide-y dark:divide-gray-800">
                            {/* Basic Information */}
                            <SectionHeader title="Hero Profile" icon={<Users className="w-5 h-5" />} />

                            <ComparisonRow
                                label="Real Identity"
                                icon={<Users className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <span className="font-medium dark:text-gray-100">
                                        {hero.biography.fullName || 'Classified'}
                                    </span>
                                ))}
                            />

                            <ComparisonRow
                                label="Moral Alignment"
                                icon={<Shield className="w-4 h-4" />}
                                values={compareList.map(hero => <AlignmentBadge alignment={hero.biography.alignment} />)}
                            />

                            <ComparisonRow
                                label="Universe"
                                icon={<Briefcase className="w-4 h-4" />}
                                values={compareList.map(hero => <PublisherBadge publisher={hero.biography.publisher} />)}
                            />

                            {/* Power Statistics */}
                            <SectionHeader title="Power Statistics" icon={<Zap className="w-5 h-5" />} />

                            {powerStats.map(({ key, label, color, icon }) => {
                                const isHighest = getHighestStat(key);
                                return (
                                    <ComparisonRow
                                        key={key}
                                        label={label}
                                        icon={icon}
                                        values={compareList.map((hero, index) => (
                                            <div className={`flex items-center justify-center space-x-3 ${isHighest[index] ? 'font-bold' : ''}`}>
                                                <PowerBar value={hero.powerstats[key]} color={color} />
                                            </div>
                                        ))}
                                    />
                                );
                            })}

                            {/* Physical Specs */}
                            <SectionHeader title="Physical Specifications" icon={<Eye className="w-5 h-5" />} />

                            <ComparisonRow
                                label="Species"
                                icon={<Users className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-700 text-gray-200">
                                        {hero.appearance.race}
                                    </span>
                                ))}
                            />

                            <ComparisonRow
                                label="Height"
                                icon={<Activity className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="dark:text-gray-200 font-mono">
                                        {hero.appearance.height.join(' / ')}
                                    </div>
                                ))}
                            />

                            <ComparisonRow
                                label="Weight"
                                icon={<Gauge className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="dark:text-gray-200 font-mono">
                                        {hero.appearance.weight.join(' / ')}
                                    </div>
                                ))}
                            />

                            <ComparisonRow
                                label="Eye Color"
                                icon={<Eye className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-500 dark:text-indigo-300 border border-indigo-500/30">
                                        {hero.appearance.eyeColor}
                                    </span>
                                ))}
                            />

                            {/* Origin Story */}
                            <SectionHeader title="Origin & Background" icon={<Calendar className="w-5 h-5" />} />

                            <ComparisonRow
                                label="Birthplace"
                                icon={<MapPin className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="dark:text-gray-200 text-sm">
                                        {hero.biography.placeOfBirth}
                                    </div>
                                ))}
                            />

                            <ComparisonRow
                                label="First Seen"
                                icon={<Calendar className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-200 dark:bg-gray-800/50 p-2 rounded">
                                        {hero.biography.firstAppearance}
                                    </div>
                                ))}
                            />

                            <ComparisonRow
                                label="Known Aliases"
                                icon={<Users className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="flex justify-center flex-wrap gap-1">
                                        {hero.biography.aliases.map((alias, index) => (
                                            <span key={index} className="inline-block bg-gray-700 text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
                                                {alias}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            />

                            {/* Professional Life */}
                            <SectionHeader title="Professional Profile" icon={<Briefcase className="w-5 h-5" />} />

                            <ComparisonRow
                                label="Occupation"
                                icon={<Briefcase className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="text-xs text-gray-700 bg-gray-200 dark:text-gray-300 leading-relaxed dark:bg-gray-800/50 p-2 rounded">
                                        {hero.work.occupation}
                                    </div>
                                ))}
                            />

                            <ComparisonRow
                                label="Base of Operations"
                                icon={<MapPin className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <span className="inline-flex items-center text-gray-700 bg-gray-200 dark:text-gray-300 px-4 py-2 rounded text-xs font-semibold dark:bg-gray-800/50">
                                        {hero.work.base}
                                    </span>
                                ))}
                            />

                            <ComparisonRow
                                label="Team Affiliations"
                                icon={<Users className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="text-xs text-gray-700 bg-gray-200 dark:text-gray-300 leading-relaxed dark:bg-gray-800/50 p-2 rounded">
                                        {hero.connections.groupAffiliation}
                                    </div>
                                ))}
                            />

                            {/* Personal Connections */}
                            <SectionHeader title="Personal Network" icon={<Heart className="w-5 h-5" />} />

                            <ComparisonRow
                                label="Family & Relations"
                                icon={<Heart className="w-4 h-4" />}
                                values={compareList.map(hero => (
                                    <div className="text-xs text-gray-700 bg-gray-200 dark:text-gray-300 leading-relaxed dark:bg-gray-800/50 p-2 rounded">
                                        {hero.connections.relatives}
                                    </div>
                                ))}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Compare