import React, { useState } from 'react';
import { LandRecord, SearchTab } from './types/land-record';
import { mockRecords } from './data/mock-data';
import { Search, Map, FileText, ChevronRight, Info, AlertCircle, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function App() {
    const [activeTab, setActiveTab] = useState<SearchTab>('khasra');
    const [village, setVillage] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState<LandRecord[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!village) {
            setError('कृपया ग्राम चुनें');
            return;
        }
        if (!searchValue) {
            setError(activeTab === 'khasra' ? 'खसरा नंबर डालें' : 'बसरा नंबर डालें');
            return;
        }

        setError('');
        setIsSearching(true);
        setHasSearched(true);

        // Simulate loading
        setTimeout(() => {
            let filtered: LandRecord[] = [];
            if (activeTab === 'khasra') {
                const found = mockRecords.find(r => r.village === village && r.khasraNumber === searchValue);
                filtered = found ? [found] : [];
            } else {
                filtered = mockRecords.filter(r => r.village === village && r.basraNumber === searchValue);
            }
            setResults(filtered);
            setIsSearching(false);
        }, 600);
    };

    const totalArea = results.reduce((sum, r) => sum + r.area, 0);

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center p-4 md:p-8">
            <header className="w-full max-w-4xl mb-8 animate-in text-center">
                <div className="flex justify-center items-center mb-2">
                    <Map className="w-8 h-8 text-primary mr-2" />
                    <h1 className="text-3xl font-bold text-dark">भूमि रिकॉर्ड खोज</h1>
                </div>
                <p className="text-gray-500">ग्राम पंचायत स्तर पर भूमि रिकॉर्ड की त्वरित खोज</p>
            </header>

            <main className="w-full max-w-4xl space-y-6">
                {/* Tab Navigation */}
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => { setActiveTab('khasra'); setHasSearched(false); setResults([]); }}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center",
                            activeTab === 'khasra' ? "bg-primary text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        खसरा खोज
                    </button>
                    <button
                        onClick={() => { setActiveTab('basra'); setHasSearched(false); setResults([]); }}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center",
                            activeTab === 'basra' ? "bg-secondary text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        बसरा खोज (Owner Portfolio)
                    </button>
                </div>

                {/* Search Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in" style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ग्राम चुनें</label>
                            <select
                                value={village}
                                onChange={(e) => setVillage(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
                            >
                                <option value="">-- चुनें --</option>
                                <option value="छेरकापुर">छेरकापुर</option>
                                <option value="छड़िया">छड़िया</option>
                                <option value="तिल्दा">तिल्दा</option>
                                <option value="गबौद">गबौद</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {activeTab === 'khasra' ? 'खसरा नंबर' : 'बसरा नंबर'}
                            </label>
                            <input
                                type="text"
                                placeholder={activeTab === 'khasra' ? "उदा: 123/1" : "उदा: 456"}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col justify-end">
                            <button
                                type="submit"
                                disabled={isSearching}
                                className={cn(
                                    "w-full p-3 rounded-lg font-bold text-white transition-all transform active:scale-95 flex items-center justify-center",
                                    activeTab === 'khasra' ? "bg-primary hover:bg-blue-600" : "bg-secondary hover:bg-green-600",
                                    isSearching && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'खोजें'}
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-3 flex items-center text-red-500 text-sm animate-in">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Results Area */}
                <div className="space-y-6">
                    {isSearching && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                            <p>खोज जारी है...</p>
                        </div>
                    )}

                    {!isSearching && hasSearched && results.length === 0 && (
                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center animate-in">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-500">कोई रिकॉर्ड नहीं मिला</h3>
                            <p className="text-gray-400">कृपया जानकारी की शुद्धता जांचें</p>
                        </div>
                    )}

                    {!isSearching && results.length > 0 && (
                        <div className="space-y-6 animate-in">
                            {activeTab === 'basra' && (
                                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-green-900 flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            स्वामित्व सारांश (Portfolio Summary)
                                        </h2>
                                        <p className="text-green-700">भूमिस्वामी: <span className="font-bold">{results[0].ownerName}</span></p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-green-100">
                                            <p className="text-xs text-green-600 font-medium">कुल खसरा</p>
                                            <p className="text-xl font-bold text-green-900">{results.length}</p>
                                        </div>
                                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-green-100">
                                            <p className="text-xs text-green-600 font-medium">कुल क्षेत्रफल</p>
                                            <p className="text-xl font-bold text-green-900">{totalArea.toFixed(3)} <span className="text-sm font-normal">हे.</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={cn(
                                "grid gap-4",
                                activeTab === 'khasra' ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                            )}>
                                {results.map((record) => (
                                    <div key={record.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className={cn(
                                            "p-4 flex justify-between items-center text-white",
                                            activeTab === 'khasra' ? "bg-primary" : "bg-secondary"
                                        )}>
                                            <div className="flex items-center">
                                                <Map className="w-5 h-5 mr-2 opacity-80" />
                                                <span className="font-bold">ग्राम: {record.village}</span>
                                            </div>
                                            <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ID: {record.serialNumber}</span>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-3 rounded-xl">
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">खसरा नंबर</p>
                                                    <p className="text-xl font-bold text-dark">{record.khasraNumber}</p>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded-xl">
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">बसरा नंबर</p>
                                                    <p className="text-xl font-bold text-dark">{record.basraNumber}</p>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 pt-4 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center text-gray-500">
                                                        <Info className="w-4 h-4 mr-2" />
                                                        <span>भूमिस्वामी</span>
                                                    </div>
                                                    <span className="font-bold text-dark">{record.ownerName}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center text-gray-500">
                                                        <ChevronRight className="w-4 h-4 mr-2" />
                                                        <span>क्षेत्रफल</span>
                                                    </div>
                                                    <span className="font-bold text-dark">{record.area.toFixed(3)} हेक्टेयर</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center text-gray-500">
                                                        <ChevronRight className="w-4 h-4 mr-2" />
                                                        <span>भूमि प्रकार</span>
                                                    </div>
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-bold">
                                                        {record.landType}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center border-t border-dashed border-gray-100 pt-3 mt-2">
                                                    <span className="text-sm text-gray-400 italic">चराई भूमि: {record.isGrazingLand}</span>
                                                    <span className="text-sm text-gray-400 italic">सीलिंग भूमि: {record.isCeilingLand}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
                <p>&copy; 2024 भूमि रिकॉर्ड प्रबंधन प्रणाली - तिल्दा तहसील</p>
            </footer>
        </div>
    );
}
