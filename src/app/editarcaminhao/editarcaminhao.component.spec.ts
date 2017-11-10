import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcaminhaoComponent } from './editarcaminhao.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
          provide : APP_BASE_HREF, useValue : '/'
        }
      ],
      imports: [
        RouterModule.forRoot(routeStub),
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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
