import { Shield } from "lucide-react";

export const AlignmentBadge: React.FC<{ alignment: string }> = ({ alignment }) => {
    const badgeClasses = alignment === 'good'
        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        : alignment === 'bad'
            ? 'bg-red-500/20 text-red-400 border-red-500/30'
            : 'bg-gray-500/20 text-gray-400 border-gray-500/30';

    return (
        <span className={`inline-flex text-gray-700 dark:text-gray-400 items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeClasses}`}>
            <Shield className="w-3 h-3 mr-1" />
            {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
        </span>
    );
};