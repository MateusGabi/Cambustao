import { GoogleMapsAPIService } from './../services/google-maps-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css']
})
export class PostosComponent implements OnInit {

  postos: FirebaseListObservable<any>;

  novoPosto : any = {
    nome: '',
    endereco: '',
    preco_diesel: 0.0
  };

  constructor(db: AngularFireDatabase, private googleMaps: GoogleMapsAPIService) {
	this.postos = db.list("/postos");
  }

  addPosto() {

	this.googleMaps.getLocation(this.novoPosto.endereco).subscribe(location => {

		this.novoPosto.location = location;

		this.postos.push(this.novoPosto);

    	this.novoPosto = new Object();
	});

  }

  updateItem(key: string, newText: string) {
    this.postos.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.postos.remove(key); 
  }
  deleteEverything() {
    this.postos.remove();
  }


  ngOnInit() {
  }

}
