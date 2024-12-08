import { Reunion } from "./Reunion";
import { User } from "./user";

export class Note {
    id!: number;
    content!: string;
    userId!: number;
    reunionId!: number;
    // Optionally, you can include related User and Reunion details
    user!: User;
    reunion!: Reunion;
  }