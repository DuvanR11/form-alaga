import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen, scan } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar operaciones relacionadas con empresas.
 */
export class EmpresaService {
  private apiUrl = 'https://your-api-endpoint.com/empresas';

  /**
   * Crea una instancia de EmpresaService.
   * @param http - El cliente HTTP para hacer solicitudes.
   * @param errorHandlingService - Servicio para manejar errores.
   */
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {}

  /**
   * Obtiene una empresa por su ID.
   * @param id - El ID de la empresa.
   * @returns Observable<Empresa> - El observable de la empresa.
   */
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`).pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err;
            }
            return retryCount + 1;
          }, 0),
          delayWhen(() => timer(2000)) 
        )
      ),
      catchError(this.errorHandlingService.handleError)
    );
  }

  /**
   * Obtiene todas las empresas.
   * @returns Observable<Empresa[]> - El observable de las empresas.
   */
  getAllEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl).pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err;
            }
            return retryCount + 1;
          }, 0),
          delayWhen(() => timer(2000)) 
        )
      ),
      catchError(this.errorHandlingService.handleError)
    );
  }

  /**
   * Verifica si un NIT existe.
   * @param nit - El NIT a verificar.
   * @returns Observable<boolean> - El observable que indica si el NIT existe.
   */
  checkNitExists(nit: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${nit}`).pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err;
            }
            return retryCount + 1;
          }, 0),
          delayWhen(() => timer(2000)) 
        )
      ),
      catchError(this.errorHandlingService.handleError)
    );
  }

  /**
   * Registra una nueva empresa.
   * @param empresa - La empresa a registrar.
   * @returns Observable<Empresa> - El observable de la empresa registrada.
   */
  registerEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa).pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((retryCount, err) => {
            if (retryCount >= 3) {
              throw err;
            }
            return retryCount + 1;
          }, 0),
          delayWhen(() => timer(2000)) 
        )
      ),
      catchError(this.errorHandlingService.handleError)
    );
  }
}
