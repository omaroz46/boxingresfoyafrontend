import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxingClubDetailComponent } from './boxing-club-detail.component';

describe('BoxingClubDetailComponent', () => {
  let component: BoxingClubDetailComponent;
  let fixture: ComponentFixture<BoxingClubDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxingClubDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxingClubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
