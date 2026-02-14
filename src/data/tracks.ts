
export interface Track {
    id: string;
    name: string;
    originalKey: string;
    url: string;
    bpm?: number;
}

export const tracks: Track[] = [
    {
        id: '1',
        name: 'Bossa Nova - Piano Completo',
        originalKey: 'C',
        url: '/audio/bossa-nova.mp3', // Updated filename
        bpm: 120
    },
    {
        id: '2',
        name: 'Bossa Nova - Piano Baixo',
        originalKey: 'C',
        url: '/audio/bossa-nova-piano-baixo.mp3', // Updated filename
        bpm: 120
    },
    {
        id: '3',
        name: 'Bossa Nova - Bateria',
        originalKey: 'C',
        url: '/audio/bossa-nova-drum-loop.mp3', // Updated filename
        bpm: 120
    },
];
