import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, search: string | null, searchField?: string): any {
    if (!search) return value;
    return value.filter((val: any) => {
      if (searchField) {
        const searchValue =
          (searchField && val[searchField]?.toString().toLowerCase()) || '';
        return searchValue.includes(search.toLowerCase());
      } else {
        return Object.values(val).some((find: any) => {
          return find.toString().toLowerCase().includes(search.toLowerCase());
        });
      }
    });
  }
}
