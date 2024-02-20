import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tipo: any = '';

  fazerDownload() {

    let nomeArquivo: any = {
      pj: 'FICHA-DE-CADASTRO-PESSOA-JURIDICA.xlsx',
      pf: 'FICHA-DE-CADASTRO-PESSOA-FISICA.xlsx',
      obras: 'FICHA-DE-CADASTRO-DE-OBRA.xlsx'
    }
    
    nomeArquivo = nomeArquivo[this.tipo];
    

    const link = document.createElement('a');
    let filePath = '';
  
    switch (this.tipo) {
      case 'pj':
        filePath = 'assets/downloads/FICHA-DE-CADASTRO-PESSOA-JURIDICA.xlsx';
        break;
      case 'pf':
        filePath = 'assets/downloads/FICHA-DE-CADASTRO-PESSOA-FISICA.xlsx';
        break;
      case 'obras':
        filePath = 'assets/downloads/QUADRO-DE-OBRAS-E-SERVICOS-EM-EXECUCAO.xlsx';
        break;
      default:
        console.error('Tipo de download não reconhecido');
        return;
    }
  
    link.setAttribute('href', filePath);
    link.setAttribute('download', nomeArquivo);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
