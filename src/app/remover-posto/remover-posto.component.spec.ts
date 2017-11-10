import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverPostoComponent } from './remover-posto.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from 'environments/firebaseConfig';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routeStub : Routes = [
  {
    path: '', component : RemoverPostoComponent
  }
];
describe('RemoverPostoComponent', () => {
  let component: RemoverPostoComponent;
  let fixture: ComponentFixture<RemoverPostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverPostoComponent ],
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
    fixture = TestBed.createComponent(RemoverPostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
