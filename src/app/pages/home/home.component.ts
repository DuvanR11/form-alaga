import { Component } from '@angular/core';
import { formatJson } from '../../core/utilities/formatJson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  jsonData: any

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const jsonDataString = localStorage.getItem('empresa');
      if (jsonDataString) {
        this.jsonData = JSON.parse(jsonDataString);
        this.jsonData = formatJson(this.jsonData)
      } else {
        this.router.navigate(['/register']);
      }
    } else {
      console.error('localStorage no está disponible en este entorno.');
      this.jsonData = {};  
    }
  }

  goBackToRegister(): void {
    localStorage.clear();
    this.router.navigate(['/register']);
  }

}
