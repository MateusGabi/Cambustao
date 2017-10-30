import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acoes-rapidas-dashboard',
  templateUrl: './acoes-rapidas-dashboard.component.html',
  styleUrls: ['./acoes-rapidas-dashboard.component.css']
})
export class AcoesRapidasDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(event : EventListener, value : string) {
    console.log(value);

    switch (value) {
      case 'caminhoes':
        this.router.navigate(['/caminhoes']);
        break;
      case 'motoristas':
        this.router.navigate(['/motoristas']);
        break;
      case 'postos':
        this.router.navigate(['/postoManagement']);
        break;
      case 'viagens':
        this.router.navigate(['/viagens']);
        break;
    
      default:
        break;
    }
  }

}
