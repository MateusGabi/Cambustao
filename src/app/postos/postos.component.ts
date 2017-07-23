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

  constructor(private db: AngularFireDatabase, private googleMaps: GoogleMapsAPIService) {
	  this.postos = db.list("/postos");
  }

  getPostos() {
    return this.postos;
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
    this.initMap();
  }

  initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: {lat: -16.4483014, lng: -68.9872348}
		});

		(this.db.list("/postos", {preserveSnapshot:true})).subscribe(snapshots => {
			snapshots.forEach(posto => {
				new google.maps.Marker({
					position: posto.val().location,
					map: map
				}).addListener('click', function() {
					map.setZoom(14);
					map.setCenter(posto.val().location);
				});
			});
		});
		
	}

  caixaBuscaOnKeyUp(event: KeyboardEvent) {
    var value : string = (<HTMLInputElement>event.target).value;

    console.log(value);
  }

}
