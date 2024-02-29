import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NovoUsuarioComponent } from '../novoUsuario/novoUsuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  todosUsuarios: any;
  usuarioForm: UntypedFormGroup;
  

  constructor(private usuarioService: UsuariosService, private fb: FormBuilder, public dialog: MatDialog) { 

    this.usuarioForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],

    });


  }

  ngOnInit() {
    this.obterTodosUsuarios()
  }


  obterTodosUsuarios(){
    this.usuarioService.retornaUsuarios().subscribe((data: any) => {
      this.todosUsuarios = data.result;
      this.nomeAtual = this.todosUsuarios[0].username
      console.log(this.todosUsuarios[0].username)
      this.usuarioForm = this.fb.group({
        username: [this.todosUsuarios[0].username],
        email: [this.todosUsuarios[0].email],
      })
    });
  }

  nomeAtual: any;

  novoForm(data: any){
    console.log(data)
    this.nomeAtual = data.username
    this.usuarioForm = this.fb.group({
      username: [data.username],
      email: [data.email],
    });

    console.log(this.nomeAtual)
  }



  openDialogNovoUser(): void {
    const dialogUser = this.dialog.open(NovoUsuarioComponent, {
      width: '450px',
      data: this.todosUsuarios
    });

    dialogUser.afterClosed().subscribe(result => {
      this.obterTodosUsuarios();
    });


  }
}
