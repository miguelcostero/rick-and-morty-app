export type Character = {
    id: number;
    name: string;
    status: 'Dead' | 'Alive' | 'unknown';
    image: string;
    gender: 'unknown' | 'Female' | 'Male' | 'Genderless';
    species: string;
    locationName: string;
    origin: string;
    created: Date;
};
