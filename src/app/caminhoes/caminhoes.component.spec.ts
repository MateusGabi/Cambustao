import { Caminhao } from './caminhao';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoesComponent } from './caminhoes.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'environments/firebaseConfig';
import { AngularFireAuth } from 'angularfire2/auth';

const routeStub : Routes = [
  {
    path: '', component : CaminhoesComponent
  }
];
describe('CaminhoesComponent', () => {
  let component: CaminhoesComponent;
  let fixture: ComponentFixture<CaminhoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaminhoesComponent ],
      providers: [
        {
          provide : APP_BASE_HREF, 
          useValue : '/'
        },
        AngularFireDatabase,
        AuthService,
        AngularFireAuth,
      ],
      imports: [
        RouterModule.forRoot(routeStub),
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig, "Cambustao"),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminhoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should add and remove caminhao', () => {
    let caminhao = new Caminhao;
    caminhao.modelo = "FH-16";
    caminhao.placa = "ABC-1234";
    caminhao.tipo = "3 Eixos";
    component.novoCaminhao = caminhao;
    expect(component.addCaminhao()).toBeTruthy();
    expect(component.deleteCaminhao("KximNdb6TC7R4xtVHcP")).toBeTruthy();
  });
  it('should edit caminhao', () => {
    let caminhao = new Caminhao;
    caminhao.modelo = "FH-16";
    caminhao.placa = "ABC-1234";
    caminhao.tipo = "3 Eixos";
    component.novoCaminhao = caminhao;
    expect(component.editar("KximNdb6TC7R4xtVHcP")).toBeTruthy();
  });
  
});
