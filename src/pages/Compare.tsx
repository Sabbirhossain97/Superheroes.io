import { useCompare } from '@/components/context/CompareContext'
import SuperheroHeader from '@/components/superhero/SuperheroHeader';

function Compare() {
    const { compareList } = useCompare();
    console.log(compareList)
    return (
        <div className="min-h-screen bg-background">
            <SuperheroHeader />
            <div className="container mx-auto px-4 py-8">
                <h1 className='text-4xl text-center font-semibold leading-none tracking-tight'>Batman vs Superman</h1>
            </div>
        </div>
    )
}

export default Compare