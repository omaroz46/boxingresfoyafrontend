import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FightService } from '../../services/fight.service';
import { Fight } from '../../data/fight';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrl: './fight-list.component.scss'
})
export class FightListComponent implements OnInit {

  public fightDataSource = new MatTableDataSource<Fight>();

  columns = ['date', 'location', 'opponent', 'result', 'event', 'actions']

  constructor (
    private service: FightService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit () {
    this.reloadData()
  }

  reloadData () {
    this.service.getList().subscribe(obj => {
      this.fightDataSource.data = obj
    })
  }

  async edit (obj:Fight) {
    await this.router.navigate(['fight', obj.id])
  }

  async create () {
    await this.router.navigate(['fight'])
  }

  delete (obj:Fight) {
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
            if (response.status === 204) {
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

