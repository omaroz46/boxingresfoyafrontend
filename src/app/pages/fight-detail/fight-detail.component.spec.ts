import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightDetailComponent } from './fight-detail.component';

describe('FightDetailComponent', () => {
  let component: FightDetailComponent;
  let fixture: ComponentFixture<FightDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FightDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
