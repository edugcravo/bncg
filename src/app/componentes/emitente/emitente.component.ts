import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitenteService } from 'src/app/services/emitente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-emitente',
  templateUrl: './emitente.component.html',
  styleUrls: ['./emitente.component.scss']
})
export class EmitenteComponent implements OnInit{

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private emitenteService: EmitenteService){
    this.formulario = this.formBuilder.group({
      id:[0],
      emitente: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
      telefone: ['', Validators.required],
      nome_contato: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  carregando: boolean = false;

  enviaDadosForm(){
    this.carregando = true;
    if (this.formulario.valid) {
      this.emitenteService.cadastrarEmitente(this.formulario.value).subscribe((data: any) => {
        console.log(data);
        if(data.data == 200){
          this.carregando = false;
          Swal.fire({
            title: 'Emitente cadastrado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          //resetar form
          this.formulario.reset();
        }
      });
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }
}
