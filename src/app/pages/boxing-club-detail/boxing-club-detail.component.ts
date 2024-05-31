import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BoxingClubService } from '../../services/boxing-club.service';
import { BoxingClub } from '../../data/boxing-club';

@Component({
  selector: 'app-boxing-club-detail',
  templateUrl: './boxing-club-detail.component.html',
  styleUrl: './boxing-club-detail.component.scss'
})
export class BoxingClubDetailComponent implements OnInit {

  boxingClub : BoxingClub = new BoxingClub()

  public boxingClubForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]), 
    location: new FormControl('', [Validators.required, Validators.maxLength(100)]), 
    contactInfo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

  boxingClubs: BoxingClub[] = []; 

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

  async back(): Promise<void> {
    await this.router.navigate(['boxingclubs']);
  }

  async save(): Promise<void> {
    if (this.boxingClubForm.valid) {
      const formData = this.boxingClubForm.value;
      this.boxingClub = Object.assign({}, this.boxingClub, formData);
      try {
        if (this.boxingClub.id) {
          await this.boxingClubService.update(this.boxingClub).toPromise();
        } else {
          await this.boxingClubService.save(this.boxingClub).toPromise();
        }
        await this.back();
      } catch (error) {
        console.error("Error while saving boxing club:", error);
      }
    }
  }
  
}
