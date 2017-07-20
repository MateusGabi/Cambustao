import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

	private markers : FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
		this.markers = db.list("/postos");
	}

  ngOnInit() {
	  this.initMap();
  }

	initMap() {
		var uluru = {lat: -20.4288513, lng: -54.6588615};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: uluru
		});

		this.markers.forEach(marker => {
			new google.maps.Marker({
				position: marker.location,
				map: map
			})
		});
		
	}

}
