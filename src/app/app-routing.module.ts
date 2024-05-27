import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxingClubDetailComponent } from './boxing-club-detail/boxing-club-detail.component';
import { BoxingClubListComponent } from './boxing-club-list/boxing-club-list.component';

const routes: Routes = [
  {
    path: 'boxingClubs',
    component: BoxingClubListComponent
  },
  {
    path: 'boxingClub',
    pathMatch: 'full',
    component: BoxingClubDetailComponent
  },
  {
    path: 'boxingClub/:id',
    pathMatch: 'full',
    component: BoxingClubDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
