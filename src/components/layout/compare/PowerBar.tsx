export const PowerBar: React.FC<{ value: number; color: string; maxValue?: number }> = ({ value, color, maxValue = 100 }) => (
    <div className="flex items-center space-x-3">
        <div className="w-24 bg-gray-800 rounded-full h-2 border border-gray-700">
            <div
                className={`h-[6px] rounded-full transition-all duration-1000 ease-out ${color}`}
                style={{ width: `${(value / maxValue) * 100}%` }}
            ></div>
        </div>
        <span className="text-sm font-bold dark;text-white w-8">{value}</span>
    </div>
);