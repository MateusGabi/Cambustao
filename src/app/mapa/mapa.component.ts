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
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: {lat: -14.4483014, lng: -68.9872348}
		});

		(this.db.list("/postos", {preserveSnapshot:true})).subscribe(snapshots => {
			snapshots.forEach(posto => {
				new google.maps.Marker({
					position: posto.val().location,
					map: map
				});
			});
		});
		
	}

}
