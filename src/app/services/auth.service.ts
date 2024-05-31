import { Injectable } from '@angular/core';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> = this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> = this.useraliasSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> = this.accessTokenSubject.asObservable();

  private _decodedAccessToken: any;
  private _accessToken = '';

  constructor(private oauthService: OAuthService, private authConfig: AuthConfig) {
    this.handleEvents(null);
    this.initAuth();
  }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe(e => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(isLoggedIn => {
        if (isLoggedIn) {
          this._accessToken = this.oauthService.getAccessToken();
          this.accessTokenSubject.next(this._accessToken);
          this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

          if (this._decodedAccessToken?.family_name && this._decodedAccessToken?.given_name) {
            const username = this._decodedAccessToken.given_name + ' ' + this._decodedAccessToken.family_name;
            this.usernameSubject.next(username);
          }

          const claims = this.getIdentityClaims();
          if (claims !== null && claims['preferred_username']) {
            this.useraliasSubject.next(claims['preferred_username']);
          }
        }
        resolve();
      }).catch(reject);
      this.oauthService.setupAutomaticSilentRefresh();
    });
  }

  public getRoles(): Observable<Array<string>> {
    if (this._decodedAccessToken !== null) {
      return new Observable<Array<string>>(observer => {
        if (this._decodedAccessToken.resource_access.demoapp.roles) {
          if (Array.isArray(this._decodedAccessToken.resource_access.demoapp.roles)) {
            const resultArr = this._decodedAccessToken.resource_access.demoapp.roles.map((r: string) => r.replace('ROLE_', ''));
            observer.next(resultArr);
          } else {
            observer.next([this._decodedAccessToken.resource_access.demoapp.roles.replace('ROLE_', '')]);
          }
        }
      });
    }
    return of([]);
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public logout() {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: any) {
    if (event instanceof OAuthErrorEvent) {
      // Fehlerbehandlung
      console.error(event);
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      if (this._decodedAccessToken?.family_name && this._decodedAccessToken?.given_name) {
        const username = this._decodedAccessToken.given_name + ' ' + this._decodedAccessToken.family_name;
        this.usernameSubject.next(username);
      }

      const claims = this.getIdentityClaims();
      if (claims !== null && claims['preferred_username']) {
        this.useraliasSubject.next(claims['preferred_username']);
      }
    }
  }
}
