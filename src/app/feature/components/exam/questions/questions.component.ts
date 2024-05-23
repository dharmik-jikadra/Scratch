import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { questions } from '../../../../shared/constants/questions';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  public questions = questions;
  public selectedIndex = signal<number>(0);
  private fb = inject(FormBuilder);
  public answerForm!: FormGroup;

  private duration = 600; // 10 minutes in seconds
  public remainingTime!: string;

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.startTimer();
  }

  private createForm(): void {
    const array = this.fb.group({
      answer: this.fb.array([]),
    });
    this.questions.forEach(() => {
      (array.get('answer') as FormArray).push(new FormControl(null));
    });
    this.answerForm = array;
  }

  get answerCtrl(): any {
    return this.answerForm.get('answer') as FormArray;
  }

  private startTimer(): void {
    const timer = interval(1000)
      .pipe(
        map((tick) => this.duration - tick - 1) // calculate remaining time
      )
      .subscribe((time) => {
        this.remainingTime = this.formatTime(time);
        if (time === 0) {
          timer.unsubscribe();
          window.alert('Time is up!');
          this.checkAnswer(this.answerForm.value.answer);
        }
      });
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  public prevQuestion(): void {
    if (this.selectedIndex() !== 0)
      this.selectedIndex.update((res) => (res -= 1));
  }

  public nextQuestion(isSubmit: boolean): void {
    if (!isSubmit) {
      this.selectedIndex.update((res) => (res += 1));
    } else {
      const formVal = this.answerForm.value.answer;
      if (formVal.includes(null)) {
        if (window.confirm('Do yo want to Submit')) this.checkAnswer(formVal);
      } else {
        this.checkAnswer(formVal);
      }
    }
  }

  checkAnswer(formVal: string[]): void {
    const length = this.questions.filter(
      (res, i) => res.answer === formVal[i]
    ).length;
    window.alert(
      `${length > 3 ? 'Congrats ' : ''}Your Quiz Score is ${length}`
    );
  }
}
