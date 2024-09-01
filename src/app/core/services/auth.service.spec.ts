import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/auth`; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return an Observable<any> on success', () => {
      const username = 'testuser';
      const password = 'password123';
      const token = 'fake-jwt-token';

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(token);
        expect(localStorage.getItem('currentUser')).toBe(token);
      });

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });
      req.flush({ token });
    });

    it('should handle error when login fails', () => {
      const username = 'testuser';
      const password = 'password123';

      service.login(username, password).subscribe(
        () => fail('should have failed with 401 error'),
        error => {
          expect(error.status).toBe(401);
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('#logout', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('currentUser', 'fake-jwt-token');
      service.logout();
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });

  describe('#isAuthenticated', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('currentUser', 'fake-jwt-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if token does not exist', () => {
      localStorage.removeItem('currentUser');
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('#getToken', () => {
    it('should return token if it exists', () => {
      localStorage.setItem('currentUser', 'fake-jwt-token');
      expect(service.getToken()).toBe('fake-jwt-token');
    });

    it('should return null if token does not exist', () => {
      localStorage.removeItem('currentUser');
      expect(service.getToken()).toBeNull();
    });
  });
});

