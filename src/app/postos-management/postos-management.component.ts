import { Posto } from './../postos/posto';
import { EditarpostoComponent } from './../editarposto/editarposto.component';
import { UserInfo } from 'app/shared/user-info';
import { AuthService } from 'app/shared/auth.service';
import { Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

declare var $;

@Component({
  selector: 'app-postos-management',
  templateUrl: './postos-management.component.html',
  styleUrls: ['./postos-management.component.css']
})

export class PostosManagementComponent implements OnInit {

  @ViewChild(EditarpostoComponent) editPosto: EditarpostoComponent;
  
    postos: FirebaseListObservable<Posto[]>;
  
    novoPosto : Posto;
    postoParaEditar: Posto;
  
    constructor(private db: AngularFireDatabase, private router: Router, private authService: AuthService) {
      this.postos = db.list("/postos");
        this.novoPosto = new Posto();
    }
    
    isAdmin(){
      let email;
      this.authService.currentUser().subscribe((user: UserInfo) => email = user.email);
      if(email.indexOf("@dev") >= 0){
          return true;
      }
      return false;
    }
  
    ngOnInit() {
      this.postoParaEditar = <Posto> {};
    }
  
    deletePosto(key: string) {
      if(this.isAdmin()){
        this.postos.remove(key);
        this.router.navigate(['/postos']);
      }
      else{
        alert("Você não tem permissão para essa ação");
      }
    }
   
    editar(key){
      if(this.isAdmin()){
        (this.db.list("/postos", { preserveSnapshot: true })).subscribe(snapshots => {
          snapshots.forEach((posto : any) => {
            if(key === posto.key) {
              this.postoParaEditar = <Posto> posto.val();
              this.editPosto.open(key);
            }
          })
        });
      }
      else{
        alert("Você não tem permissão para essa ação");
      }
    }
    close(){
      this.editPosto.close();
    }

}
