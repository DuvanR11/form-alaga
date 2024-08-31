import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
