import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, Save } from 'lucide-react';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        unique_barcode: '',
        first_name: '',
        last_name: '',
        company_name: '',
        email: '',
        mobile_no: '',
        category_id: '',
        payment_status: false,
        payment_method: '',
        receipt_no: '',
        photo_url: ''
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
        if (isEdit) {
            fetchUser();
        }
    }, [id, isEdit]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8888/categories/');
            setCategories(response.data);
        } catch (err) {
            console.error('Failed to load categories', err);
            setError('Failed to load categories.');
        }
    };

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8888/users/${id}`);
            const user = response.data;
            setFormData({
                unique_barcode: user.unique_barcode || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                company_name: user.company_name || '',
                email: user.email || '',
                mobile_no: user.mobile_no || '',
                category_id: user.category_id || '',
                payment_status: user.payment_status || false,
                payment_method: user.payment_method || '',
                receipt_no: user.receipt_no || '',
                photo_url: user.photo_url || ''
            });
        } catch (err) {
            console.error('Failed to load user', err);
            setError('Failed to load user details.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                category_id: parseInt(formData.category_id, 10)
            };

            if (isEdit) {
                await axios.put(`http://localhost:8888/users/${id}`, payload);
            } else {
                await axios.post('http://localhost:8888/users/', payload);
            }
            navigate('/registration');
        } catch (err) {
            console.error('Failed to save user', err);
            setError(err.response?.data?.detail || 'Failed to save user.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 p-8 text-slate-50">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/registration')}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        {isEdit ? 'Edit User' : 'Create New User'}
                    </h1>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">First Name <span className="text-red-400">*</span></label>
                                <input required type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Last Name <span className="text-red-400">*</span></label>
                                <input required type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email <span className="text-red-400">*</span></label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Mobile No. <span className="text-red-400">*</span></label>
                                <input required type="text" name="mobile_no" value={formData.mobile_no} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Company Name <span className="text-red-400">*</span></label>
                                <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Unique Barcode <span className="text-red-400">*</span></label>
                                <input required type="text" name="unique_barcode" value={formData.unique_barcode} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Category <span className="text-red-400">*</span></label>
                                <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.category_id} value={cat.category_id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Payment Method <span className="text-red-400">*</span></label>
                                <input required type="text" name="payment_method" value={formData.payment_method} onChange={handleChange} placeholder="e.g. Cash, CC, Net Banking" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Receipt No. <span className="text-red-400">*</span></label>
                                <input required type="text" name="receipt_no" value={formData.receipt_no} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Photo URL</label>
                                <input type="url" name="photo_url" value={formData.photo_url} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="payment_status" checked={formData.payment_status} onChange={handleChange} className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                                <span className="text-sm font-medium text-slate-300">Payment Completed (Status: Paid)</span>
                            </label>
                        </div>

                        <div className="pt-6 flex justify-end gap-4 border-t border-slate-700/50">
                            <button
                                type="button"
                                onClick={() => navigate('/registration')}
                                className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isEdit ? 'Save Changes' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
