import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/services/shared.service';
import { CartaService } from 'src/app/services/carta.service';
import { AuthService } from '../autentica/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  formulario!: FormGroup;
  admin: any = false;
  logado: any = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService, private sharedService: SharedService, private cartaService: CartaService, private authService: AuthService, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.verificaAdmin()

    
    this.authService.getLoginStatus().subscribe(logado => {
      this.logado = logado;
      if(logado == false){
          if(localStorage.getItem('token'))
          this.authService.notifyLoginStatusChange(true);
          {
        }

      }

      this.authService.getUsername().subscribe((data: any) => {
        this.username = data.username;
        this.sharedService.setUsername(this.username);
      });
    });
  
  }

  verificaAdmin(){
    this.sharedService.getAdminStatus().subscribe(admin => {
      if(admin == true){
        this.admin = true;
      }else{
        this.admin = false;
      }


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
          
          this.message.create('success','login efetuado com sucesso!');
          this.carregando = false;
          //resetar form
          this.formulario.reset();
          if(data.admin == true){
            this.sharedService.setAdminStatus(true);
            this.router.navigate(['/proposta']);
          } else {
            this.authService.getUsername().subscribe((data: any) => {
              this.username = data.username;
              this.logado = true;
              this.sharedService.setUsername(this.username);
            });


          }
        } else {
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

  
  pdfUrlCarta!: SafeUrl;
  pdfUrlCertificado!: SafeUrl;

  escolhaTipo: any = 'proposta';

  retornarProposta(){
    this.sharedService.getUsername().subscribe((data: any) => {
      this.username = data;
    })
    this.escolhaTipo = 'proposta';
    this.cartaService.retornaPropostaPorId(this.username).subscribe((data: any) => {

      this.pdfUrlCarta = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    });
  }

  retornaCertificado(){
    this.sharedService.getUsername().subscribe((data: any) => {
      this.username = data;
    })
    this.escolhaTipo = 'certificado';
    this.cartaService.retornaCertificadoPorId(this.username).subscribe((data: any) => {
      this.pdfUrlCertificado = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    });
  }

  alteraTipo(tipo: any){
    this.escolhaTipo = tipo;
  }


}
