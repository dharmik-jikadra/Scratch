import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
// import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public encryptData(data: any): string {
    return Crypto.AES.encrypt(
      JSON.stringify(data),
      environment.cryptoSecret
    ).toString();
  }

  public decryptData(key: any): null | Object {
    try {
      const bytes = Crypto.AES.decrypt(key, environment.cryptoSecret);
      return JSON.parse(bytes.toString(Crypto.enc.Utf8));
    } catch (error) {
      return null;
    }
  }

  public setItem(key: string, data: any): void {
    localStorage.setItem(key, this.encryptData(data));
  }

  public getItem(key: string): null | Object {
    return this.decryptData(localStorage.getItem(key));
  }
}
