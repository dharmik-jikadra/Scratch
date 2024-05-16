import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public collapse = signal<boolean>(false);
  constructor() {}

  public collapseSidebar(): void {
    this.collapse.set(this.collapse() ? false : true);
  }
}
