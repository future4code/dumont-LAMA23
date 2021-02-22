export class Band {
    constructor(
        private id: string, 
        private name: string,
        private musicGenre: string,
        private responsible: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getMusicGenre(): string {
        return this.musicGenre
    }

    public getResponsible(): string {
        return this.responsible
    }

    public setName(name: string) {
        this.name = name
    }

    public setMusicGenre(musicGenre: string) {
        this.musicGenre = musicGenre
    }

    public setResponsible(responsible: string) {
        this.responsible = responsible
    }
    
    public static toBand(data?: any): Band | undefined {
        return (data && new Band(
            data.id,
            data.name,
            data.musicGenre || data.main_genre || data.music_genre || data.musicGenre,
            data.responsible
        ))
    }
}

export interface BandInputDTO {
    name: string,
    musicGenre: string,
    responsible: string
}