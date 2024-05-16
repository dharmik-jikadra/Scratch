import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAutheticateSubject = new BehaviorSubject(this.isAutheticateUser());
  public isAutheticate = this.isAutheticateSubject.asObservable();

  constructor() {}

  public isAutheticateUser(): boolean {
    return localStorage.getItem('token') && localStorage.getItem('detail')
      ? true
      : false;
  }

  public setAutheticateUser(detail: any) {
    localStorage.setItem('token', detail.token);
    localStorage.setItem('detail', detail.detail);
    detail.token && detail.detail && this.isAutheticateSubject.next(true);
  }

  public logout(): void {
    localStorage.clear();
    this.isAutheticateSubject.next(false);
  }
}
