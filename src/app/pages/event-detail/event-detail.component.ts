import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Event } from '../../data/event';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event : Event = new Event()

  public eventForm = new FormGroup({
    id: new FormControl(0),
    date: new FormControl(),
    venue: new FormControl(''),
    description: new FormControl('')
  })

  events: Event[] = []; 

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.eventService.getOne(id).subscribe(obj => {
          this.event = obj
          this.eventForm = this.formBuilder.group(this.event)
          this.eventForm.controls.date.setValue(this.event.date)
          this.eventForm.controls.venue.setValue(this.event.venue)
          this.eventForm.controls.description.setValue(this.event.description)
        })
    }

    this.eventService.getList().subscribe(obj => {
      this.events = obj
    })
  }

  public compareOptions(o1 : any, o2 : any): boolean{
    return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
  }

  async back () {
    await this.router.navigate(['events'])
  }

  async save (formData: any) {
    this.event = Object.assign(formData)

    if (this.event.id) {
      this.eventService.update(this.event).subscribe({
        next: () => this.back(),
        error: () => {}
      })
    } else {
      this.eventService.save(this.event).subscribe({
        next: () => this.back(),
        error: () => {}
      })
    }
  }
}
