import { EditarcaminhaoComponent } from './../editarcaminhao/editarcaminhao.component';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Caminhao } from './caminhao';

@Component({
  selector: 'app-caminhoes',
  templateUrl: './caminhoes.component.html',
  styleUrls: ['./caminhoes.component.css']
})
export class CaminhoesComponent implements OnInit {

  @ViewChild(EditarcaminhaoComponent) editCaminhao: EditarcaminhaoComponent;

  caminhoes: FirebaseListObservable<Caminhao[]>;

  novoCaminhao : Caminhao;
  caminhaoParaEditar: Caminhao;

  constructor(private db: AngularFireDatabase, private router: Router) {
	  this.caminhoes = db.list("/caminhoes");
      this.novoCaminhao = new Caminhao();
  }


  ngOnInit() {
    this.caminhaoParaEditar = <Caminhao> {};
  }

  addCaminhao() {
    this.caminhoes.push(this.novoCaminhao);
    this.novoCaminhao = new Caminhao();
  }

  deleteCaminhao(key: string) {
    this.caminhoes.remove(key);
    this.router.navigate(['/caminhoes']);
  }

  

  editar(key){
    (this.db.list("/caminhoes", { preserveSnapshot: true })).subscribe(snapshots => {
      snapshots.forEach((caminhao : any) => {
        if(key === caminhao.key) {
          this.caminhaoParaEditar = <Caminhao> caminhao.val();
          console.log(caminhao);
          this.editCaminhao.open(key);
          console.log('entrou');
        }
      })
    });
    // this.editCaminhao.open(key);
  }
  close(){
    this.editCaminhao.close();
  }
}
