import { User } from "./user";

export class Tache {
    id!: number;
    titre!: string;
    description!: string;
    terminee!: boolean;
    score!: string;
    dateTermine!: Date;
    date!: Date;
    heure!: Date;
    tuteur!: User;
    stagiaire!: User;
}