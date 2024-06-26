import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';
import { EmitenteService } from 'src/app/services/emitente.service';
import { FavorecidoService } from 'src/app/services/favorecido.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cartaService: CartaService, private emitenteService: EmitenteService, private favorecidoService: FavorecidoService, private sharedService: SharedService) { }

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

    setTimeout(() => {
      this.recebeEmitente()
      this.recebeFavorecido()
    }, 1000);

  }

  carregando: boolean = false;

  submitForm() {

    //formatar valor
    //tirar tudo
    let valor = this.formGroup.value.valor;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
    valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
    this.formGroup.controls['valor'].setValue(valor);



    console.log(this.formGroup.value)
    this.carregando = true;
    if (this.formGroup.valid) {

      // Lógica para enviar os dados do formulário
      this.cartaService.enviaCarta(this.formGroup.value).subscribe((data: any) => {
        console.log(data)
        if(data.status == 200){
        Swal.fire({
          title: 'Proposta cadastrada com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.formGroup.reset();
        this.carregando = false;
        }else{
          Swal.fire({
            title: 'Erro ao cadastrar proposta!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }else{
      this.formGroup.markAllAsTouched();
      this.carregando = false;
    }
  }


  emitente: any;

  recebeEmitente(){
    this.emitenteService.retornaEmitente().subscribe((data: any) => {
      this.emitente = data?.result;
    })
  }

  favorecido: any;

  recebeFavorecido(){
    this.favorecidoService.retornaFavorecidos().subscribe((data: any) => {
      this.favorecido = data?.result;
  })}


  formatarValor(event: any){
    let valor = event.target.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
    valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
    event.target.value = valor;
  }
}
