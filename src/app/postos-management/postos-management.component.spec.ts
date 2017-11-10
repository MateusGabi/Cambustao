import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosManagementComponent } from './postos-management.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { firebaseConfig } from 'environments/firebaseConfig';

const routeStub : Routes = [
  {
    path: '', component : PostosManagementComponent
  }
];
describe('PostosManagementComponent', () => {
  let component: PostosManagementComponent;
  let fixture: ComponentFixture<PostosManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostosManagementComponent ],
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
    fixture = TestBed.createComponent(PostosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
