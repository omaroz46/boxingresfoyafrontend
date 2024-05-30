import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Fight } from '../../data/fight';
import { FightService } from '../../services/fight.service';

@Component({
  selector: 'app-fight-detail',
  templateUrl: './fight-detail.component.html',
  styleUrl: './fight-detail.component.scss'
})
export class FightDetailComponent implements OnInit {
  fight : Fight = new Fight()

  public fightForm = new FormGroup({
    id: new FormControl(0),
    date: new FormControl(),
    location: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    opponent: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    result: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    event: new FormControl()
  })

  fights: Fight[] = []; 

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private fightService: FightService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.fightService.getOne(id).subscribe(obj => {
          this.fight = obj
          this.fightForm = this.formBuilder.group(this.fight)
          this.fightForm.controls.date.setValue(this.fight.date)
          this.fightForm.controls.location.setValue(this.fight.location)
          this.fightForm.controls.opponent.setValue(this.fight.opponent)
          this.fightForm.controls.result.setValue(this.fight.result)
          this.fightForm.controls.event.setValue(this.fight.event)
        })
    }

    this.fightService.getList().subscribe(obj => {
      this.fights = obj
    })
  }

  public compareOptions(o1 : any, o2 : any): boolean{
    return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
  }

  async back () {
    await this.router.navigate(['fighters'])
  }

  async save (formData: any) {
    this.fights = Object.assign(formData)

    if (this.fight.id) {
      this.fightService.update(this.fight).subscribe({
        next: () => this.back(),
      })
    } else {
      this.fightService.save(this.fight).subscribe({
        next: () => this.back(),
      })
    }
  }
}
