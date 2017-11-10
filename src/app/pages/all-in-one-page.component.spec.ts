import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInOnePageComponent } from './all-in-one-page.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from 'environments/firebaseConfig';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

const routeStub : Routes = [
  {
    path: '', component : AllInOnePageComponent
  }
];
describe('AllInOnePageComponent', () => {
  let component: AllInOnePageComponent;
  let fixture: ComponentFixture<AllInOnePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInOnePageComponent ],
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
    fixture = TestBed.createComponent(AllInOnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
