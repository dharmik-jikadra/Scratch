import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { interval } from 'rxjs';

const invalidNumbers = ['e', 'E', '+', '-', '.'];
@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
})
export class OtpInputComponent {
  @ViewChildren('digit') digit!: QueryList<ElementRef<HTMLInputElement>>;
  // @Input() public set mobileNumber(value: string) {
  //   this.mobileWithCountry = value;
  //   this.startTimer();
  // };

  // @Output() public resend = new EventEmitter<string>();
  private otp: any;

  public digits: string[] = ['', '', '', '', '', ''];
  // public mobileWithCountry!: string;
  public timer!: number;

  public onInput(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const input = inputElement.value;
    if (input.length === 1) {
      this.digits[index] = input;
    } else {
      inputElement.value = input.substring(0, 1);
    }
    this.focusNextInput(index);
    const otp = this.digits.join('');
    if (otp.length === 6) {
      setTimeout(() => {
        window.alert(`Your OTP is ${otp}`);
      }, 1000);
    }
  }

  public focusNextInput(index: number): void {
    const nextIndex = index + 1;
    if (nextIndex < this.digit.length)
      this.digit.toArray()[nextIndex].nativeElement.focus();
  }

  public focusPreviousInput(index: number): void {
    const previousIndex = index - 1;
    if (previousIndex >= 0)
      this.digit.toArray()[previousIndex].nativeElement.focus();
  }

  public onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText && pastedText.length === 6) {
      this.digits = pastedText.split('');
      this.otp.emit(pastedText);
    }
  }

  public onBackspace(event: KeyboardEvent, index: number): void {
    if (invalidNumbers.includes(event.key)) {
      event.preventDefault();
    } else if (event.key === 'Backspace' && index >= 0) {
      this.digits[!this.digits[index] ? index - 1 : index] = '';
      this.focusPreviousInput(index);
      event.preventDefault();
    }
  }

  public startTimer(): void {
    this.timer = 30;
    const timer = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        timer.unsubscribe();
      }
    });
  }
}
