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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
// import { FighterListComponent } from './fighter-list/fighter-list.component';
// import { FighterDetailComponent } from './fighter-detail/fighter-detail.component';
// import { FightListComponent } from './fight-list/fight-list.component';
// import { FightDetailComponent } from './fight-detail/fight-detail.component';
// import { EventListComponent } from './event-list/event-list.component';
// import { EventDetailComponent } from './event-detail/event-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    BoxingClubListComponent,
    BoxingClubDetailComponent,
    ConfirmDialogComponent,
    // FighterListComponent,
    // FighterDetailComponent,
    // FightListComponent,
    // FightDetailComponent,
    // EventListComponent,
    // EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
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
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
