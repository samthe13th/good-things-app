import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ChatFeedComponent } from './chat-feed/chat-feed.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { StageComponent } from './stage/stage.component';
import { AutoTypeComponent } from './auto-type/auto-type.component';
import { StoryComponent } from './story/story.component';
import { StoryBlockComponent } from './story-block/story-block.component';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { StoryService } from './services/story.service';
import { appRoutes } from '../routes';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ChatFeedComponent,
    LoginFormComponent,
    SignupFormComponent,
    ControlPanelComponent,
    SurveyComponent,
    StageComponent,
    AutoTypeComponent,
    StoryComponent,
    StoryBlockComponent,
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
