import { UserInfo } from './../shared/user-info';
import { AuthService } from 'app/shared/auth.service';
import { Observable } from 'rxjs';
import { EditarcaminhaoComponent } from './../editarcaminhao/editarcaminhao.component';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Caminhao } from './caminhao';

declare var $;

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
  admin: Boolean;

  constructor(private db: AngularFireDatabase, private router: Router, private authSerivce: AuthService ) {
	  this.caminhoes = db.list("/caminhoes");
      this.novoCaminhao = new Caminhao();
  }

  isAdmin(){
    let email;
    this.authSerivce.currentUser().subscribe((user: UserInfo) => email = user.email);
    if(email.indexOf("@dev") >= 0){
        this.admin = true;
    }
    else{
      this.admin = false;
    }
  }

  ngOnInit() {
    this.caminhaoParaEditar = <Caminhao> {};
    (<any>$('.placa')).mask('AAA-YYYY', {'translation': {
      A: {pattern: /[A-Z]/},
      Y: {pattern: /[0-9]/}
    }});
    this.isAdmin();
  }

  addCaminhao() {
    if(this.admin){
      this.caminhoes.push(this.novoCaminhao);
      this.novoCaminhao = new Caminhao();
      return true;
    }
    else{
      alert("Você não tem permissão para essa ação");
      return false;
    } 
  }

  deleteCaminhao(key: string) {
    if(this.admin){
      this.caminhoes.remove(key);
      this.router.navigate(['/caminhoes']);
      return true;
    }
    else{
      alert("Você não tem permissão para essa ação");
      return false;
    }
  }

  editar(key){
    if(this.admin){
      (this.db.list("/caminhoes", { preserveSnapshot: true })).subscribe(snapshots => {
        snapshots.forEach((caminhao : any) => {
          if(key === caminhao.key) {
            this.caminhaoParaEditar = <Caminhao> caminhao.val();
            this.editCaminhao.open(key);
          }
        })
      });
      return true;
    }
    else{
      alert("Você não tem permissão para essa ação");
      return false;
    }
  }
  
  close(){
    this.editCaminhao.close();
  }
}
