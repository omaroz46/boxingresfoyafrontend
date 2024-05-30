import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Event } from "../data/event";

@Injectable({
    providedIn: 'root'
  })
  export class EventService {
  
    readonly backendUrl = 'events';
  
    constructor(
      private http: HttpClient
    ) {}
  
    public getList(): Observable<Event[]> {
      return this.http.get<Event[]>(environment.backendBaseUrl + this.backendUrl);
    }
  
    public getOne(id: number): Observable<Event> {
      return this.http.get<Event>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
    }

    public update(Event: Event): Observable<Event> {
        return this.http.put<Event>(environment.backendBaseUrl + this.backendUrl + `/${Event.id}`, Event);
      }
    
      public save(Event: Event): Observable<Event> {
        return this.http.post<Event>(environment.backendBaseUrl + this.backendUrl, Event);
      }
    
      public delete(id: number): Observable<HttpResponse<string>> {
        return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
      }
  
  }