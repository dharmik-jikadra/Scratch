import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafePipe } from '../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent {
  @ViewChild('popupImage') popupImage!: ElementRef;
  public imagesList = [
    'https://plus.unsplash.com/premium_photo-1664392248318-4e1d9361726e?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1664391847942-f9c4562ad692?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1550686041-366ad85a1355?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504470695779-75300268aa0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D',
  ];

  public currentIndex!: number;

  public openImage(index: number) {
    console.log('this.popupImage.nativeElement');
    this.popupImage.nativeElement.style.display = 'block';
    this.currentIndex = index;
  }

  public closeImages() {
    this.popupImage.nativeElement.style.display = 'none';
  }

  public previous() {
    this.currentIndex -= 1;
  }
  public next() {
    this.currentIndex += 1;
  }
}
