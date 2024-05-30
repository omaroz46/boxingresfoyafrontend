import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FighterService } from '../../services/fighter.service';
import { Fighter } from '../../data/fighter';

@Component({
  selector: 'app-fighter-list',
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss'
})
export class FighterListComponent implements OnInit {

  public fighterDataSource = new MatTableDataSource<Fighter>();

  columns = ['name', 'weightClass', 'fightRecord', 'boxingClub', 'actions']

  constructor (
    private service: FighterService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit () {
    this.reloadData()
  }

  reloadData () {
    this.service.getList().subscribe(obj => {
      this.fighterDataSource.data = obj
    })
  }

  async edit (obj:Fighter) {
    await this.router.navigate(['fighter', obj.id])
  }

  async create () {
    await this.router.navigate(['fighter'])
  }

  delete (obj:Fighter) {
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
