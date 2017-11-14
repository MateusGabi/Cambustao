import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {TestBed, async} from "@angular/core/testing";
import {AuthService} from "app/shared/auth.service";
import {AuthServiceStub} from "app/shared/auth.service.stub";
import {AlertModule} from "ngx-bootstrap";
import { Routes } from '@angular/router';


const routeStub : Routes = [
    {
      path: '', component: AppComponent
    }
  ];
describe('AppComponent', () => {
    let component : AppComponent;
    beforeEach(() => {
        let authServiceStub = new AuthServiceStub(true);

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                AlertModule.forRoot(),
                RouterModule.forRoot(routeStub)
            ],
            providers: [
                {provide: AuthService, useValue: authServiceStub},
                {provide : APP_BASE_HREF, useValue : '/'}
            ]
        });;
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h1 tag', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.navbar-brand').textContent).toContain('Cambustao');
    }));

    it('should return current user', async(() => {
        expect(component.currentUser()).toBeNull();
    }));
    it('should logout ', async(() => {
        expect(component.logout()).toBeNull();
    }));
    it('should return a succes ', async(() => {
        expect(component.onResetPasswordSuccess()).toBeNull();
    }));
    it('should login succes', async(() => {
        expect(component.onLoginSuccess()).toBeNull();
    }));
    it('should return register succes ', async(() => {
        expect(component.onRegisterSuccess()).toBeNull();
    }));
    it('should loggedOut ', async(() => {
        expect(component.onLoggedOut()).toBeNull();
    }));
    it('should close and alert ', async(() => {
        expect(component.alertClosed()).toBeNull();
    }));
    
});
