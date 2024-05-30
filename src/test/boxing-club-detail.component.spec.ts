import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterTestingModule } from "@angular/router/testing";
import { BoxingClubDetailComponent } from "../app/pages/boxing-club-detail/boxing-club-detail.component";

describe('BoxingClubDetailComponent', () => {
    let component: BoxingClubDetailComponent;
    let fixture: ComponentFixture<BoxingClubDetailComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientModule,
          MatFormFieldModule,
          MatRadioModule,
          MatSelectModule,
          MatInputModule,
          ReactiveFormsModule
        ],
        declarations: [ BoxingClubDetailComponent ]
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