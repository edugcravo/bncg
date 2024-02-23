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
    // retirar pontos e traços do cpf ou cnpj
    let cpf_cnpj = this.formulario.value.cpf_cnpj;
    cpf_cnpj = cpf_cnpj.replace(/\./g, '');
    cpf_cnpj = cpf_cnpj.replace(/\-/g, '');
    cpf_cnpj = cpf_cnpj.replace(/\//g, '');
    this.formulario.controls['cpf_cnpj'].setValue(cpf_cnpj)

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

  applyCpfCnpjMask(event: any) {
    let value = event.target.value;
    // aplicar amscara de cpf ou cnpj
    if (value.length <= 14) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    event.target.value = value;

  }
}
