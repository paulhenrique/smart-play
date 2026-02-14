
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
        name: 'Samba - Demo',
        originalKey: 'D',
        url: '/audio/bossa-nova.mp3',
        bpm: 100
    },
    {
        id: '3',
        name: 'Jazz - Demo',
        originalKey: 'G',
        url: '/audio/bossa-nova.mp3',
        bpm: 140
    }
];
