import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  confirm() {
    this.confirmEvent.emit();
    this.isOpen = false;
  }

  cancel() {
    this.cancelEvent.emit();
    this.isOpen = false;
  }
}
