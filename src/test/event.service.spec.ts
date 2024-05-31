import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../app/environments/environments';
import { EventService } from '../app/services/event.service';
import { Event } from '../app/data/event'; // Import des Event-Typs

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of events', () => {
    const fakeEvents: Event[] = [
      {
          id: 1, venue: 'Venue 1', date: new Date('2024-06-01'),
          description: 'f'
      },
      {
          id: 2, venue: 'Venue 2', date: new Date('2024-06-02'),
          description: 'f'
      },
    ];

    service.getList().subscribe(events => {
      expect(events).toEqual(fakeEvents);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}events`);
    expect(req.request.method).toBe('GET');

    req.flush(fakeEvents);
  });

  it('should get one event by id', () => {
    const fakeEvent: Event = {
        id: 1, venue: 'Venue 1', date: new Date('2024-06-01'),
        description: ''
    };
    const eventId = 1;

    service.getOne(eventId).subscribe(event => {
      expect(event).toEqual(fakeEvent);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}events/${eventId}`);
    expect(req.request.method).toBe('GET');

    req.flush(fakeEvent);
  });

  it('should update an event', () => {
    const updatedEvent: Event = {
        id: 1, venue: 'Updated Venue', date: new Date('2024-06-01'),
        description: ''
    };

    service.update(updatedEvent).subscribe(event => {
      expect(event).toEqual(updatedEvent);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}events/${updatedEvent.id}`);
    expect(req.request.method).toBe('PUT');

    req.flush(updatedEvent);
  });

  it('should save an event', () => {
    const newEvent: Event = {
        id: 2, venue: 'New Venue', date: new Date('2024-06-03'),
        description: ''
    };

    service.save(newEvent).subscribe(event => {
      expect(event).toEqual(newEvent);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}events`);
    expect(req.request.method).toBe('POST');

    req.flush(newEvent);
  });

  it('should delete an event by id', () => {
    const eventId = 1;

    service.delete(eventId).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}events/${eventId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null, { status: 200, statusText: 'OK' });
  });
});
