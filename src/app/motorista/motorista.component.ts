import { EditarmotoristaComponent } from './../editarmotorista/editarmotorista.component';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Motorista } from './motorista';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css']
})
export class MotoristaComponent implements OnInit {

  @ViewChild(EditarmotoristaComponent) editMotorista: EditarmotoristaComponent;
  
    motoristas: FirebaseListObservable<Motorista[]>;
  
    novoMotorista : Motorista;
    motoristaParaEditar: Motorista;
  
    constructor(private db: AngularFireDatabase, private router: Router) {
      this.motoristas = db.list("/motoristas");
        this.novoMotorista = new Motorista();
    }
  
  
    ngOnInit() {
      this.motoristaParaEditar = <Motorista> {};
    }
  
    addMotorista() {
      this.motoristas.push(this.novoMotorista);
      this.novoMotorista = new Motorista();
    }
  
    deleteMotorista(key: string) {
      this.motoristas.remove(key);
      this.router.navigate(['/motoristas']);
    }
  
    
  
    editar(key){
      (this.db.list("/motoristas", { preserveSnapshot: true })).subscribe(snapshots => {
        snapshots.forEach((motorista : any) => {
          if(key === motorista.key) {
            this.motoristaParaEditar = <Motorista> motorista.val();
            console.log(motorista);
            this.editMotorista.open(key);
            console.log('entrou');
          }
        })
      });
      // this.editCaminhao.open(key);
    }
    close(){
      this.editMotorista.close();
    }
}
