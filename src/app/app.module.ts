import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxingClubListComponent } from './pages/boxing-club-list/boxing-club-list.component';
import { BoxingClubDetailComponent } from './pages/boxing-club-detail/boxing-club-detail.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { FighterListComponent } from './pages/fighter-list/fighter-list.component';
import { FighterDetailComponent } from './pages/fighter-detail/fighter-detail.component';
import { FightDetailComponent } from './pages/fight-detail/fight-detail.component';
import { FightListComponent } from './pages/fight-list/fight-list.component';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from './environments/environments';
import { AuthService } from './services/auth.service';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { MatCardModule } from '@angular/material/card';
import { AppLoginComponent } from './pages/app-login/app-login.component';
import { AppAuthGuard } from './guards/app.auth.guard';


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'boxingresfoya',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    BoxingClubListComponent,
    BoxingClubDetailComponent,
    ConfirmDialogComponent,
    EventListComponent,
    EventDetailComponent,
    FighterListComponent,
    FighterDetailComponent,
    FightListComponent,
    FightDetailComponent,
    NoAccessComponent,
    AppLoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: AuthConfig,
      useValue: authConfig
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory
    },
    AppAuthGuard
  ],
  bootstrap: [AppComponent]
})
  export class AppModule { 
    constructor(authService: AuthService) {
      authService.initAuth().finally();
    }
}
