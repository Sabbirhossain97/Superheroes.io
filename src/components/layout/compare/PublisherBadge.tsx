import { Briefcase } from "lucide-react";

export const PublisherBadge: React.FC<{ publisher: string }> = ({ publisher }) => {
    const isMarvel = publisher.includes('Marvel');
    const isDC = publisher.includes('DC');

    const badgeClasses = isMarvel
        ? 'bg-red-500/20 text-red-400 border-red-500/30'
        : isDC
            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            : 'bg-purple-500/20 text-purple-400 border-purple-500/30';

    return (
        <span className={`inline-flex whitespace-nowrap items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeClasses}`}>
            <Briefcase className="w-3 h-3 mr-1" />
            {publisher}
        </span>
    );
};