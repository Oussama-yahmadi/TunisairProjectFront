import { Stage } from "./Stage";

export class User {
    id!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    cin!: number;
    telephone!: number;
    score!: number;
    faculte!: string;
    niveau!: string;
    role!: ROLE;
    quizPassed!: boolean;
  retriev!: string;
  imageName!:string ;
  stage!: Stage;
  }
  
  export enum ROLE {
    ADMIN = 'ADMIN',
    TUTEUR = 'TUTEUR',
    STAGIAIRE='STAGIAIRE',
    TESTEUR='TESTEUR',
    CONDIDAT='CONDIDAT'

  }