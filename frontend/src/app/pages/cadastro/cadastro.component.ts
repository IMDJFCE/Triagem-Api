import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent{

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      matricula: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required])
    });
  }

  cadastrar(){
    const formValues = this.form.value;
    const usuarioRequest: UsuarioRequest = {
      nome: formValues.nome,
      email: formValues.email,
      senha: formValues.password,
      dataNascimento: formValues.data,
      matricula: formValues.matricula,
      genero: {},
      raca: {},
      habilidades: [],
      deficiencias: []
    }

    this.authService.signup(usuarioRequest).subscribe({
      next: (response) => {
        alert('Usuário criado com sucesso!');
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Erro ao criar Usuário!');
        console.log(usuarioRequest);
        console.log(error);
      }
    });
  }
};
