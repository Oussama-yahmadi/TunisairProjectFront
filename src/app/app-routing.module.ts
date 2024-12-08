import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AddTuteurComponent } from './add-tuteur/add-tuteur.component';
import { CalendrierAdminComponent } from './calendrier-admin/calendrier-admin.component';
import { NavbarTuteurComponent } from './navbar-tuteur/navbar-tuteur.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { StagiairesTuteurComponent } from './stagiaires-tuteur/stagiaires-tuteur.component';
import { NavbarStagiaireComponent } from './navbar-stagiaire/navbar-stagiaire.component';
import { ChartStagiaireTachesComponent } from './chart-stagiaire-taches/chart-stagiaire-taches.component';
import { EncadrantPageComponent } from './encadrant-page/encadrant-page.component';
import { TachesStagaireComponent } from './taches-stagaire/taches-stagaire.component';
import { CalendrierStagiaireComponent } from './calendrier-stagiaire/calendrier-stagiaire.component';
import { FeedBackStagiaireComponent } from './feed-back-stagiaire/feed-back-stagiaire.component';
import { PlanifierReunionComponent } from './planifier-reunion/planifier-reunion.component';
import { ReunionsPlanifiesTuteurComponent } from './reunions-planifies-tuteur/reunions-planifies-tuteur.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FilesComponent } from './files/files.component';
import { QuiwComponent } from './quiw/quiw.component';
import { TuteursAdminComponentComponent } from './tuteurs-admin-component/tuteurs-admin-component.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ListTachesTuteurComponent } from './list-taches-tuteur/list-taches-tuteur.component';
import { CalendrierTuteurComponent } from './calendrier-tuteur/calendrier-tuteur.component';
import { PropsedReunionComponent } from './propsed-reunion/propsed-reunion.component';
import { PropsedReunionsStagiairesComponent } from './propsed-reunions-stagiaires/propsed-reunions-stagiaires.component';
import { ProposerReunionComponent } from './proposer-reunion/proposer-reunion.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { MyReclamationsComponent } from './my-reclamations/my-reclamations.component';
import { RoleGuard } from './RoleGuard';
import { AllReclamtionsComponent } from './all-reclamtions/all-reclamtions.component';
import { AdminDaschboardComponent } from './admin-daschboard/admin-daschboard.component';
import { TuteurReclamationsComponent } from './tuteur-reclamations/tuteur-reclamations.component';
import { ChatbotComponentComponent } from './chatbot-component/chatbot-component.component';
import { ChatttttComponent } from './chattttt/chattttt.component';
import { CHATBOTCOMPONENTSTAGIAIREComponent } from './chatbotcomponentstagiaire/chatbotcomponentstagiaire.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { AttestationComponent } from './attestation/attestation.component';
import { TuteurAttestationsComponent } from './tuteur-attestations/tuteur-attestations.component';
import { DashboardBystagiaireComponent } from './dashboard-bystagiaire/dashboard-bystagiaire.component';

const routes: Routes = [

 

  { path: '', component: HomeComponentComponent },
  { path: 'offres', component: OffresComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'apropos', component: AProposComponent },
   { path: 'navbar', component: NavbarComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'addOffre', component: AddOffreComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'listStagiaires', component: StagiaireListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'demande', component: DemandeComponentComponent },
  { path: 'Condidats', component: ListCondidatsComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'quiz', component: QuestionComponentComponent, canActivate: [RoleGuard], data: { expectedRoles: ['TESTEUR'] } },
  { path: 'testers', component: TesteurComponentComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'addStagiaire', component: AddStagiaireComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'addTteur', component: AddTuteurComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'modalADDstage', component: AddStagiaireModalComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'CalendarAdmin', component: CalendrierAdminComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'CalendarStagiaire', component: CalendrierStagiaireComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] }},
  { path: 'navbarTuteur', component: NavbarTuteurComponent, canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'addTache', component: AddTacheComponent , canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] }},
  { path: 'TuteurStagiaire', component: StagiairesTuteurComponent, canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'navbarStagiaire', component: NavbarStagiaireComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'tacheStagiaireStats', component: ChartStagiaireTachesComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'EncadrantPage', component: EncadrantPageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'TachesStagiaire', component: TachesStagaireComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'feedBackStagiaire', component: FeedBackStagiaireComponent },
  { path: 'planifierReunion', component: PlanifierReunionComponent, canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'tuteurReunions', component: ReunionsPlanifiesTuteurComponent , canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] }},
  { path: 'uploadFile', component: UploadfileComponent, canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'files', component: FilesComponent },
  { path: 'quizz', component: QuiwComponent },
  { path: 'mesStagiaires', component: StagiairesTuteurComponent },
  { path: 'tuteurAdmin', component: TuteursAdminComponentComponent , canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'addQuestion', component: AddQuestionComponent , canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'tachesTuteur', component: ListTachesTuteurComponent, canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'calendrierTuteur', component: CalendrierTuteurComponent , canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'proposedReunions', component: PropsedReunionComponent , canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'proposedReunionsStagiaire', component: PropsedReunionsStagiairesComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'proposer', component: ProposerReunionComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'addReclamation', component: AddReclamationComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'Myreclamations', component: MyReclamationsComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'Allreclamations', component: AllReclamtionsComponent , canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'AdminDaschboard', component: AdminDaschboardComponent , canActivate: [RoleGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'tuteurReclamation', component: TuteurReclamationsComponent , canActivate: [RoleGuard], data: { expectedRoles: ['TUTEUR'] } },
  { path: 'chatbot', component: ChatttttComponent},
  { path: 'StagiaireChatbot', component: CHATBOTCOMPONENTSTAGIAIREComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'ressources', component: RessourcesComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'attestation', component: AttestationComponent , canActivate: [RoleGuard], data: { expectedRoles: ['STAGIAIRE'] } },
  { path: 'attestationTuteur', component: TuteurAttestationsComponent },
  { path: 'dashboardbystagiaire', component: DashboardBystagiaireComponent },
  { path: '**', component: NotfoundComponent }

 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
