import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-polyline',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './map-polyline.component.html',
  styleUrl: './map-polyline.component.scss',
})
export class MapPolylineComponent {
  @Output() polylineLoc = new EventEmitter();
  private fb = inject(FormBuilder);
  public polyLineForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.polyLineForm = this.fb.group({
      mapCircle: this.fb.array([this.innerArray()]),
    });
  }

  private innerArray(): FormArray {
    return this.fb.array([this.circleFormGroup(), this.circleFormGroup()]);
  }

  private circleFormGroup(): FormGroup {
    return this.fb.group({
      lat: [null, Validators.required],
      lng: [null, Validators.required],
    });
  }

  public get getCircleCtrl(): any {
    return this.polyLineForm.get('mapCircle');
  }

  public addPolyLine(): void {
    this.getCircleCtrl.push(this.innerArray());
  }

  public removePolyLine(index: number): void {
    this.getCircleCtrl.removeAt(index);
  }

  public preventSymbol(event: any): void {
    const code: number[] = [187, 189, 69];
    if (code.includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  public submitForm(): void {
    if (this.polyLineForm.invalid) {
      this.polyLineForm.markAllAsTouched();
      return;
    }
    this.polylineLoc.emit(this.getCircleCtrl.value);
  }

  public cancel(): void {}
}
