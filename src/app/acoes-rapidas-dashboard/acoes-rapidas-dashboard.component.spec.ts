import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesRapidasDashboardComponent } from './acoes-rapidas-dashboard.component';

describe('AcoesRapidasDashboardComponent', () => {
  let component: AcoesRapidasDashboardComponent;
  let fixture: ComponentFixture<AcoesRapidasDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcoesRapidasDashboardComponent ]
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
});
