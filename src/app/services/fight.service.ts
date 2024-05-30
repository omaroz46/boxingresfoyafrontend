import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Fight } from "../data/fight";

@Injectable({
    providedIn: 'root'
  })
  export class FightService {
  
    readonly backendUrl = 'fights';
  
    constructor(
      private http: HttpClient
    ) {}
  
    public getList(): Observable<Fight[]> {
      return this.http.get<Fight[]>(environment.backendBaseUrl + this.backendUrl);
    }
  
    public getOne(id: number): Observable<Fight> {
      return this.http.get<Fight>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
    }

    public update(Fight: Fight): Observable<Fight> {
        return this.http.put<Fight>(environment.backendBaseUrl + this.backendUrl + `/${Fight.id}`, Fight);
      }
    
      public save(Fight: Fight): Observable<Fight> {
        return this.http.post<Fight>(environment.backendBaseUrl + this.backendUrl, Fight);
      }
    
      public delete(id: number): Observable<HttpResponse<string>> {
        return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
      }
  
  }