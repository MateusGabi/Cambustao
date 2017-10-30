import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpostoComponent } from './editarposto.component';

describe('EditarpostoComponent', () => {
  let component: EditarpostoComponent;
  let fixture: ComponentFixture<EditarpostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarpostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
