import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit(){
    const loginRequest: LoginRequest = {
      usuario: this.form.value.email,
      senha: this.form.value.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        alert('Login realizado com sucesso!');
        console.log(response);
        this.router.navigate(['pages', 'home']);
      },
      error: (error) => {
        alert('Erro ao logar!');
        console.log(error);
      }
    });
  }
}
