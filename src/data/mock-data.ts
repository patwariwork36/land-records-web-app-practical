import { LandRecord } from '../types/land-record';

const villages = ['छेरकापुर', 'छड़िया', 'तिल्दा', 'गबौद'];
const firstNames = ['राम', 'श्याम', 'हरी', 'विजय', 'दिनेश', 'मनोज', 'राजेश', 'रवि', 'सुनील', 'अजय'];
const lastNames = ['कुमार', 'शर्मा', 'वर्मा', 'पटेल', 'साहू', 'तिवारी', 'मिश्रा', 'सिंह', 'यादव', 'साकेत'];
const landTypes = ['सिंचित भूमि', 'असिंचित भूमि', 'पड़त भूमि'];

export const generateMockData = (): LandRecord[] => {
    const records: LandRecord[] = [];

    // village weights: छेरकापुर (20), छड़िया (10), तिल्दा (10), गबौद (10)
    const villageCounts = {
        'छेरकापुर': 20,
        'छड़िया': 10,
        'तिल्दा': 10,
        'गबौद': 10
    };

    let id = 1;

    Object.entries(villageCounts).forEach(([village, count]) => {
        // Generate batches of records with same basra numbers (portfolio)
        for (let i = 0; i < count / 2; i++) {
            const basraNumber = (400 + Math.floor(Math.random() * 500)).toString();
            const ownerName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

            // Each basra has 2 khasras
            for (let j = 1; j <= 2; j++) {
                const khasraBase = 100 + Math.floor(Math.random() * 400);
                const khasraNumber = `${khasraBase}/${j}`;

                records.push({
                    id: id++,
                    serialNumber: 1000 + id,
                    village,
                    khasraNumber,
                    basraNumber,
                    area: Number((Math.random() * 5 + 0.1).toFixed(3)),
                    ownerName,
                    isGrazingLand: Math.random() > 0.8 ? 'हाँ' : 'नहीं',
                    isCeilingLand: Math.random() > 0.9 ? 'हाँ' : 'नहीं',
                    landType: landTypes[Math.floor(Math.random() * landTypes.length)],
                    nistarDetails: 'साधारण'
                });
            }
        }
    });

    return records;
};

export const mockRecords = generateMockData();
