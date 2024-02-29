import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/services/shared.service';
import { CartaService } from 'src/app/services/carta.service';
import { AuthService } from '../autentica/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { NovoUsuarioComponent } from '../novoUsuario/novoUsuario.component';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  formulario!: FormGroup;
  admin: any = false;
  logado: any = false;
  username: any;
  carregando: boolean = false;
  pdfUrlCarta!: SafeUrl;
  pdfUrlCertificado!: SafeUrl;
  escolhaTipo: any = 'proposta';

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router,
    private message: NzMessageService,
    private sharedService: SharedService,
    private cartaService: CartaService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.verificaAdmin();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.authService.getLoginStatus().subscribe(logado => {
      this.logado = logado;
      if (logado) {
        this.authService.getUsername().subscribe((data: any) => {
          console.log(data);
          this.logado = true;
          this.username = data.username;
          this.sharedService.setUsername(this.username);
        });
      }
    });
  }

  verificaAdmin() {
    console.log('verificando admin');
    this.sharedService.getAdminStatus().subscribe(admin => {
    });

    this.authService.getAdmin().subscribe((data: any) => {
      console.log(data.admin);
      this.admin = data.admin;
      this.sharedService.setAdminStatus(this.admin);
    });
  }

  onSubmit() {
    this.carregando = true;
    if (this.formulario.valid) {
      this.loginService.login(this.formulario.value).then((data: any) => {
        if (data.access_token) {
          this.authService.notifyLoginStatusChange(true);
          this.message.create('success', 'login efetuado com sucesso!');
          this.carregando = false;
          //resetar form
          this.formulario.reset();
          if (data.admin == true) {
            this.sharedService.setAdminStatus(true);
            this.router.navigate(['/proposta']);
          } else {
            this.username = data.username;
            this.logado = true;
            this.sharedService.setUsername(this.username);
          }
        } else {
          if (data.data == 401) {
            this.carregando = false;
            this.message.create('error', 'login ou senha incorretos!');
          }
        }
      });
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
      this.carregando = false;
    }
  }

  retornarProposta() {
    console.log(this.username);
    this.escolhaTipo = 'proposta';
    this.cartaService.retornaPropostaPorId(this.username).subscribe((data: any) => {
      this.pdfUrlCarta = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    });
  }

  retornaCertificado() {
    this.escolhaTipo = 'certificado';
    this.cartaService.retornaCertificadoPorId(this.username).subscribe((data: any) => {
      this.pdfUrlCertificado = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
    });
  }

  alteraTipo(tipo: any) {
    this.escolhaTipo = tipo;
  }

  openDialogUser() {
    this.dialog.open(UsuariosComponent, {
      width: '600px',
    });
  }

  openDialogNovoUser(): void {
    this.dialog.open(NovoUsuarioComponent, {
      width: '450px',
    });
  }

}
