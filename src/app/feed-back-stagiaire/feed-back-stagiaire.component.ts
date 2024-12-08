import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed-back-stagiaire',
  templateUrl: './feed-back-stagiaire.component.html',
  styleUrls: ['./feed-back-stagiaire.component.css']
})
export class FeedBackStagiaireComponent implements OnInit{
  modal: any;
  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    
    
  }

  openVerticallyCentered(content: TemplateRef<any>) {
   
		this.modalService.open(content, { centered: true });

	}

  openModal() {
    this.modal.nativeElement.show();
  }

}
