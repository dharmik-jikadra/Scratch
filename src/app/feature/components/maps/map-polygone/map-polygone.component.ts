import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-map-polygone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './map-polygone.component.html',
  styleUrl: './map-polygone.component.scss',
})
export class MapPolygoneComponent {
  @Output() polygoneLoc = new EventEmitter();
  private fb = inject(FormBuilder);
  public polygoneForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.polygoneForm = this.fb.group({
      mapPolygone: this.fb.array([this.innerArray()]),
    });
  }

  private innerArray(): FormArray {
    return this.fb.array([
      this.circleFormGroup(),
      this.circleFormGroup(),
      this.circleFormGroup(),
    ]);
  }

  private circleFormGroup(): FormGroup {
    return this.fb.group({
      lat: [null, Validators.required],
      lng: [null, Validators.required],
    });
  }

  public get getCircleCtrl(): any {
    return this.polygoneForm.get('mapPolygone');
  }

  public addCircle(): void {
    this.getCircleCtrl.push(this.innerArray());
    console.log('this.polygoneForm.controls', this.polygoneForm.controls);
  }

  public removeCircle(index: number): void {
    this.getCircleCtrl.removeAt(index);
  }

  public preventSymbol(event: any): void {
    const code: number[] = [187, 189, 69];
    if (code.includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  public submitForm(): void {
    if (this.polygoneForm.invalid) {
      this.polygoneForm.markAllAsTouched();
      return;
    }
    this.polygoneLoc.emit(this.getCircleCtrl.value);
  }

  public cancel(): void {}
}
