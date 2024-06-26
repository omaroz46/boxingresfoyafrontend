import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxingClubDetailComponent } from './pages/boxing-club-detail/boxing-club-detail.component';
import { BoxingClubListComponent } from './pages/boxing-club-list/boxing-club-list.component';
import { FighterListComponent } from './pages/fighter-list/fighter-list.component';
import { FighterDetailComponent } from './pages/fighter-detail/fighter-detail.component';
import { FightDetailComponent } from './pages/fight-detail/fight-detail.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { FightListComponent } from './pages/fight-list/fight-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AppAuthGuard } from './guards/app.auth.guard';
import { AppRoles } from './app.roles';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'boxingclubs',
    component: BoxingClubListComponent
  },
  {
    path: 'boxingclub',
    pathMatch: 'full',
    component: BoxingClubDetailComponent
  },
  {
    path: 'boxingclub/:id',
    pathMatch: 'full',
    component: BoxingClubDetailComponent
  },

  {
    path: 'fighters',
    component: FighterListComponent
  },
  {
    path: 'fighter',
    pathMatch: 'full',
    component: FighterDetailComponent
  },
  {
    path: 'fighter/:id',
    pathMatch: 'full',
    component: FighterDetailComponent
  },

  {
    path: 'fights',
    component: FightListComponent
  },
  {
    path: 'fight',
    pathMatch: 'full',
    component: FightDetailComponent
  },
  {
    path: 'fight/:id',
    pathMatch: 'full',
    component: FightDetailComponent
  },

  {
    path: 'events',
    component: EventListComponent
  },
  {
    path: 'event',
    pathMatch: 'full',
    component: EventDetailComponent
  },
  {
    path: 'event/:id',
    pathMatch: 'full',
    component: EventDetailComponent,
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: [AppRoles.Admin]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
