import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  carregando: boolean = false;

  onSubmit() {
    this.carregando = true;
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.loginService.login(this.formulario.value).then((data: any) => {
        console.log(data);
        if(data.access_token){
          this.message.create('success','login efetuado com sucesso!');
         this.router.navigate(['/proposta']);
        }else{
          if(data.data == 401){
            this.carregando = false;
              this.message.create('error','login ou senha incorretos!');

          }
        }

      })
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
      this.carregando = false;
    }
  }

}
