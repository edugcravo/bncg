import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/services/shared.service';
import { CartaService } from 'src/app/services/carta.service';
import { AuthService } from '../autentica/auth.service';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  formulario!: FormGroup;
  admin: any = false;
  logado: any = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService, private sharedService: SharedService, private cartaService: CartaService, private authService: AuthService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.verificaAdmin()

    
    this.authService.getLoginStatus().subscribe(logado => {
      console.log(logado)
      this.logado = logado;
    });
  
  }

  verificaAdmin(){
    this.sharedService.getAdminStatus().subscribe(admin => {
      console.log(admin)

    });
  }



  carregando: boolean = false;
  username: any;


  onSubmit() {
    this.carregando = true;
    if (this.formulario.valid) {
      this.loginService.login(this.formulario.value).then((data: any) => {
        if(data.access_token){
          this.authService.notifyLoginStatusChange(true);
          this.username = data.username;
          this.message.create('success','login efetuado com sucesso!');
          this.carregando = false;
          //resetar form
          this.formulario.reset();
          if(data.admin == true){
            this.sharedService.setAdminStatus(true);
            this.router.navigate(['/proposta']);
          }else{
            this.logado = true;
          }
          
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

  
  // retornarProposta(){
  //   this.cartaService.retornaPropostaPorId(this.username).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

}
