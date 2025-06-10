export const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <tr className="dark:bg-slate-800 bg-gray-200">
        <td colSpan={3} className="px-6 py-4 text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="dark:text-white p-1 rounded-lg">{icon}</div>
                <h3 className="text-lg font-bold dark:text-white tracking-wide">{title}</h3>
            </div>
        </td>
    </tr>
);