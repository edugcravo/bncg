import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  enviar() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }

}
