import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

	private markers : FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
	  this.initMap();
  }

	initMap() {
		var uluru = {lat: -20.4288513, lng: -54.6588615};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: uluru
		});

		(this.db.list("/postos", {preserveSnapshot:true})).subscribe(snapshots => {
			snapshots.forEach(posto => {
				console.log(posto.val());
				new google.maps.Marker({
					position: posto.val().location,
					map: map
				});
			});
		});

		this.markers.forEach(marker => {
			
		});
		
	}

}
