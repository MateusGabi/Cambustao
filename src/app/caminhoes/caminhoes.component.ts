import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

import { Caminhao } from './caminhao';

@Component({
  selector: 'app-caminhoes',
  templateUrl: './caminhoes.component.html',
  styleUrls: ['./caminhoes.component.css']
})
export class CaminhoesComponent implements OnInit {

  caminhoes: FirebaseListObservable<Caminhao[]>;

  novoCaminhao : any = {
    modelo: '',
    placa: '',
    tipo: ''
  };

  constructor(db: AngularFireDatabase, private router: Router) {
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
    this.router.navigate(['/caminhoes']);
  }
}
