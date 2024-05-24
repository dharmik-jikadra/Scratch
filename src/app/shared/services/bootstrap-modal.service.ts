import { Component, Injectable } from '@angular/core';

interface ModalData {
  title: string;
  component: Component;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class BootstrapModalService {
  formModal: any;

  constructor() {}

  openModal(modal: ModalData) {
    this.formModal = new (window as any).bootstrap.Modal(
      document.getElementById('bootstrapModal')
    );
    this.formModal.show();
  }

  closeModel() {
    this.formModal.hide();
  }
}
