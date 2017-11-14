import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcaminhaoComponent } from './editarcaminhao.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'environments/firebaseConfig';
import * as firebase from 'firebase';

const routeStub : Routes = [
  {
    path: '', component : EditarcaminhaoComponent
  }
];
describe('EditarcaminhaoComponent', () => {
  let component: EditarcaminhaoComponent;
  let fixture: ComponentFixture<EditarcaminhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcaminhaoComponent ],
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
        AngularFireModule.initializeApp(firebaseConfig)
        
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarcaminhaoComponent);
    component = fixture.componentInstance;
    component.caminhaoChild = {
      
          modelo: "FH-16",
          placa : "ABC-1234",
          tipo : "3 Eixos",
      
      };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should opened', () => {
    expect(component.open("KxmoGHNytNoYG4SZBGG")).toBeTruthy();
  });
  it('should closed', () => {
    expect(component.close()).toBeTruthy();
  });
  it('should closed with another method', () => {
    expect(component.closeInternal()).toBeTruthy();
  });

});
