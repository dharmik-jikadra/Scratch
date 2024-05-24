import { Injectable, signal } from '@angular/core';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public breadcrumb = signal<Breadcrumb[]>([]);
  constructor() {}

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumb.set(breadcrumbs);
  }
}
