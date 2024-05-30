import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxingClubListComponent } from './boxing-club-list.component';

describe('BoxingClubListComponent', () => {
  let component: BoxingClubListComponent;
  let fixture: ComponentFixture<BoxingClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxingClubListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxingClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
