import { Injectable } from '@angular/core';

export enum soortGewas {
    Maïs = 'Maïs',
    Tarwe = 'Tarwe',
    Aardappelen = 'Aardappelen',
    Suikerbieten = 'Suikerbieten',
    Wortelen = 'Wortelen',
    Bloemkool = 'Bloemkool',
    Prei = 'Prei',
    Tomaten = 'Tomaten',
    Komkommers = 'Komkommers',
    Paprika = 'Paprika',
    Aubergines = 'Aubergines',
    Courgettes = 'Courgettes',
    Sla = 'Sla',
    Spinazie = 'Spinazie',
    Radijs = 'Radijs',
    Selder = 'Selder',
    Kool = 'Kool',
    Spruiten = 'Spruiten',
    Grasland = 'Grasland',
    Andere = 'Andere'
}


@Injectable({
    providedIn: 'root',
})

export class SoortGewasService {
    // Get the enum value for a given key
    getSoortGewasValue(key: string): string | null {
        return soortGewas[key as keyof typeof soortGewas] || null;
    }
}
