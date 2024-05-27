import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boxing-club-detail',
  templateUrl: './boxing-club-detail.component.html',
  styleUrl: './boxing-club-detail.component.scss'
})
export class BoxingClubDetailComponent implements OnInit {

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
    }
  }

  async back () {
    await this.router.navigate(['boxingClubs'])
  }

}
