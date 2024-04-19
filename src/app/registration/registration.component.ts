import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  authService = inject(AuthService)
  router = inject(Router)

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      aadharCardNo: ['', Validators.required],
      mobileNo: ['', Validators.required],
      birthdate: ['', Validators.required],
      profilePic: ['']
    });
  }

errorMessage: string | null = null;

onSubmit(): void {
  const rawForm = this.registrationForm.getRawValue()
  this.authService.register(rawForm.fullName, rawForm.email, rawForm.password,
    rawForm.aadharCardNo, rawForm.mobileNo, rawForm.birthdate, rawForm.profilePic,
  ).subscribe({ next:()=>{
    this.router.navigateByUrl('/login')
  },
error: (err) => {
  this.errorMessage = err.code;
}
})
}

// Function to handle file selection
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.registrationForm.patchValue({
      profilePic: file
    });
  }
}

  // onSubmit(): void {
  //   if (this.registrationForm.valid) {
  //     return;
  //   }
  //   console.log(this.registrationForm.value);
  // }


  toggleLanguage() {
    // Change the language of the whole page to English
    document.documentElement.lang = 'en';
  }
  adjustFontSize(action: string = '') {
    const currentFontSize = parseInt(getComputedStyle(document.body).fontSize);
    let newFontSize: number;

    switch(action) {
      case '-':
        newFontSize = currentFontSize - 2;
        break;
      case '+':
        newFontSize = currentFontSize + 2;
        break;
      default:
        newFontSize = 18; // Default font size
        break;
    }

    document.body.style.fontSize = newFontSize + 'px';
  }
}
