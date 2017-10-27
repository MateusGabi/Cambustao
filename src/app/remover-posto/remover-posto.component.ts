import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-remover-posto',
  templateUrl: './remover-posto.component.html',
  styleUrls: ['./remover-posto.component.css']
})
export class RemoverPostoComponent implements OnInit {

  private sub: any;
  public idPosto;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      
      this.idPosto = params['id'];
      this.deletePosto();
      //this.router.navigate(['/motoristas']);
      
    });
  
  }
  deletePosto() {
    this.db.list("/postos").remove(this.idPosto).then(
      () => window.location.href = '/viagens'
    );
  }

}
