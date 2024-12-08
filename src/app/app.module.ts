import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { OffresComponentComponent } from './offres-component/offres-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { StagiaireListComponent } from './stagiaire-list/stagiaire-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DemandeComponentComponent } from './demande-component/demande-component.component';


import { ListCondidatsComponent } from './list-condidats/list-condidats.component';
import { QuestionComponentComponent } from './question-component/question-component.component';
import { TesteurComponentComponent } from './testeur-component/testeur-component.component';
import { AddStagiaireComponent } from './add-stagiaire/add-stagiaire.component';
import { AddStagiaireModalComponent } from './add-stagiaire-modal/add-stagiaire-modal.component';
 

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTuteurComponent } from './add-tuteur/add-tuteur.component';
import { CalendrierAdminComponent } from './calendrier-admin/calendrier-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NavbarTuteurComponent } from './navbar-tuteur/navbar-tuteur.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { StagiairesTuteurComponent } from './stagiaires-tuteur/stagiaires-tuteur.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarStagiaireComponent } from './navbar-stagiaire/navbar-stagiaire.component';
import { ChartStagiaireTachesComponent } from './chart-stagiaire-taches/chart-stagiaire-taches.component';
import { NgChartsModule } from 'ng2-charts';
import { EncadrantPageComponent } from './encadrant-page/encadrant-page.component';
import { TachesStagaireComponent } from './taches-stagaire/taches-stagaire.component';
import { CalendrierStagiaireComponent } from './calendrier-stagiaire/calendrier-stagiaire.component';
import { FeedBackStagiaireComponent } from './feed-back-stagiaire/feed-back-stagiaire.component';
import { FeedBackModalComponent } from './feed-back-modal/feed-back-modal.component';
import { PlanifierReunionComponent } from './planifier-reunion/planifier-reunion.component';
import { ReunionsPlanifiesTuteurComponent } from './reunions-planifies-tuteur/reunions-planifies-tuteur.component';

import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FilesComponent } from './files/files.component';
import { QuiwComponent } from './quiw/quiw.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { TuteurStagiairesComponent } from './tuteur-stagiaires/tuteur-stagiaires.component';
import { TuteursAdminComponentComponent } from './tuteurs-admin-component/tuteurs-admin-component.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ListTachesTuteurComponent } from './list-taches-tuteur/list-taches-tuteur.component';
import { CalendrierTuteurComponent } from './calendrier-tuteur/calendrier-tuteur.component';
import { PropsedReunionComponent } from './propsed-reunion/propsed-reunion.component';
import { PropsedReunionsStagiairesComponent } from './propsed-reunions-stagiaires/propsed-reunions-stagiaires.component';
import { ProposerReunionComponent } from './proposer-reunion/proposer-reunion.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { MyReclamationsComponent } from './my-reclamations/my-reclamations.component';
import { AllReclamtionsComponent } from './all-reclamtions/all-reclamtions.component';
import { AdminDaschboardComponent } from './admin-daschboard/admin-daschboard.component';
import { TuteurReclamationsComponent } from './tuteur-reclamations/tuteur-reclamations.component';
import { ChartComponentComponent } from './chart-component/chart-component.component';
import { ChatbotComponentComponent } from './chatbot-component/chatbot-component.component';
import { ChatttttComponent } from './chattttt/chattttt.component';
import { CHATBOTCOMPONENTSTAGIAIREComponent } from './chatbotcomponentstagiaire/chatbotcomponentstagiaire.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { AttestationComponent } from './attestation/attestation.component';
import { TuteurAttestationsComponent } from './tuteur-attestations/tuteur-attestations.component';
import { DashboardBystagiaireComponent } from './dashboard-bystagiaire/dashboard-bystagiaire.component';













@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    OffresComponentComponent,
    LoginComponentComponent,
    AProposComponent,
    NavbarComponent,
    AddOffreComponent,
    StagiaireListComponent,
    NotfoundComponent,
    DemandeComponentComponent,
    ListCondidatsComponent,
    QuestionComponentComponent,
    TesteurComponentComponent,
    AddStagiaireComponent,
    AddStagiaireModalComponent,
    AddTuteurComponent,
    CalendrierAdminComponent,
    NavbarTuteurComponent,
    AddTacheComponent,
    StagiairesTuteurComponent,
    NavbarStagiaireComponent,
    ChartStagiaireTachesComponent,
    EncadrantPageComponent,
    TachesStagaireComponent,
    CalendrierStagiaireComponent,
    FeedBackStagiaireComponent,
    FeedBackModalComponent,
    PlanifierReunionComponent,
    ReunionsPlanifiesTuteurComponent,
 UploadfileComponent,
 FilesComponent,
 QuiwComponent,
 AddOffersComponent,
 TuteurStagiairesComponent,
 TuteursAdminComponentComponent,
 AddQuestionComponent,
 ListTachesTuteurComponent,
 CalendrierTuteurComponent,
 PropsedReunionComponent,
 PropsedReunionsStagiairesComponent,
 ProposerReunionComponent,
 AddReclamationComponent,
 MyReclamationsComponent,
 AllReclamtionsComponent,
 AdminDaschboardComponent,
 TuteurReclamationsComponent,
 ChartComponentComponent,
 ChatbotComponentComponent,
 ChatttttComponent,
 CHATBOTCOMPONENTSTAGIAIREComponent,
 RessourcesComponent,
 AttestationComponent,
 TuteurAttestationsComponent,
 DashboardBystagiaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    
    
    CommonModule,
    FullCalendarModule,
    NgbModule,
    NgChartsModule,
    
    
    
  
    
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
