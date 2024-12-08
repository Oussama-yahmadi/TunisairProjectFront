import { User } from "./user";

export class Reclamation {
    idReclamation!: number;
    objet!: string;
    description!: string;
    date!: Date;
    stagiaire!: User;
    tuteur!: User;
  }