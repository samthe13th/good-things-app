
import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatRoomComponent } from './app/chat-room/chat-room.component';
import { ControlPanelComponent } from './app/control-panel/control-panel.component';
import { SurveyComponent } from './app/survey/survey.component';
import { StageComponent } from './app/stage/stage.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatRoomComponent },
    { path: 'admin', component: ControlPanelComponent },
    { path: '', component: SurveyComponent },
    { path: 'stage', component: StageComponent }
];