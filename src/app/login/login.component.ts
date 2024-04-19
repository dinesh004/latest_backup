import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginForm2!: FormGroup;
  authService = inject(AuthService)
  router = inject(Router)

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm2 = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    const rawForm = this.loginForm.getRawValue()
    this.authService.login(rawForm.email, rawForm.password
    ).subscribe({ next:()=>{
      this.router.navigateByUrl('/dashboard')
      this.toastr.success('Login Success');
    },
  error: (err) => {
    this.toastr.error('An error occurred!');

  }
  })
  }


  onSubmit2(): void {
    const rawForm = this.loginForm2.getRawValue();
    this.authService.login2(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard2');
        this.toastr.success('Login Success');
      },
      error: (err) => {
        this.toastr.error('Hello world!');
      }
    });
  }


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
