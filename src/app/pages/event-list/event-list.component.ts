import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../data/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  public eventDataSource = new MatTableDataSource<Event>();

  columns = ['date', 'venue', 'description', 'actions']


  constructor (
    private service: EventService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit () {
    this.reloadData()
  }

  reloadData () {
    this.service.getList().subscribe(obj => {
      this.eventDataSource.data = obj
    })
  }

  async edit (obj:Event) {
    await this.router.navigate(['event', obj.id])
  }

  async create () {
    await this.router.navigate(['event'])
  }

  delete (obj:Event) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Delete',
        message: 'Should this entry be deleted?'
      }
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.service.delete(obj.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('The entry has been deleted.', '', {duration: 4000});
              this.reloadData()
            } else {
              this.snackBar.open('An error has occurred.', '', {duration: 4000});
            }
          },
          error: () => this.snackBar.open('An error has occurred.', '', {duration: 4000})
        })
      }
    })
  }

}
