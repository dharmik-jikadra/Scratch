import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-map-circle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './map-circle.component.html',
  styleUrl: './map-circle.component.scss',
})
export class MapCircleComponent {
  @Output() circleLoc = new EventEmitter();
  private fb = inject(FormBuilder);
  public circleForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.circleForm = this.fb.group({
      mapCircle: this.fb.array([this.circleFormGroup()]),
    });
  }

  private circleFormGroup(): FormGroup {
    return this.fb.group({
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      radious: [null, Validators.required],
    });
  }

  public get getCircleCtrl(): any {
    return this.circleForm.get('mapCircle');
  }

  public addCircle(): void {
    this.getCircleCtrl.push(this.circleFormGroup());
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
    if (this.circleForm.invalid) {
      this.circleForm.markAllAsTouched();
      return;
    }
    this.circleLoc.emit(this.getCircleCtrl.value);
  }

  public cancel(): void {
    // const offcanvasElement = document.getElementById('offcanvasCircle');
    // console.log('offcanvasElement', offcanvasElement)
    // const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    // console.log('offcanvas', offcanvas)

    // offcanvas.hide();
  }
}
