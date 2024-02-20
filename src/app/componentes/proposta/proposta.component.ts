import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cartaService: CartaService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      emitente: ['', Validators.required],
      favorecido: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      valor: ['', Validators.required],
      valorExtenso: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFinalizacao: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      valorCobrado: ['', Validators.required],
      vencimento: ['', Validators.required],
      statusPagamento: ['', Validators.required],
      finalidade: ['', Validators.required],
      finalidadeMeio: ['', Validators.required],
      assinaProposta: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  submitForm() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      // Lógica para enviar os dados do formulário
      this.cartaService.enviaCarta(this.formGroup.value).subscribe((data: any) => {
        console.log(data);
      });
    }
  }
}
