import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { MESSAGE_MODAL, MESSAGES_COMPANY } from '../../core/utilities/constant';
import { Empresa } from '../../core/models/empresa.model';
import { EmpresaService } from '../../core/services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, CommonModule, AlertComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isTermsChecked: boolean = false;
  isDataChecked: boolean = false;
  isTermsModalOpen: boolean = false;
  isDataModalOpen: boolean = false;

  message: string = MESSAGE_MODAL
  
  alertMessage: string | null = null;
  isAlertVisible: boolean = true;

  alertType: 'success' | 'error' | 'info' = 'info';
  registerForm: FormGroup;

  passwordFieldType: string = 'password'
  confirmPasswordFieldType: string = 'password';

  constructor(
      private fb: FormBuilder, 
      private empresaService: EmpresaService,
      private router: Router
    ) {
    this.registerForm = this.fb.group({
      nit: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, []],
      data: [false, []],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Método para alternar la visibilidad de la contraseña de confirmación
  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  isFormInvalid(): boolean {
    return this.registerForm.invalid || this.registerForm.hasError('mismatch');
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {

      if (this.registerForm.value.terms && this.registerForm.value.data) {

        const empresa: Empresa = this.registerForm.value;
        // TODO: CON FINES DE PRUEBA SE ALMACENA LA DATA PARA SEGUIR CON EL FLUJO
        // AL MONTAR UN BACKEND ESTE PROCESO DEBE OMITIRSE PARA CUMPLIR EL OBJETIVO DEL MODULO
        localStorage.setItem('empresa', JSON.stringify(empresa));

        this.empresaService.registerEmpresa(empresa).subscribe(
          response => {
            this.alertMessage = MESSAGES_COMPANY.SUCCESS.REGISTERED;
            this.alertType = 'success';
            this.router.navigate(['/home']);
            console.log('Data generada: ', response);
          },
          error => {
            this.alertMessage = MESSAGES_COMPANY.ERROR.REGISTRATION_FAILED;
            // TODO: POR FINES DE PRUEBA YA QUE AL NO TENER UN BACK GENERA ERROR
            // LO REDIRECCIONARE AL HOME CON LA DATA ALMACENADA
            this.router.navigate(['/home']); 
            this.alertType = 'error';
          }
        );
      } else {
        this.alertMessage = MESSAGES_COMPANY.ERROR.TERMS_REQUIRED;
        this.alertType = 'error';
      }
    } else {
      this.alertMessage = MESSAGES_COMPANY.ERROR.FORM_INVALID;
      this.alertType = 'error';
    }
  }

  openTermsModal() {
    this.isTermsModalOpen = true;
  }

  openDataModal() {
    this.isDataModalOpen = true;
  }

  onTermsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.openTermsModal();
    } else {
      this.registerForm.patchValue({ terms: false });
    }
  }

  onDataChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.openDataModal();
    } else {
      this.registerForm.patchValue({ data: false });
    }
  }

  acceptTerms() {
    this.registerForm.patchValue({ terms: true });
    this.isTermsModalOpen = false;
  }

  acceptData() {
    this.registerForm.patchValue({ data: true });
    this.isDataModalOpen = false;
  }

  handleCloseAlert() {
    this.alertMessage = '';
    this.isAlertVisible = false;
  }
}
