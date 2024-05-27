import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boxing-club-list',
  templateUrl: './boxing-club-list.component.html',
  styleUrl: './boxing-club-list.component.scss'
})
export class BoxingClubListComponent {

  columns = ['name','location','contact']


  constructor (
    private router: Router
  ) {}

  async edit (id : number) {
    await this.router.navigate(['boxingClub', id])
  }

  async create () {
    await this.router.navigate(['boxingClub'])
  }

}
