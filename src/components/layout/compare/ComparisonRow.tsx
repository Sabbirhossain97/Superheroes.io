

export const ComparisonRow: React.FC<{
    label: string;
    icon: React.ReactNode;
    values: (string | React.ReactNode)[];
    className?: string;
}> = ({ label, icon, values, className = "" }) => (
    <>
        <tr className={`border-b hidden md:table-row text-center dark:border-gray-800 transition-all duration-200 ${className}`}>
            <td className="px-6 py-4 text-sm font-semibold bg-gray-100/80 dark:text-gray-300 dark:bg-gray-900/50 w-1/4">
                <div className="flex items-center space-x-3">
                    <div className="dark:text-blue-400">{icon}</div>
                    <span className='whitespace-nowrap'>{label}</span>
                </div>
            </td>
            {values.map((value, index) => (
                <td key={index} className="px-6 py-4 text-sm dark:text-gray-200 ">
                    {value}
                </td>
            ))}
        </tr>
        <tr className='w-full md:hidden'>
            <td colSpan={2}>
                <div className="flex py-4 dark:bg-gray-900 items-center justify-center space-x-3">
                    <div className="text-blue-400">{icon}</div>
                    <span className='whitespace-nowrap'>{label}</span>
                </div>
                <div className='flex justify-between px-0 sm:px-10 md:px-20'>
                    {values.map((value, index) => (
                        <div key={index} className="px-6 py-4 text-sm bg-transparent bg-red-500 text-gray-200 ">
                            {value}
                        </div>
                    ))}
                </div>
            </td>
        </tr>
    </>
);