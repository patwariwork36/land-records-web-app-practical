export interface LandRecord {
    id: number;
    serialNumber: number;
    village: string;
    khasraNumber: string;
    basraNumber: string;
    area: number;
    ownerName: string;
    isGrazingLand: string;
    isCeilingLand: string;
    landType: string;
    nistarDetails: string;
}

export type SearchTab = 'khasra' | 'basra';
