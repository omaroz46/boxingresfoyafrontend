import { Component } from '@angular/core';
import { AppAuthService } from '../../services/app.auth.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent {

  constructor (
    public authService : AppAuthService
  ) {}

}
