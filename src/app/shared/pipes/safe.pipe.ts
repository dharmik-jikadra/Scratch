import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from './../icons/svg';

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  private icons: { [key: string]: string } = icons;
  private sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.icons[value]);
  }
}
