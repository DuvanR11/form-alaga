import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { MESSAGE_MODAL, MESSAGES_COMPANY } from '../../core/utilities/constant';
import { Empresa } from '../../core/models/empresa.model';
import { EmpresaService } from '../../core/services/empresa.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, CommonModule, AlertComponent, HttpClientModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isTermsChecked = false;
  isDataChecked = false;
  isTermsModalOpen = false;
  isDataModalOpen = false;

  message = MESSAGE_MODAL
  
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' = 'info';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private empresaService: EmpresaService) {
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



  isFormInvalid(): boolean {
    return this.registerForm.invalid || this.registerForm.hasError('mismatch');
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.terms && this.registerForm.value.data) {
        const empresa: Empresa = this.registerForm.value;

        // this.empresaService.registerEmpresa(empresa).subscribe(
        //   response => {
        //     this.alertMessage = MESSAGES_COMPANY.SUCCESS.REGISTERED;
        //     this.alertType = 'success';
        //     console.log('Form Submitted', response);
        //   },
        //   error => {
        //     this.alertMessage = MESSAGES_COMPANY.ERROR.REGISTRATION_FAILED;
        //     this.alertType = 'error';
        //     console.error('Error:', error);
        //   }
        // );
      } else {
        this.alertMessage = MESSAGES_COMPANY.ERROR.TERMS_REQUIRED;
        this.alertType = 'error';
      }
    } else {
      this.alertMessage = MESSAGES_COMPANY.ERROR.FORM_INVALID;
      this.alertType = 'error';
      console.log('Form is not valid');
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
    if (target) {
      const checked = target.checked;
      if (!checked) {
        this.isTermsChecked = true;
      } else {
        this.openTermsModal();
      }
    }
  }

  onDataChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const checked = target.checked;
      if (!checked) {
        this.isDataChecked = true;
      } else {
        this.openDataModal();
      }
    }
  }
  

  acceptTerms() {
    this.isTermsChecked = true;
  }

  acceptData() {
    this.isDataChecked = true;
  }


}
