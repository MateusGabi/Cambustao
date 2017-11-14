import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpostoComponent } from './editarposto.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { firebaseConfig } from 'environments/firebaseConfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { APP_BASE_HREF } from '@angular/common';
import { GoogleMapsAPIService } from 'app/services/google-maps-api.service';
import { Http } from '@angular/http';

const routeStub : Routes = [
  {
    path: '', component : EditarpostoComponent
  }
];
describe('EditarpostoComponent', () => {
  let component: EditarpostoComponent;
  let fixture: ComponentFixture<EditarpostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarpostoComponent ],
      providers: [
        {
          provide : APP_BASE_HREF, 
          useValue : '/'
        },
        AngularFireDatabase,
        AuthService,
        AngularFireAuth,
        GoogleMapsAPIService,
      ],
      imports: [
        RouterModule.forRoot(routeStub),
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        HttpModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpostoComponent);
    component = fixture.componentInstance;
    component.postoChild = {     
          nome: "Posto X",
          endereco: "Rua 1 de Maio",
          preco_diesel: 3.00,
          location : {
              lat : -24.2879992,
              lng : -53.8357284,
          }, 
      };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should be opened', () => {
    expect(component.open("-KxmheD1KuCOoSaLMLP3")).toBeTruthy();
  });
  it('should be finished', () => {
    expect(component.finish()).toBeTruthy();
  });

  it('should be closed', () => {
    expect(component.close()).toBeTruthy();
  });
  it('should be closed with another method', () => {
    expect(component.closeInternal()).toBeTruthy();
  });
});
