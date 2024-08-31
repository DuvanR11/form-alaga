// src/app/services/error-handling.service.ts

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Opcionalmente, puede registrar el error en un servidor externo.
    console.error(errorMessage);

    // Devolver un mensaje de error al usuario
    return throwError(errorMessage);
  }
}
