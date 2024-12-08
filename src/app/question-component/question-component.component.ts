import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from '../question-service.service';
import { QuestionDTO } from '../Models/Question';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.css']
})
export class QuestionComponentComponent implements OnInit {
  questions: QuestionDTO[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: string | null = null;

  constructor(private questionService: QuestionServiceService) { }

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe((data: any) => {
        this.questions = data;
      });
     console.log(this.questions);
     
      
      
  }

  checkAnswer(): void {
    const question = this.questions[this.currentQuestionIndex];
    if (this.selectedAnswer === question.correctAnswer) {
      this.score++;
    }
    this.selectedAnswer = null; // Réinitialise la réponse sélectionnée
    this.nextQuestion();
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.questions.length) {
      alert('Quiz terminé! Votre score est de ' + this.score);
      // Réinitialiser le quiz ou effectuer d'autres actions selon vos besoins
    }
  }

}
