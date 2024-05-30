import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoxingClub } from '../../data/boxing-club';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BoxingClubService } from '../../services/boxing-club.service';

@Component({
  selector: 'app-boxing-club-detail',
  templateUrl: './boxing-club-detail.component.html',
  styleUrl: './boxing-club-detail.component.scss'
})
export class BoxingClubDetailComponent implements OnInit {

  boxingClub : BoxingClub = new BoxingClub()

  public boxingClubForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    location: new FormControl(''),
    contactInfo: new FormControl('')
  })

  boxingClubs : Array<BoxingClub> = []

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private boxingClubService: BoxingClubService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.boxingClubService.getOne(id).subscribe(obj => {
          this.boxingClub = obj
          this.boxingClubForm = this.formBuilder.group(this.boxingClub)
          this.boxingClubForm.controls.name.setValue(this.boxingClub.name)
          this.boxingClubForm.controls.location.setValue(this.boxingClub.location)
          this.boxingClubForm.controls.contactInfo.setValue(this.boxingClub.contactInfo)
        })
    }

    this.boxingClubService.getList().subscribe(obj => {
      this.boxingClubs = obj
    })
  }

  public compareOptions(o1 : any, o2 : any): boolean{
    return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
  }

  async back () {
    await this.router.navigate(['boxingClubs'])
  }

  async save (formData: any) {
    this.boxingClub = Object.assign(formData)

    if (this.boxingClub.id) {
      this.boxingClubService.update(this.boxingClub).subscribe({
        next: () => this.back(),
        error: () => {}
      })
    } else {
      this.boxingClubService.save(this.boxingClub).subscribe({
        next: () => this.back(),
        error: () => {}
      })
    }
  }
}
