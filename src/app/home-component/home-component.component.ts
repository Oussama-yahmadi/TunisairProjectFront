import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  @ViewChild('aPropos') aProposElement!: ElementRef;
  constructor() {}

  


  ngOnInit(): void {
    // this.scrollToElement();
  }

  scrollToElement(): void {
    this.aProposElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

  


}
