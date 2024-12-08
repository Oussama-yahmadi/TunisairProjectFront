import { User } from "./user";

export class Reunion {
    idReunion!: number;
    titre!: string;
    date!: Date;
    heure!: Date;
    duree!: number;
    estAcceptee!: boolean;
    estRefuse!: boolean;
    presence!: boolean;
    ponctuel!: boolean;
    tuteur!: User;
    stagiaire!: User;
}