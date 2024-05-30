import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"; // Importiere HttpClientTestingModule und HttpTestingController
import { TestBed } from "@angular/core/testing";
import { BoxingClubService } from "../app/services/boxing-club.service";
import { BoxingClub } from "../app/data/boxing-club";

describe('BoxingClubService', () => {
    let service: BoxingClubService;
    let httpMock: HttpTestingController; // Verwende HttpTestingController statt HttpClientSpy
  
    const fakeBoxingClub: BoxingClub[] = [
      {
        id: 1,
        name: 'FightClub44',
        location: 'Gundeli',
        contactInfo: '0764140212'
      }
    ];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], // Importiere HttpClientTestingModule
        providers: [
          BoxingClubService,
        ]
      });
      service = TestBed.inject(BoxingClubService);
      httpMock = TestBed.inject(HttpTestingController); // Verwende HttpTestingController statt HttpClient
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should return a list of boxing clubs', () => {
      service.getList().subscribe(clubs => {
        expect(clubs).toEqual(fakeBoxingClub); // Überprüfe, ob die zurückgegebene Liste mit der gefälschten Liste übereinstimmt
      });
  
      const req = httpMock.expectOne('api/boxing-clubs'); // Überprüfe, ob eine Anfrage an die erwartete URL gesendet wird
      expect(req.request.method).toBe('GET'); // Überprüfe, ob die Anfrage eine GET-Anfrage ist
  
      req.flush(fakeBoxingClub); // Simuliere eine Antwort mit der gefälschten Liste von Boxclubs
    });
  
    afterEach(() => {
      httpMock.verify(); // Überprüfe, ob alle erwarteten HTTP-Anfragen abgefangen wurden
    });
});
