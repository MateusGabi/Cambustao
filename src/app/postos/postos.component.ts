import { Mapa } from './../mapa/mapa';
import { googleMapsConfig } from './../../environments/googleMapsConfig';
import { GoogleMapsAPIService } from './../services/google-maps-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

import { Posto } from './posto';

@Component({
    selector: 'app-postos',
    templateUrl: './postos.component.html',
    styleUrls: ['./postos.component.css']
})
export class PostosComponent implements OnInit {

    postos: FirebaseListObservable<Posto[]>;

    novoPosto: Posto;

    constructor(private db: AngularFireDatabase, private googleMaps: GoogleMapsAPIService) {
        this.postos = db.list("/postos");
        this.novoPosto = new Posto();
    }

    getPostos() {
        return this.postos;
    }

    addPosto() {

        this.googleMaps.getLocation(this.novoPosto.endereco).subscribe(location => {

            this.novoPosto.location = location;

            this.postos.push(this.novoPosto);

            this.novoPosto = new Posto();
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

        (this.db.list("/postos", { preserveSnapshot: true })).subscribe(snapshots => {
            snapshots.forEach((posto : any) => {

                posto = <Posto> posto.val();

                var marker = new google.maps.Marker({
                    position: posto.location,
                    map: map,
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
                marker.addListener('mouseover', function() {
                    infowindow.open(this.map, marker);
                    
                });
    
                google.maps.event.addListener(marker, 'mouseout',function() {
                    window.setTimeout(function() {
                        infowindow.close();
                      }, 20000);
                });


            });
        });

    }

    caixaBuscaOnKeyUp(event: KeyboardEvent) {
        var value: string = (<HTMLInputElement>event.target).value;

        console.log(value);
    }

    onclick() {
        console.log("Clicou em editar");
    }

}
