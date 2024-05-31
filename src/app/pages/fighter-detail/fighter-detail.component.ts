import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Fighter } from '../../data/fighter';
import { FighterService } from '../../services/fighter.service';
import { BoxingClub } from '../../data/boxing-club';
import { BoxingClubService } from '../../services/boxing-club.service';



@Component({
  selector: 'app-fighter-detail',
  templateUrl: './fighter-detail.component.html',
  styleUrl: './fighter-detail.component.scss'
})
export class FighterDetailComponent implements OnInit {
  fighter : Fighter = new Fighter()

  public fighterForm = new FormGroup({
    id: new FormControl(0),
    fightRecord: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    weightClass: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    boxingClub: new FormControl()
  })

  boxingClubs: BoxingClub[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private fighterService: FighterService,
    private formBuilder: FormBuilder,
    private boxingClubService: BoxingClubService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.fighterService.getOne(id).subscribe(obj => {
          this.fighter = obj
          this.fighterForm = this.formBuilder.group(this.fighter)
          this.fighterForm.controls.name.setValue(this.fighter.name)
          this.fighterForm.controls.weightClass.setValue(this.fighter.weightClass)
          this.fighterForm.controls.fightRecord.setValue(this.fighter.fightRecord)
          this.fighterForm.controls.boxingClub.setValue(this.fighter.boxingClub)
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
    await this.router.navigate(['fighters'])
  }

  async save (formData: any) {
    this.fighter = Object.assign(formData)

    if (this.fighter.id) {
      this.fighterService.update(this.fighter).subscribe({
        next: () => this.back(),
        //error: () => {}
      })
    } else {
      this.fighterService.save(this.fighter).subscribe({
        next: () => this.back(),
        //error: () => {}
      })
    }
  }
}
