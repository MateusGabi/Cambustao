import { UserInfo } from 'app/shared/user-info';
import { AuthService } from 'app/shared/auth.service';
import { EditarmotoristaComponent } from './../editarmotorista/editarmotorista.component';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Motorista } from './motorista';

declare var $;

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

    admin : Boolean; 
  
    constructor(private db: AngularFireDatabase, private router: Router, private authService: AuthService) {
      this.motoristas = db.list("/motoristas");
        this.novoMotorista = new Motorista();
    }
    
    isAdmin(){
      let email;
      this.authService.currentUser().subscribe((user: UserInfo) => email = user.email);
      if(email.indexOf("@dev") >= 0){
          this.admin = true;
      }
      else{
        this.admin = false;
      }
      
    }
  
    ngOnInit() {
      this.isAdmin();
      this.motoristaParaEditar = <Motorista> {};
      (<any>$('.cpf')).mask('000.000.000-00', {reverse: true});
      
    }
  
    addMotorista() {
      if(this.admin == true){
        this.motoristas.push(this.novoMotorista);
        this.novoMotorista = new Motorista();
        return true;
      }
      else{
        alert("Você não tem permissão para essa ação");
      }
    }
  
    deleteMotorista(key: string) {
      if(this.admin == true){
        this.motoristas.remove(key);
        this.router.navigate(['/motoristas']);
        return true;
      }
      else{
        alert("Você não tem permissão para essa ação");
      }
    }
  
    
  
    editar(key){
      if(this.admin == true){
        (this.db.list("/motoristas", { preserveSnapshot: true })).subscribe(snapshots => {
          snapshots.forEach((motorista : any) => {
            if(key === motorista.key) {
              this.motoristaParaEditar = <Motorista> motorista.val();
              this.editMotorista.open(key);
            }
          })
        });
      }
      else{
        alert("Você não tem permissão para essa ação");
      }
    }
    close(){
      this.editMotorista.close();
    }
}
