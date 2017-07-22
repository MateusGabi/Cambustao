import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caminhoes',
  templateUrl: './caminhoes.component.html',
  styleUrls: ['./caminhoes.component.css']
})
export class CaminhoesComponent implements OnInit {

  caminhoes: FirebaseListObservable<any>;

  novoCaminhao : any = {
    modelo: '',
    placa: '',
    tipo: ''
  };

  constructor(db: AngularFireDatabase) {
	  this.caminhoes = db.list("/caminhoes");
  }


  ngOnInit() {
  }

  addCaminhao() {
    this.caminhoes.push(this.novoCaminhao);

    this.novoCaminhao = new Object();
  }

  deleteCaminhao(key: string) {    
    this.caminhoes.remove(key);
  }
}
