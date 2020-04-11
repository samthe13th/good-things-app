import { Routes } from '@angular/router';
import { AdminComponent } from './app/pages/admin/admin.component';
import { SignupFormComponent } from './app/pages/signup-form/signup-form.component';
import { LoginFormComponent } from './app/pages/login-form/login-form.component';
import { StageComponent } from './app/pages/stage/stage.component';
import { ProgramComponent } from './app/pages/program/program.component';
import { AllTheThingsComponent } from './app/pages/allthethings/allthethings.component';
import { SurveyComponent } from './app/pages/survey/survey.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'allthethings', component: AllTheThingsComponent },
  { path: 'stage/:id', component: StageComponent },
  { path: '', component: SurveyComponent },
  { path: 'stage', component: StageComponent }
];
