import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosComponent } from './postos.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'environments/firebaseConfig';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsAPIService } from 'app/services/google-maps-api.service';

const routeStub : Routes = [
  {
    path: '', component : PostosComponent
  }
];
describe('PostosComponent', () => {
  let component: PostosComponent;
  let fixture: ComponentFixture<PostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostosComponent ],
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
        AngularFireModule.initializeApp(firebaseConfig, "Cambustao"),
        HttpModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
