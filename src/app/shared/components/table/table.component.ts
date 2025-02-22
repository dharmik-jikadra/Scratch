import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Fields {
  label: string;
  field: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) fields!: Fields[];
  @Input({ required: true }) tblData!: any[];
}
