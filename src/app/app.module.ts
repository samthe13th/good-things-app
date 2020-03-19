// Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './pages/admin/admin.component';
import { AllTheThingsComponent } from './pages/allthethings/allthethings.component';
import { AppComponent } from './app.component';
import { AutoTypeComponent } from './shared-components/auto-type/auto-type.component';
import { ChatFeedComponent } from './pages/admin/chat-feed/chat-feed.component';
import { FeedComponent } from './shared-components/feed/feed.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { StoryBlockComponent } from './shared-components/feed/story/story-block/story-block.component';
import { StageComponent } from './pages/stage/stage.component';
import { StoryComponent } from './shared-components/feed/story/story.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { ProgramComponent } from './pages/program/program.component';

// Services
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { StoryService } from './services/story.service';

// Other
import { appRoutes } from '../routes';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    AdminComponent,
    AllTheThingsComponent,
    AppComponent,
    AutoTypeComponent,
    ChatFeedComponent,
    FeedComponent,
    LoginFormComponent,
    ProgramComponent,
    SignupFormComponent,
    StoryBlockComponent,
    StageComponent,
    StoryComponent,
    StoryBlockComponent,
    ProgramComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'good-things'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ChatService,
    AuthService,
    StoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
