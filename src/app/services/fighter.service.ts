import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Fighter } from "../data/fighter";

@Injectable({
    providedIn: 'root'
  })
  export class FighterService {
  
    readonly backendUrl = 'fighters';
  
    constructor(
      private http: HttpClient
    ) {}
  
    public getList(): Observable<Fighter[]> {
      return this.http.get<Fighter[]>(environment.backendBaseUrl + this.backendUrl);
    }
  
    public getOne(id: number): Observable<Fighter> {
      return this.http.get<Fighter>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
    }

    public update(Fighter: Fighter): Observable<Fighter> {
        return this.http.put<Fighter>(environment.backendBaseUrl + this.backendUrl + `/${Fighter.id}`, Fighter);
      }
    
    public save(Fighter: Fighter): Observable<Fighter> {
      return this.http.post<Fighter>(environment.backendBaseUrl + this.backendUrl, Fighter);
    }
    
    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
    }
  
  }