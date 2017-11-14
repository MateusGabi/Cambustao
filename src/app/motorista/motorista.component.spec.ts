import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaComponent } from './motorista.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { APP_BASE_HREF } from '@angular/common';
import { firebaseConfig } from 'environments/firebaseConfig';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Motorista } from 'app/motorista/motorista';

const routeStub : Routes = [
  {
    path: '', component : MotoristaComponent
  }
];
describe('MotoristaComponent', () => {
  let component: MotoristaComponent;
  let fixture: ComponentFixture<MotoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoristaComponent ],
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
    fixture = TestBed.createComponent(MotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should add and remove motorista', () => {
    let motorista = new Motorista;
    motorista.cpf = "008709839-65";
    motorista.idade = "20 anos";
    motorista.nome = "Pedro";
    component.novoMotorista = motorista;
    expect(component.addMotorista()).toBeTruthy();
    expect(component.deleteMotorista("-KxmpHMGegl-dDrjrMQA")).toBeTruthy();
  });
  it('should edit motorista', () => {
    let motorista = new Motorista;
    motorista.cpf = "008709839-65";
    motorista.idade = "20 anos";
    motorista.nome = "Pedro";
    component.motoristaParaEditar = motorista;
    expect(component.editar("-KxmpJLg10K4gHOwbgpf")).toBeTruthy();
  });
  it('should close', () => {
    
    expect(component.close()).toBeTruthy();
  });
  
});
