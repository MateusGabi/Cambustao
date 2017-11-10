import { firebaseConfig } from 'environments/firebaseConfig';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmotoristaComponent } from './editarmotorista.component';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as firebase from 'firebase';

const routeStub : Routes = [
  {
    path: '', component : EditarmotoristaComponent
  }
];
describe('EditarmotoristaComponent', () => {
  let component: EditarmotoristaComponent;
  let fixture: ComponentFixture<EditarmotoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarmotoristaComponent ],
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
    fixture = TestBed.createComponent(EditarmotoristaComponent);
    component = fixture.componentInstance;
    component.motoristaChild = {
      
          nome: "Jose",
          cpf : "08070983965",
          idade : "50 Anos",
      
      };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
