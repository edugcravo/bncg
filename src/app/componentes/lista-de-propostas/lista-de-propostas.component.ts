import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-lista-de-propostas',
  templateUrl: './lista-de-propostas.component.html',
  styleUrls: ['./lista-de-propostas.component.scss']
})
export class ListaDePropostasComponent implements OnInit{

    constructor(private cartaService: CartaService) { 

    }

    ngOnInit() {
      this.listarPropostas();


    }

    proposta: any;
    propostaPaginada: any = [];

    listarPropostas(){
      this.cartaService.retornaCartas().subscribe((data: any) => {
        console.log(data);
        this.proposta = data?.result;

        this.propostaPaginada = this.paginarDados(this.proposta, 1, this.pageSize)
      console.log(data);
      });
    }

    currentPage = 1;
    pageSize = 5;


  paginarDados(data: any[], page: number, pageSize: number): any[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number) {
    console.log('proxima')
    this.currentPage = pageIndex;
    this.propostaPaginada = this.paginarDados(this.proposta, pageIndex, this.pageSize);
  }
}
