import { Component, OnInit } from '@angular/core';

import { Mapa } from './../mapa/mapa';

import {Viagem} from './viagem';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit {

    novaViagem : Viagem;

  constructor() {
      this.novaViagem = new Viagem();
  }

  ngOnInit() {

    // sobre exibição de rotas em mapa:
    // https://developers.google.com/maps/documentation/javascript/directions?hl=pt-br#DisplayingResults

    this.initMap();

  }

  initMap() {
      var map = new Mapa();
  }

}
