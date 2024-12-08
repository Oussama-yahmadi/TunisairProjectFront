import { Component } from '@angular/core';
import { ChatbotServiceService } from '../chatbot-service.service';
import { ChatbotRequest } from '../Models/ChatbotRequest';

@Component({
  selector: 'app-chatbotcomponentstagiaire',
  templateUrl: './chatbotcomponentstagiaire.component.html',
  styleUrls: ['./chatbotcomponentstagiaire.component.css']
})
export class CHATBOTCOMPONENTSTAGIAIREComponent {

  messages: any[] = [];
  userMessage: string = '';
  chatbotMessage: string = '';
  constructor(private chatbotService: ChatbotServiceService) { }

  ngOnInit(): void { }

  sendMessage(): void {
    if (this.userMessage.trim()) {
        this.messages.push({ text: this.userMessage, sender: 'user' });

        const request: ChatbotRequest = { message: this.userMessage };

        this.chatbotService.sendMessage(request).subscribe(
            response => {
                console.log('Received response:', response);
                this.messages.push({ text: response, sender: 'chatbot' });
            },
            error => {
                console.error('Error received:', error);
                this.messages.push({ text: 'Sorry, there was an error sending the message.', sender: 'chatbot' });
            }
        );

        this.userMessage = '';
    }
  }


}
