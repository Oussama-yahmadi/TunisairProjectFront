import { Component, OnInit } from '@angular/core';
import { Reunion } from '../Models/Reunion';
import { ReunionServiceService } from '../reunion-service.service';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';
import { Note } from '../Models/Note';
import { NoteService } from '../note.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-propsed-reunions-stagiaires',
  templateUrl: './propsed-reunions-stagiaires.component.html',
  styleUrls: ['./propsed-reunions-stagiaires.component.css']
})
export class PropsedReunionsStagiairesComponent  implements OnInit{
 
  reunionsPlanifiees: Reunion[] = [];
  userConnected: User | null = null;

  // Properties for adding notes
  selectedReunion: Reunion | null = null;
  newNoteContent: string = '';
  notesByReunion: { [key: number]: Note[] } = {}; // To store notes for each reunion
  notesModalReunionId: number | null = null; // To store the reunion ID for displaying notes in modal

  constructor(
    private reunionService: ReunionServiceService,
    private authService: AuthServiceService,
    private noteService: NoteService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
        if (this.userConnected) {
          this.loadReunions(this.userConnected.id);
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }

  loadReunions(idStagiaire: number): void {
    this.reunionService.getReunionsByStagiaire(idStagiaire).subscribe(
      reunions => {
        this.reunionsPlanifiees = reunions;
        console.log('Réunions par stagiaire:', this.reunionsPlanifiees);
        // Load notes for each reunion
        this.reunionsPlanifiees.forEach(reunion => {
          this.loadNotesForReunion(reunion.idReunion);
        });
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des réunions par stagiaire:', error);
      }
    );
  }

  loadNotesForReunion(reunionId: number): void {
    this.noteService.getNotesByReunion(reunionId).subscribe(
      notes => {
        this.notesByReunion[reunionId] = notes;
        console.log(`Notes for Reunion ${reunionId}:`, notes);
      },
      error => {
        console.error(`Erreur lors de la récupération des notes pour la réunion ${reunionId}:`, error);
      }
    );
  }

  accepterReunion(id: number): void {
    this.reunionService.setEstAccepteeTrue(id).subscribe(
      updatedReunion => {
        console.log('Réunion acceptée:', updatedReunion);
        this.updateReunionInList(updatedReunion);
      },
      error => {
        console.error('Erreur lors de l\'acceptation de la réunion:', error);
      }
    );
  }

  refuserReunion(id: number): void {
    this.reunionService.setEstRefuseTrue(id).subscribe(
      updatedReunion => {
        console.log('Réunion refusée:', updatedReunion);
        this.updateReunionInList(updatedReunion);
      },
      error => {
        console.error('Erreur lors du refus de la réunion:', error);
      }
    );
  }

  private updateReunionInList(updatedReunion: Reunion): void {
    const index = this.reunionsPlanifiees.findIndex(r => r.idReunion === updatedReunion.idReunion);
    if (index !== -1) {
      this.reunionsPlanifiees[index] = updatedReunion;
    }
  }

  // Methods for adding notes
  openAddNoteModal(reunion: Reunion): void {
    this.selectedReunion = reunion;
    this.newNoteContent = '';
  }

  addNote(): void {
    if (this.selectedReunion && this.userConnected && this.newNoteContent.trim()) {
      this.noteService.addNoteToReunion(this.selectedReunion.idReunion, this.userConnected.id, this.newNoteContent).subscribe(
        note => {
          console.log('Note ajoutée:', note);
          if (!this.notesByReunion[this.selectedReunion!.idReunion]) {
            this.notesByReunion[this.selectedReunion!.idReunion] = [];
          }
          this.notesByReunion[this.selectedReunion!.idReunion].push(note);
          this.newNoteContent = '';
          this.selectedReunion = null;
        },
        error => {
          console.error('Erreur lors de l\'ajout de la note:', error);
        }
      );
      window.location.reload();
    }
  }

  closeAddNoteModal(): void {
    this.selectedReunion = null;
    this.newNoteContent = '';
  }

  openViewNotesModal(reunionId: number): void {
    this.notesModalReunionId = reunionId;
    this.loadNotesForReunion(reunionId);
  }

  closeViewNotesModal(): void {
    this.notesModalReunionId = null;
  }
}
