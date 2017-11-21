import { HomePageComponent } from './../pages/home-page.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesRapidasDashboardComponent } from './acoes-rapidas-dashboard.component';
import { APP_BASE_HREF } from '@angular/common';

const routeStub : Routes = [
  {
    path: '', component : AcoesRapidasDashboardComponent
  }
];
describe('AcoesRapidasDashboardComponent', () => {
  let component: AcoesRapidasDashboardComponent;
  let fixture: ComponentFixture<AcoesRapidasDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcoesRapidasDashboardComponent ],
      providers: [
        {
          provide : APP_BASE_HREF, useValue : '/'
        }
      ],
      imports: [
        RouterModule.forRoot(routeStub),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcoesRapidasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test switch onCLick', () => {
    expect(component.onClick(null,'caminhoes')).toBeNull();
    expect(component.onClick(null,'motoristas')).toBeNull();
    expect(component.onClick(null,'postoManagement')).toBeNull();
    expect(component.onClick(null,'viagens')).toBeNull();
  });
  
});
