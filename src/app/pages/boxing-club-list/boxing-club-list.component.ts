import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxingClub } from '../../data/boxing-club';
import { MatTableDataSource } from '@angular/material/table';
import { BoxingClubService } from '../../services/boxing-club.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-boxing-club-list',
  templateUrl: './boxing-club-list.component.html',
  styleUrl: './boxing-club-list.component.scss'
})
export class BoxingClubListComponent implements OnInit {

  boxingClubDataSource: MatTableDataSource<BoxingClub> = new MatTableDataSource<BoxingClub>();


  columns = ['name','location','contact','actions']


  constructor (
    private service: BoxingClubService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit () {
    this.reloadData()
  }

  reloadData () {
    this.service.getList().subscribe(obj => {
      this.boxingClubDataSource.data = obj
    })
  }

  async edit (obj:BoxingClub) {
    await this.router.navigate(['boxingClub', obj.id])
  }

  async create () {
    await this.router.navigate(['boxingClub'])
  }

  delete (obj:BoxingClub) {
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
