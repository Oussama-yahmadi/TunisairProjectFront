import { User } from "./user";

export class Attestation {
    id!: number;
    githubLink!: string;
    reportPdf!: Uint8Array; // Représentation binaire du PDF (Uint8Array pour correspondre à un fichier binaire)
    isValidated!: boolean;
    stagiaire!: User; // Référence à l'utilisateur stagiaire
    tuteur!: User;
}