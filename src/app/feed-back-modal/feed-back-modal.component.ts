import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed-back-modal',
  templateUrl: './feed-back-modal.component.html',
  styleUrls: ['./feed-back-modal.component.css']
})
export class FeedBackModalComponent {
  private modalService = inject(NgbModal);


  
  openBackDropCustomClass(content: TemplateRef<any>) {
    
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    
	}

}
