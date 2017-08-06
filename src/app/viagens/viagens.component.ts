
import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIService } from './../services/google-maps-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Viagem } from './viagem';
import { Mapa } from './../mapa/mapa';
import { Posto } from './../postos/posto';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit {

    novaViagem : Viagem;
    map: Mapa;

  constructor(private db: AngularFireDatabase, private googleMaps: GoogleMapsAPIService) {
      this.novaViagem = new Viagem();
}

  ngOnInit() {

    this.initMap();
    (this.db.list("/postos", { preserveSnapshot: true })).subscribe(snapshots => {
        snapshots.forEach((posto : any) => {

            posto = <Posto> posto.val();

            var marker = new google.maps.Marker({
                position: posto.location,
                map: this.map,
                title: posto.nome
            });

            // aqui deve começar uma diretiva ou sub-componente de mapa

            var contentString = '<h4>' + (posto.nome || 'Sem nome :/') + '</h4>' +
                '<h5><b>Endereço:</b> ' + posto.endereco + '</h5>' +
                '<h5><b>Preço diesel:</b> R$' + posto.preco_diesel + '</h5>' +
                "<a class='btn btn-default'>Editar</a> &nbsp;&nbsp;" +
                "<a class='btn btn-danger'>Excluir</a>";


            // aqui deve finalizar uma diretiva ou sub-componente de mapa

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function() {
                this.map.setZoom(14);
                this.map.setCenter(posto.location);
                infowindow.open(this.map, marker);
            });


        });
    });

  }

  initMap() {
      this.map = new Mapa();
  }

  tracarRota() {

    //   this.googleMaps.getDirection("Aquidauana - MS", "Campo Grande - MS").subscribe(l => {
    //     //   console.log(l);
    //   });

    if(this.novaViagem.origem == null || this.novaViagem.destino == null) {
        alert("Preencha os Campos!");
        return;
    }


    var directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    directionsDisplay.setMap(this.map);

    var request = {
        origin: this.novaViagem.origem,
        destination: this.novaViagem.destino,
        travelMode : google.maps.TravelMode['DRIVING'],
        optimizeWaypoints : true,
        provideRouteAlternatives: true
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {

        if(status == google.maps.DirectionsStatus.ZERO_RESULTS) {
            alert('Não foi encontrado rotas.');
        }
        else if (status == google.maps.DirectionsStatus.OK) {

            console.log("Resposta Directions Service", response);

            directionsDisplay.setDirections(response);
        }

    });

  }


}
