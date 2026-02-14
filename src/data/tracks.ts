
export interface Track {
    id: string;
    name: string;
    originalKey: string;
    url: string;
    bpm?: number;
    isPremium?: boolean;
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
        bpm: 120,
        isPremium: true
    },
    {
        id: '3',
        name: 'Bossa Nova - Bateria',
        originalKey: 'C',
        url: '/audio/bossa-nova-drum-loop.mp3', // Updated filename
        bpm: 120,
        isPremium: true
    },
    {
        id: '4',
        name: 'Jazz Four',
        originalKey: 'C',
        url: '/audio/Jazz-four-90.mp3', // Updated filename
        bpm: 90,
        isPremium: false
    },
];
