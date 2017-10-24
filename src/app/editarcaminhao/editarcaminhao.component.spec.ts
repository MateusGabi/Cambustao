import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcaminhaoComponent } from './editarcaminhao.component';

describe('EditarcaminhaoComponent', () => {
  let component: EditarcaminhaoComponent;
  let fixture: ComponentFixture<EditarcaminhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcaminhaoComponent ]
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
