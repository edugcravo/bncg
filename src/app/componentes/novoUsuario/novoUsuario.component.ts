import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novoUsuario.component.html',
  styleUrls: ['./novoUsuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  usuarioForm: UntypedFormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private dialogRef: DialogRef<NovoUsuarioComponent>, private usuarioService: UsuariosService) {
    
    this.usuarioForm = this.fb.group({
      id: [0, [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      admin: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }


  enviaDadosUsuario(){
    this.usuarioService.criaUsuario(this.usuarioForm.value).subscribe((dados: any) =>{


      if (!dados.data) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao cadastrar usuário',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Usuário cadastrado com sucesso !'
        })
        this.dialogRef.close();
      }
    })
  }

}