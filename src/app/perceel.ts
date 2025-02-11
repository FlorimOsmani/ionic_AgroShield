import { soortGewas } from './soortGewas';

export interface Perceel {
    id?: string;
    gebruikerEmail: string;
    soortGewas: soortGewas;
    gemeente: string;
    perceelDataId: number;
    persoonlijkeNaam: string;
    lengte: string;
    oppervlakte: string;
    toegevoegdeGebruikers: String[];
    is_deleted: boolean;
    creation: number;
    updated_at: number;
}