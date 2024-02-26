import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  formulario!: FormGroup;
  admin: any = false;
  logado: any = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService, private sharedService: SharedService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.verificaAdmin()
    this.verificaUsuarioLogado()


  
  }

  verificaAdmin(){
    this.sharedService.getAdminStatus().subscribe(admin => {
      this.admin = admin;
    });
  }

  verificaUsuarioLogado(){
    this.sharedService.getUserStatus().subscribe((user: any) => {
      this.logado = user;
    });
  }


  carregando: boolean = false;

  onSubmit() {
    this.carregando = true;
    if (this.formulario.valid) {
      this.loginService.login(this.formulario.value).then((data: any) => {
        if(data.access_token){
          this.message.create('success','login efetuado com sucesso!');
          this.sharedService.setUserStatus(true);
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
