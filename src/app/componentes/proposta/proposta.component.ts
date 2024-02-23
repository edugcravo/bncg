import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';
import { EmitenteService } from 'src/app/services/emitente.service';
import { FavorecidoService } from 'src/app/services/favorecido.service';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cartaService: CartaService, private emitenteService: EmitenteService, private favorecidoService: FavorecidoService) { }

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

    this.recebeEmitente()
    this.recebeFavorecido()
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


  emitente: any;

  recebeEmitente(){
    this.emitenteService.retornaEmitente().subscribe((data: any) => {
      this.emitente = data.result;
    })
  }

  favorecido: any;

  recebeFavorecido(){
    this.favorecidoService.retornaFavorecidos().subscribe((data: any) => {
      console.log(data)
      this.favorecido = data.result;
  })}
}
