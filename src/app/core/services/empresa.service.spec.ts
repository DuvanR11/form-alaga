import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpresaService } from './empresa.service';
import { Empresa } from '../models/empresa.model';
import { environment } from '../../../environments/environment';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/empresas`; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmpresaService]
    });

    service = TestBed.inject(EmpresaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEmpresaById', () => {
    it('should return an Observable<Empresa> on success', () => {
      const mockEmpresa: Empresa = { id: 1, nit: '123456789', email: 'test@example.com', phone: '1234567890', password: 'password123', confirmPassword: 'password123', terms: true, data: true };

      service.getEmpresaById(1).subscribe(empresa => {
        expect(empresa).toEqual(mockEmpresa);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmpresa);
    });

    it('should handle error when empresa is not found', () => {
      service.getEmpresaById(1).subscribe(
        () => fail('Expected to fail with 404 error, but it succeeded'),
        error => {
          expect(error.status).toBe(404);
          expect(error.error).toBe('Empresa not found');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush('Empresa not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#getAllEmpresas', () => {
    it('should return an Observable<Empresa[]> on success', () => {
      const mockEmpresas: Empresa[] = [
        { id: 1, nit: '123456789', email: 'test1@example.com', phone: '1234567890', password: 'password123', confirmPassword: 'password123', terms: true, data: true },
        { id: 2, nit: '987654321', email: 'test2@example.com', phone: '0987654321', password: 'password456', confirmPassword: 'password456', terms: true, data: true }
      ];

      service.getAllEmpresas().subscribe(empresas => {
        expect(empresas.length).toBe(2);
        expect(empresas).toEqual(mockEmpresas);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmpresas);
    });

    it('should handle error when API fails', () => {
      service.getAllEmpresas().subscribe(
        () => fail('Expected to fail with 500 error, but it succeeded'),
        error => {
          expect(error.status).toBe(500);
          expect(error.error).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#checkNitExists', () => {
    it('should return an Observable<boolean> on success', () => {
      const nit = '123456789';
      const exists = true;

      service.checkNitExists(nit).subscribe(result => {
        expect(result).toBe(exists);
      });

      const req = httpMock.expectOne(`${apiUrl}/exists/${nit}`);
      expect(req.request.method).toBe('GET');
      req.flush(exists);
    });

    it('should handle error when API fails', () => {
      const nit = '123456789';

      service.checkNitExists(nit).subscribe(
        () => fail('Expected to fail with 500 error, but it succeeded'),
        error => {
          expect(error.status).toBe(500);
          expect(error.error).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/exists/${nit}`);
      expect(req.request.method).toBe('GET');
      req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#registerEmpresa', () => {
    it('should return an Observable<Empresa> on success', () => {
      const newEmpresa: Empresa = { id: 0, nit: '123456789', email: 'test@example.com', phone: '1234567890', password: 'password123', confirmPassword: 'password123', terms: true, data: true };
      const createdEmpresa: Empresa = { ...newEmpresa, id: 1 };

      service.registerEmpresa(newEmpresa).subscribe(empresa => {
        expect(empresa).toEqual(createdEmpresa);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEmpresa);
      req.flush(createdEmpresa);
    });

    it('should handle error when registration fails', () => {
      const newEmpresa: Empresa = { id: 0, nit: '123456789', email: 'test@example.com', phone: '1234567890', password: 'password123', confirmPassword: 'password123', terms: true, data: true };

      service.registerEmpresa(newEmpresa).subscribe(
        () => fail('Expected to fail with 500 error, but it succeeded'),
        error => {
          expect(error.status).toBe(500);
          expect(error.error).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEmpresa);
      req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
    });
  });
});
