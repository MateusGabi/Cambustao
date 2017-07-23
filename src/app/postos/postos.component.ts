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

    // map style
    // mapa noturno e dia
    // mapa durante o dia é entre as 6h e as 18h
    // mapa noturno no outro horário
    var hora = (new Date()).getHours();

    if(hora > 6 && hora < 18)
      var style : any = googleMapsConfig.style_day;
    else
      var style : any = googleMapsConfig.style_night;




    var mapStyle = new google.maps.StyledMapType(<google.maps.MapTypeStyle[]> style);

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: {lat: -16.4483014, lng: -68.9872348}
    });

		(this.db.list("/postos", {preserveSnapshot:true})).subscribe(snapshots => {
			snapshots.forEach(posto => {
				var marker = new google.maps.Marker({
					position: posto.val().location,
          map: map,
          title: posto.val().nome
        });

        console.log(posto.val());

        var contentString = '<h4>'+ (posto.val().nome || 'Sem nome :/') +'</h4>' + 
                            '<h5><b>Endereço:</b> '+ posto.val().endereco +'</h5>' + 
                            '<h5><b>Preço diesel:</b> R$'+ posto.val().preco_diesel +'</h5>';

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
    
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', mapStyle);
    map.setMapTypeId('styled_map');
		
	}

  caixaBuscaOnKeyUp(event: KeyboardEvent) {
    var value : string = (<HTMLInputElement>event.target).value;

    console.log(value);
  }

}
