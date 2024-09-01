import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

/**
 * Interfaz para la respuesta de autenticación.
 */
interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar la autenticación del usuario.
 */
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; 
  private currentUserSubject: BehaviorSubject<any>; 
  public currentUser: Observable<any>; 

  /**
   * Crea una instancia del AuthService.
   * @param http - El cliente HTTP para hacer solicitudes.
   */
  constructor(private http: HttpClient) {
    // Inicializa el Subject con el usuario actual almacenado en localStorage.
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Obtiene el valor actual del usuario.
   * @returns any - El valor actual del usuario.
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param username - El nombre de usuario para la autenticación.
   * @param password - La contraseña para la autenticación.
   * @returns Observable<any> - Un observable que emite la respuesta de autenticación.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Almacena el token en localStorage y actualiza el Subject.
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        this.currentUserSubject.next(response.token);
      })
    );
  }

  /**
   * Cierra sesión del usuario actual.
   */
  logout(): void {
    // Elimina el usuario actual del almacenamiento local y actualiza el Subject.
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns boolean - Verdadero si el usuario está autenticado, falso en caso contrario.
   */
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
  /**
   * Obtiene el token de autenticación almacenado.
   * @returns string | null - El token de autenticación, o null si no está presente.
   */
  getToken(): string | null {
    return localStorage.getItem('currentUser');
  }
}
