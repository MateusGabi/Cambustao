import { UserInfo } from './../shared/user-info';
import { AuthService } from 'app/shared/auth.service';
import { Observable } from 'rxjs';
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
  usuarios: FirebaseListObservable<UserInfo[]>;
  novoCaminhao : Caminhao;
  caminhaoParaEditar: Caminhao;

  constructor(private db: AngularFireDatabase, private router: Router, private authSerivce: AuthService ) {
	  this.caminhoes = db.list("/caminhoes");
      this.novoCaminhao = new Caminhao();
  }

  isAdmin(){
    let email;
    this.authSerivce.currentUser().subscribe((user: UserInfo) => email = user.email);
    if(email.indexOf("@dev") >= 0){
        return true;
    }
    return false;
  }

  ngOnInit() {
    this.caminhaoParaEditar = <Caminhao> {};
  }

  addCaminhao() {
    if(this.isAdmin()){
      this.caminhoes.push(this.novoCaminhao);
      this.novoCaminhao = new Caminhao();
    }
    else{
      alert("Você não tem permissão para essa ação");
    } 
  }

  deleteCaminhao(key: string) {
    if(this.isAdmin()){
      this.caminhoes.remove(key);
      this.router.navigate(['/caminhoes']);
    }
    else{
      alert("Você não tem permissão para essa ação");
    }
  }

  

  editar(key){
    if(this.isAdmin()){
      (this.db.list("/caminhoes", { preserveSnapshot: true })).subscribe(snapshots => {
        snapshots.forEach((caminhao : any) => {
          if(key === caminhao.key) {
            this.caminhaoParaEditar = <Caminhao> caminhao.val();
            this.editCaminhao.open(key);
          }
        })
      });
    }
    else{
      alert("Você não tem permissão para essa ação");
    }
  }
  close(){
    this.editCaminhao.close();
  }
}
