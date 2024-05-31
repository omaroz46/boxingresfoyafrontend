import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessComponent } from './no-access.component';
import { HttpClient } from '@angular/common/http';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/app.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
        MatCardModule,
        MatIconModule
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpy('httpClient')
        },
        {
          provide: AuthConfig,
          useValue: authConfig
        }
      ],
      declarations: [ NoAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
