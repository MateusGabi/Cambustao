import { Mapa } from './../mapa/mapa';
import { googleMapsConfig } from './../../environments/googleMapsConfig';
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

    var map = new Mapa();

		(this.db.list("/postos", {preserveSnapshot:true})).subscribe(snapshots => {
			snapshots.forEach(posto => {
				var marker = new google.maps.Marker({
					position: posto.val().location,
          map: map,
          title: posto.val().nome
        });

        // aqui deve começar uma diretiva ou sub-componente de mapa

        var contentString = '<h4>'+ (posto.val().nome || 'Sem nome :/') +'</h4>' + 
                            '<h5><b>Endereço:</b> '+ posto.val().endereco +'</h5>' + 
                            '<h5><b>Preço diesel:</b> R$'+ posto.val().preco_diesel +'</h5>'+
                            "<a class='btn btn-default'>Editar</a> &nbsp;&nbsp;"+
                            "<a class='btn btn-danger'>Excluir</a>";


        // aqui deve finalizar uma diretiva ou sub-componente de mapa

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        
        marker.addListener('click', function() {
					map.setZoom(14);
          map.setCenter(posto.val().location);
          infowindow.open(map, marker);
				});
			});
    });
		
	}

  caixaBuscaOnKeyUp(event: KeyboardEvent) {
    var value : string = (<HTMLInputElement>event.target).value;

    console.log(value);
  }

  onclick() {
    console.log("Clicou em editar");
  }

}
