import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from '../Models/QuizQuestion';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-quiw',
  templateUrl: './quiw.component.html',
  styleUrls: ['./quiw.component.css']
})
export class QuiwComponent implements OnInit {
  
  selectedAnswerId!: number;
  userConnected: User | null = null;

   user = {
    id: 4,
    nom: "wesssss",
    prenom: "Poooo",
    email: "email@example.com",
    score: 0,
    faculte: "Nom de la faculté",
    niveau: "Niveau de l'utilisateur",
    role: "STAGIAIRE",
    quizPassed: false,
    password: null,
    imageName: "nike.jpeg",
    tuteur: {
      id: 3,
      nom: "tuteur",
      prenom: "tuteur",
      email: "john.doe@example.com",
      score: null,
      faculte: null,
      niveau: null,
      role: "TUTEUR",
      quizPassed: null,
      password: null,
      imageName: "222091554_4170749743006210_1616061083269044921_n.jpg",
      tuteur: null,
      stage: null,
      cin: 123456789,
      telephone: 987654321
    },
    stage: null,
    cin: null,
    telephone: null
  };
 
  questions: QuizQuestion[] = [];
  question: QuizQuestion = new QuizQuestion;
  currentQuestionIndex = 0;
  score = 0;
  constructor(private http: HttpClient, private authService: AuthServiceService) { }
 
 
  ngOnInit(): void {

    this.authService.getUserDetails().subscribe(
      (userDetails: User | null) => {
        this.userConnected = userDetails;
        console.log("User Details:", JSON.stringify(this.userConnected));
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );

    this.loadNextQuestion();


    // this.loadNextQuestion();
    // this.http.get<any>('http://localhost:8089/PFE/QA/randomQuestion').subscribe(
    //   question => {
    //     this.question = question;
    //   },
    //   error => console.error('Error fetching random question:', error)
    // );
  }

  // loadRandomQuestion() {
  //   this.http.get<any>('http://localhost:8089/PFE/QA/randomQuestion').subscribe(
  //     question => {
  //       this.questions.push(question);
  //     },
  //     error => console.error('Error fetching random question:', error)
  //   );
  // }



  //////correcte
  // loadRandomQuestion() {
  //   this.http.get<any>('http://localhost:8089/PFE/QA/randomQuestion').subscribe(
  //     question => {
  //       this.question = question;
  //     },
  //     error => console.error('Error fetching random question:', error)
  //   );
  // }

  // submitAnswer(answerId: number) {
  //   const question = this.questions[this.currentQuestionIndex];
  //   const answer = question.answers.find(a => a.id === answerId);
  //   if (answer && answer.isCorrect) {
  //     this.score++;
  //   }
  //   this.loadRandomQuestion();
  // }
//////-----------------------------------
  // submitAnswer(answerId: number) {
  //   const payload = {
  //     questionId: this.questions[this.currentQuestionIndex].id,
  //     answerId: answerId
  //   };
  //   this.http.post<boolean>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
  //     isCorrect => {
  //       if (isCorrect) {
  //         this.score++;
  //         this.loadNextQuestion();
  //         console.log("correct"+isCorrect);
          
  //       }
  //       this.loadNextQuestion();
  //     },
  //     error => console.error('Error submitting answer:', error)
  //   );
  // }
 //////////-------------------------
 
 /////correcte
  // submitAnswer(answerId: number) {
  //   const payload = {
  //     questionId: this.question.id,
  //     answerId: answerId
  //   };
  //   this.http.post<boolean>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
  //     isCorrect => {
  //       if (isCorrect) {
  //         this.score++;
  //         console.log("correcte");
          
  //       }
        
  //     },
  //     error => console.error('Error submitting answer:', error)
  //   );
  // }






  //try

 
  // submitAnswer(answerId: number) {
  //   console.log('Submitting answer...');
  //   const payload = {
  //     questionId: this.question.id,
  //     answerId: answerId
  //   };
  //   this.http.post<boolean>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
  //     isCorrect => {
  //       if (isCorrect) {
  //         this.score++;
  //         console.log("correcte");
          
  //       }
  //       this.loadNextQuestion();
  //     },
  //     error => console.error('Error submitting answer:', error)
  //   );
  // }
//   submitAnswer(answerId: number) {
//     const payload = {
//         questionId: this.question.id,
//         answerId: answerId
//     };
//     this.http.post<number>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
//         newScore => {
//           console.log("reponse");
          
          
          
//             this.score = newScore; // Met à jour le score avec la nouvelle valeur
//             console.log(this.score);
//         },
//         error => console.error('Error submitting answer:', error)
//     );
// }






//////////////////////////////////////////////////////////////////////////////////////////////////////
// submitAnswer(answerId: number) {
//   const payload = {
//     questionId: this.question.id,
//     answerId: answerId
//   };
//   this.http.post<boolean>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
//     isCorrect => {
//       if (isCorrect) {
//         this.score++;
//         this.question.answers.forEach(answer => {
//           if (answer.id === answerId) {
//             answer.selected = true;
//             window.confirm("Réponse correcte");
//             this.loadNextQuestion();
//           } else {
//             answer.selected = false;
//             console.log("Fausse réponse");
//           }
//         });
//       }
//     },
//     error => console.error('Error submitting answer:', error)
//   );
// }
submitAnswer(answerId: number) {
  const payload = {
    questionId: this.question.id,
    answerId: answerId
  };

  // Submit the answer and update score if the answer is correct, without showing alerts
  this.http.post<boolean>('http://localhost:8089/PFE/QA/submit', payload).subscribe(
    isCorrect => {
      if (isCorrect) {
        // Increment score without displaying any alert
        this.score++;
      }
      // Directly load the next question after submission
      this.loadNextQuestion();
    },
    error => console.error('Error submitting answer:', error)
  );
}

loadNextQuestion() {
  // Vérifiez d'abord si l'index actuel est valide
  if (this.currentQuestionIndex < this.questions.length) {
    // Si la question existe déjà dans le tableau, l'utiliser
    this.question = this.questions[this.currentQuestionIndex];
    this.currentQuestionIndex++;
  } else if (this.currentQuestionIndex < 20) { // Limitez à 3 questions
    // Si l'index dépasse la longueur du tableau, charger une nouvelle question
    this.http.get<any>('http://localhost:8089/PFE/QA/randomQuestion').subscribe(
      question => {
        // Vérifiez que la question a été bien récupérée
        if (question) {
          this.questions.push(question);  // Ajoutez la question à la liste
          this.question = question;
          this.currentQuestionIndex++;
        } else {
          console.log('Erreur: question non chargée');
        }
      },
      error => {
        console.error('Erreur lors de la récupération de la question:', error);
      }
    );
  } else {
    console.log('Vous avez atteint le nombre maximum de questions.');
  }
}


// loadNextQuestion() {
//   if (this.currentQuestionIndex < this.questions.length) {
//     this.question = this.questions[this.currentQuestionIndex];
//     this.currentQuestionIndex++;
//   } else if (this.currentQuestionIndex < 3) { // Limiter à 5 questions
//     this.http.get<any>('http://localhost:8089/PFE/QA/randomQuestion').subscribe(
//       question => {
//         this.questions.push(question);
//         this.question = question;
//         this.currentQuestionIndex++;
//       },
//       error => console.log('Error fetching random question:', error)
//     );
//   }
// }

getScore() {
  this.http.get<number>('http://localhost:8089/PFE/QA/score').subscribe(
    score => {
      this.score = score;
      if (this.userConnected) {
        this.updateScore(this.userConnected.id, this.score); // Utiliser l'ID de l'utilisateur connecté
      }
      console.log("Score associé");
    },
    error => console.error('Error fetching score:', error)
  );
}
/////////////////////////////////////////////////////////////////////////////////////////


// updateScore(userId: number, score: number): Observable<any> {
//   const url = `http://localhost:8089/PFE/QA/${userId}/${score}`;
//   console.log("Score:" + score);
//   console.log("URL:" + url);
//   return this.http.post(url, {});  // Suppression des query parameters
// }

updateScore(userId: number | undefined, score: number): void {
  const url = `http://localhost:8089/PFE/QA/${userId}/${score}`; // URL pour appeler ton endpoint
  this.http.post<User>(url, {}).subscribe( // Note le <User> après post
    (user: User) => {
      console.log("Score mis à jour avec succès");
      this.userConnected = user; // Mettre à jour l'utilisateur connecté avec les nouvelles données (score, quizPassed)
      window.location.reload();
    },
    error => {
      console.error('Erreur lors de la mise à jour du score:', error);
    }
  );
  window.location.reload();
}



logout(): void {
  this.authService.logout();
  console.log("deconnected");
  
}

}


