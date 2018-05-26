
import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/pages/signup-form/signup-form.component';
import { LoginFormComponent } from './app/pages/login-form/login-form.component';
import { AdminComponent } from './app/pages/admin/admin.component';
import { SurveyComponent } from './app/pages/survey/survey.component';
import { StageComponent } from './app/pages/stage/stage.component';
import { ProgramComponent } from './app/pages/program/program.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', component: SurveyComponent },
    { path: 'stage', component: StageComponent },
    { path: 'stage/:id', component: StageComponent },
    { path: 'program', component: ProgramComponent }
];