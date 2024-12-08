import { Component, Input, TemplateRef, inject } from '@angular/core';
import { User } from '../Models/user';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-stagiaire-modal',
  templateUrl: './add-stagiaire-modal.component.html',
  styleUrls: ['./add-stagiaire-modal.component.css']
})
export class AddStagiaireModalComponent {
  private modalService = inject(NgbModal);
  @Input()
  user!: User;



  openBackDropCustomClass(content: TemplateRef<any>,produit: User) {
    this.user = produit;
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    
	}


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
