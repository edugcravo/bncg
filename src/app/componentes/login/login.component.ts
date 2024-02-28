import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.formulario.valid) {
      this.loginService.login(this.formulario.value).then((data: any) => {
        if(data.token){
          this.router.navigate(['/favorecido']);
        }else{
          return
        }

      })
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }
}
