import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/services/contato.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatoService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required],
      data: [new Date().toISOString().substring(0, 10), Validators.required] // Obtém a data atual e formata como 'YYYY-MM-DD'
    });
  }

  enviar() {
    if (this.formulario.valid) {
      this.contatoService.enviarContato(this.formulario.value).subscribe((data: any) => {
       if(data.status == 200){
        Swal.fire({
          title: 'Mensagem enviado com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        //resetar form
        this.formulario.reset();
       }
      })
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }

}
