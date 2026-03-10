import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Building, Phone, CreditCard, Tag, Edit2 } from 'lucide-react';

const UserTable = ({ users }) => {
    const navigate = useNavigate();
    if (!users || users.length === 0) {
        return (
            <div className="p-8 text-center text-slate-400">
                No users found.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-800 border-b border-slate-700/50 text-slate-300">
                    <tr>
                        <th className="px-6 py-4 font-semibold tracking-wide">User</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Contact</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Company</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Category / Paid</th>
                        <th className="px-6 py-4 font-semibold tracking-wide text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="hover:bg-slate-700/20 transition-colors duration-200"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold overflow-hidden">
                                        {user.Photo_URL ? (
                                            <img src={user.Photo_URL} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-200">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs text-slate-400 font-mono">
                                            #{user.unique_barcode}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <Phone className="w-3.5 h-3.5" />
                                        {user.mobile_no}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Building className="w-4 h-4 text-slate-500" />
                                    {user.company_name}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 w-fit">
                                        <Tag className="w-3.5 h-3.5" />
                                        Cat Name: {user.category.category_name}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <CreditCard className="w-3.5 h-3.5" />
                                        <span className={`px-2 py-0.5 rounded-md font-bold ${user.payment_status ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                            {user.payment_status ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => navigate(`/user/edit/${user.reg_id}`)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Edit User"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
