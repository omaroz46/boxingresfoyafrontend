import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { BoxingClub } from "../data/boxing-club";

@Injectable({
    providedIn: 'root'
  })
  export class BoxingClubService {
  
    readonly backendUrl = 'boxingClubs';
  
    constructor(
      private http: HttpClient
    ) {}
  
    public getList(): Observable<BoxingClub[]> {
      return this.http.get<BoxingClub[]>(environment.backendBaseUrl + this.backendUrl);
    }
  
    public getOne(id: number): Observable<BoxingClub> {
      return this.http.get<BoxingClub>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
    }

    public update(BoxingClub: BoxingClub): Observable<BoxingClub> {
        return this.http.put<BoxingClub>(environment.backendBaseUrl + this.backendUrl + `/${BoxingClub.id}`, BoxingClub);
      }
    
      public save(BoxingClub: BoxingClub): Observable<BoxingClub> {
        return this.http.post<BoxingClub>(environment.backendBaseUrl + this.backendUrl, BoxingClub);
      }
    
      public delete(id: number): Observable<HttpResponse<string>> {
        return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
      }
  
  }