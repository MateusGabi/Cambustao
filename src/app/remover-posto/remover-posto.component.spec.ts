import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverPostoComponent } from './remover-posto.component';

describe('RemoverPostoComponent', () => {
  let component: RemoverPostoComponent;
  let fixture: ComponentFixture<RemoverPostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverPostoComponent ]
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
