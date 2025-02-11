import { Status } from "./status";

export interface Schadeclaim {
    id: string;
    gebruikerEmail: string;
    perceelId: number;
    naam: string;
    voornaam: string;
    gemeente: string;
    straat: string;
    huisnummer: string;
    busnummer?: string;
    startDatum: string;
    eindDatum: string;
    bredeWeersverzekering: boolean;
    schadeNietVerzekerd: boolean;
    percentageVerzekerd: string;
    datumVanOndertekening: string;
    status: Status;
    handtekening: string;
    opmerking: string;
    geschatteKost: string;
    documentPath: string;
    typeSchade: string;
    beschrijving: string;
    schadeDetails: Array<SchadeDetails>;
    is_deleted: boolean;
    creation: number;
    updated_at: number;
}

export interface SchadeDetails {
    perceelId: number;
    hoofdgemeente: string;
    postcode: string;
    teelt: string;
    perceelOppHa: string;
    schadeBedrag: string;
    isCollapsed: boolean;
    persoonlijkeNaam: string;
    coordinates: number[][][];
}

export enum TypeSchade {
    regenval = 'hevige en aanhoudende regenval',
    overstroming = 'overstroming',
    stormwinden = 'stormwinden en rukwinden met een lokaal karakter',
    aardbeving = 'aardbeving',
    droogte = 'ernstige droogte (zonnebrand komt niet in aanmerking)',
    vorst = 'uitzonderlijke vorst',
    natuurbrand = 'natuurbrand van natuurlijke oorsprong (zonnebrand komt niet in aanmerking)',
    grondverzakking = 'aardverschuiving of grondverzakking',
    hagel = 'hagelbuien',
    sneeuw_ijs = 'sneeuw- of ijsdruk',
    vulkaan = 'vulkaanuitbarsting',
    orkaan = 'orkaan',
}