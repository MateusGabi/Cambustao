import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesComponent } from './configuracoes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'environments/firebaseConfig';
import { APP_BASE_HREF } from '@angular/common';

const routeStub : Routes = [
  {
    path: '', component : ConfiguracoesComponent
  }
];
describe('ConfiguracoesComponent', () => {
  let component: ConfiguracoesComponent;
  let fixture: ComponentFixture<ConfiguracoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterModule.forRoot(routeStub),
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig, "Cambustao"),
      ],
      providers: [
        {
          provide : APP_BASE_HREF, useValue : '/'
        }
      ],
    },
  )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
