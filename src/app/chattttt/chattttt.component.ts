import { Component, OnInit } from '@angular/core';
import { ChatbotServiceService } from '../chatbot-service.service';
import { ChatbotRequest } from '../Models/ChatbotRequest';

@Component({
  selector: 'app-chattttt',
  templateUrl: './chattttt.component.html',
  styleUrls: ['./chattttt.component.css']
})
export class ChatttttComponent implements OnInit {

  messages: any[] = [];
  userMessage: string = '';
  chatbotMessage: string = '';
  constructor(private chatbotService: ChatbotServiceService) { }

  ngOnInit(): void { }

  

}
